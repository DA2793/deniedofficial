import { NextRequest, NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { POST as sendEmail } from "@/app/api/send-email/route";
import { getInternalApiToken } from "@/lib/internal-auth";

export const dynamic = "force-dynamic";
const ADMIN_EMAILS = new Set(["da.2793@yahoo.com", "geetikatyagi75@gmail.com"]);
const MAX_COURIER_LENGTH = 100;
const MAX_TRACKING_LENGTH = 200;
type ShipmentBody = { courierPartner?: unknown; trackingNumber?: unknown; trackingUrl?: unknown };
type OrderRow = { id: string; order_id: string | null; status: string; shipping_email: string; shipping_name: string; items: { name: string; quantity: number; price: number }[] | null; courier_partner: string | null; tracking_number: string | null; tracking_url: string | null; shipment_email_sent_at: string | null };

function cleanRequired(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}
function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!);
}
function parseTrackingUrl(value: unknown) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string" || value.length > 2048) throw new Error("Tracking URL must be a valid HTTP(S) URL");
  const url = new URL(value.trim());
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Tracking URL must be a valid HTTP(S) URL");
  return url.toString();
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getRequestUser(request);
  const email = user?.email?.trim().toLowerCase();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (!email || !ADMIN_EMAILS.has(email)) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  let body: ShipmentBody;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }); }
  const courierPartner = cleanRequired(body.courierPartner);
  const trackingNumber = cleanRequired(body.trackingNumber);
  let trackingUrl: string | null;
  try { trackingUrl = parseTrackingUrl(body.trackingUrl); } catch (error) { return NextResponse.json({ error: (error as Error).message }, { status: 400 }); }
  if (!courierPartner || !trackingNumber) return NextResponse.json({ error: "Courier partner and tracking number are required" }, { status: 400 });
  if (courierPartner.length > MAX_COURIER_LENGTH || trackingNumber.length > MAX_TRACKING_LENGTH) return NextResponse.json({ error: "Courier partner or tracking number is too long" }, { status: 400 });
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from("orders").select("id,order_id,status,shipping_email,shipping_name,items,courier_partner,tracking_number,tracking_url,shipment_email_sent_at").eq("id", params.id).maybeSingle();
  if (error) { console.error("Shipment order load failed:", error); return NextResponse.json({ error: "Unable to load order" }, { status: 500 }); }
  if (!data) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  const order = data as OrderRow;
  if (["delivered", "cancelled"].includes(order.status)) return NextResponse.json({ error: `A ${order.status} order cannot be shipped` }, { status: 409 });
  const sameShipment = order.courier_partner === courierPartner && order.tracking_number === trackingNumber && (order.tracking_url ?? null) === trackingUrl;
  if (order.shipment_email_sent_at && !sameShipment) return NextResponse.json({ error: "This shipment was already notified; tracking details cannot be changed here" }, { status: 409 });
  if (order.shipment_email_sent_at && sameShipment) return NextResponse.json({ order, emailSent: true, alreadyProcessed: true });
  const shippedAt = new Date().toISOString();
  const { data: updated, error: updateError } = await admin.from("orders").update({ status: "shipped", courier_partner: courierPartner, tracking_number: trackingNumber, tracking_url: trackingUrl, shipped_at: shippedAt }).eq("id", order.id).select("*").single();
  if (updateError) { console.error("Shipment update failed:", updateError); return NextResponse.json({ error: "Unable to save shipment" }, { status: 500 }); }
  const safeItems = (order.items ?? []).map((item) => ({ ...item, name: escapeHtml(String(item.name ?? "Item")) }));
  const internalRequest = new NextRequest(new URL("/api/send-email", request.nextUrl.origin), { method: "POST", headers: { "content-type": "application/json", "x-denied-internal": getInternalApiToken() }, body: JSON.stringify({ type: "order-shipped", data: { email: order.shipping_email, name: escapeHtml(order.shipping_name), orderId: order.order_id || order.id, trackingNumber: escapeHtml(trackingNumber), courierPartner: escapeHtml(courierPartner), items: safeItems } }) });
  const emailResponse = await sendEmail(internalRequest);
  if (!emailResponse.ok) { console.error("Shipment email failed:", await emailResponse.text()); return NextResponse.json({ error: "Shipment saved, but the email failed. Retry to send the notification.", shipmentSaved: true, order: updated }, { status: 502 }); }
  const emailSentAt = new Date().toISOString();
  const { data: finalized, error: finalizeError } = await admin.from("orders").update({ shipment_email_sent_at: emailSentAt }).eq("id", order.id).select("*").single();
  if (finalizeError) console.error("Shipment email marker update failed:", finalizeError);
  return NextResponse.json({ order: finalized ?? updated, emailSent: true, warning: finalizeError ? "Email sent, but its audit timestamp could not be saved." : undefined });
}
