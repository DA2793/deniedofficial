import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isInternalRequest } from "@/lib/internal-auth";

export const dynamic = "force-dynamic";

function escapeHtml(value: unknown, maxLength = 500) {
  return String(value ?? "").slice(0, maxLength).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character]!);
}

const ADMIN_EMAILS = [
  "da.2793@yahoo.com",
  "geetikatyagi75@gmail.com",
];

export async function POST(request: NextRequest) {
  try {
    if (!isInternalRequest(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { order: rawOrder } = await request.json();
    if (!rawOrder || !Array.isArray(rawOrder.items)) {
      return NextResponse.json({ error: "Invalid order" }, { status: 400 });
    }
    const order = {
      ...rawOrder,
      shipping_name: escapeHtml(rawOrder.shipping_name, 120),
      shipping_email: escapeHtml(rawOrder.shipping_email, 254),
      shipping_phone: escapeHtml(rawOrder.shipping_phone, 30),
      shipping_address: escapeHtml(rawOrder.shipping_address, 500),
      shipping_city: escapeHtml(rawOrder.shipping_city, 100),
      shipping_state: escapeHtml(rawOrder.shipping_state, 100),
      shipping_pincode: escapeHtml(rawOrder.shipping_pincode, 6),
      payment_id: escapeHtml(rawOrder.payment_id, 100),
      promo_code: rawOrder.promo_code ? escapeHtml(rawOrder.promo_code, 30) : null,
      total: Number(rawOrder.total) || 0,
      shipping: Number(rawOrder.shipping) || 0,
      promo_discount: Number(rawOrder.promo_discount) || 0,
      items: rawOrder.items.slice(0, 25).map((item: any) => ({
        name: escapeHtml(item.name, 150),
        color: escapeHtml(item.color, 80),
        size: escapeHtml(item.size, 30),
        quantity: Math.max(1, Math.min(10, Number(item.quantity) || 1)),
        price: Math.max(0, Number(item.price) || 0),
      })),
    };

    const itemsList = order.items
      .map(
        (item: any) =>
          `• ${item.name}${item.color ? ` — ${item.color}` : ""}${item.size ? ` / ${item.size}` : ""} × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString("en-IN")}`
      )
      .join("\n");

    const emailHtml = `
<div style="max-width: 500px; margin: 0 auto; padding: 30px; background: #0a0a0a; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <h1 style="color: #c9a96e; font-size: 18px; letter-spacing: 2px; margin: 0 0 20px;">NEW ORDER</h1>

  <div style="background: #111; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 16px;">
    <p style="color: #c9a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Order Details</p>
    <p style="color: #ccc; font-size: 13px; margin: 4px 0;"><strong style="color: #fff;">Payment ID:</strong> ${order.payment_id || "N/A"}</p>
    <p style="color: #ccc; font-size: 13px; margin: 4px 0;"><strong style="color: #fff;">Total:</strong> ₹${order.total?.toLocaleString("en-IN")}</p>
    <p style="color: #ccc; font-size: 13px; margin: 4px 0;"><strong style="color: #fff;">Shipping:</strong> ₹${order.shipping || 0}</p>
    ${order.promo_code ? `<p style="color: #ccc; font-size: 13px; margin: 4px 0;"><strong style="color: #fff;">Promo:</strong> ${order.promo_code} (-₹${order.promo_discount})</p>` : ""}
  </div>

  <div style="background: #111; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 16px;">
    <p style="color: #c9a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Items</p>
    <pre style="color: #ccc; font-size: 13px; white-space: pre-wrap; margin: 0; line-height: 1.8;">${itemsList}</pre>
  </div>

  <div style="background: #111; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 16px;">
    <p style="color: #c9a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Customer</p>
    <p style="color: #fff; font-size: 13px; margin: 4px 0;">${order.shipping_name}</p>
    <p style="color: #ccc; font-size: 13px; margin: 4px 0;">${order.shipping_phone}</p>
    <p style="color: #ccc; font-size: 13px; margin: 4px 0;">${order.shipping_email || "Not provided"}</p>
  </div>

  <div style="background: #111; border: 1px solid #1a1a1a; padding: 16px;">
    <p style="color: #c9a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Ship To</p>
    <p style="color: #ccc; font-size: 13px; line-height: 1.6; margin: 0;">
      ${order.shipping_name}<br/>
      ${order.shipping_address}<br/>
      ${order.shipping_city}, ${order.shipping_state} — ${order.shipping_pincode}
    </p>
  </div>

  <p style="color: #666; font-size: 11px; margin-top: 20px; text-align: center;">
    Manage this order at <a href="${new URL("/admin", request.nextUrl.origin).toString()}" style="color: #c9a96e; text-decoration: none;">Admin Dashboard</a>
  </p>
</div>`;

    const { data, error } = await resend.emails.send({
      from: "DENIED. Orders <notification@deniedofficial.com>",
      to: ADMIN_EMAILS,
      subject: `New Order — ₹${order.total?.toLocaleString("en-IN")} from ${order.shipping_name}`,
      html: emailHtml,
    });
    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error: any) {
    console.error("Admin notification error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
