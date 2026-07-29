import { NextRequest, NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { POST as sendEmail } from "@/app/api/send-email/route";
import { getInternalApiToken } from "@/lib/internal-auth";

export const dynamic = "force-dynamic";
const ADMIN_EMAILS = new Set(["da.2793@yahoo.com", "geetikatyagi75@gmail.com"]);

type OrderRow = {
  id: string;
  order_id: string | null;
  status: string;
  shipping_email: string;
  shipping_name: string;
  items: { name: string; quantity: number; price: number }[] | null;
  qc_email_sent_at: string | null;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getRequestUser(request);
  const email = user?.email?.trim().toLowerCase();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (!email || !ADMIN_EMAILS.has(email)) return NextResponse.json({ error: "Admin access required" }, { status: 403 });

  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("orders")
    .select("id,order_id,status,shipping_email,shipping_name,items,qc_email_sent_at")
    .eq("id", params.id)
    .maybeSingle();
  if (error) {
    console.error("Quality check order load failed:", error);
    return NextResponse.json({ error: "Unable to load order" }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  const order = data as OrderRow;

  if (order.status === "quality_check" && order.qc_email_sent_at) {
    return NextResponse.json({ order, emailSent: true, alreadyProcessed: true });
  }
  if (["shipped", "delivered", "cancelled"].includes(order.status)) {
    return NextResponse.json(
      { error: `A ${order.status} order cannot move back to quality check` },
      { status: 409 }
    );
  }

  let updated = order as Record<string, unknown>;
  if (order.status !== "quality_check") {
    const { data: statusRow, error: updateError } = await admin
      .from("orders")
      .update({ status: "quality_check" })
      .eq("id", order.id)
      .select("*")
      .single();
    if (updateError) {
      console.error("Quality check update failed:", updateError);
      return NextResponse.json({ error: "Unable to update the order status" }, { status: 500 });
    }
    updated = statusRow;
  }

  const safeItems = (order.items ?? []).map((item) => ({
    ...item,
    name: escapeHtml(String(item.name ?? "Item")),
  }));
  const internalRequest = new NextRequest(new URL("/api/send-email", request.nextUrl.origin), {
    method: "POST",
    headers: { "content-type": "application/json", "x-denied-internal": getInternalApiToken() },
    body: JSON.stringify({
      type: "order-quality-check",
      data: {
        email: order.shipping_email,
        name: escapeHtml(order.shipping_name),
        orderId: order.order_id || order.id,
        items: safeItems,
      },
    }),
  });
  const emailResponse = await sendEmail(internalRequest);
  if (!emailResponse.ok) {
    console.error("Quality check email failed:", await emailResponse.text());
    return NextResponse.json(
      {
        error: "Status updated, but the notification email failed. Use the button again to retry the email.",
        statusSaved: true,
        order: updated,
      },
      { status: 502 }
    );
  }

  const { data: finalized, error: finalizeError } = await admin
    .from("orders")
    .update({ qc_email_sent_at: new Date().toISOString() })
    .eq("id", order.id)
    .select("*")
    .single();
  if (finalizeError) console.error("Quality check email marker update failed:", finalizeError);

  return NextResponse.json({
    order: finalized ?? updated,
    emailSent: true,
    warning: finalizeError ? "Email sent, but its audit timestamp could not be saved." : undefined,
  });
}
