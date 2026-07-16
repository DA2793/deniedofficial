import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getRequestUser } from "@/lib/auth/server";
import { isInternalRequest } from "@/lib/internal-auth";

export const dynamic = "force-dynamic";

function escapeText(value: unknown, maxLength = 500) {
  return String(value ?? "").slice(0, maxLength).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character]!);
}

function validEmail(value: unknown) {
  const email = String(value ?? "").trim().toLowerCase();
  return /^\S+@\S+\.\S+$/.test(email) ? email : null;
}

function safeItems(items: unknown) {
  if (!Array.isArray(items) || items.length > 25) throw new Error("Invalid email items");
  return items.map((item: any) => ({
    name: escapeText(item.name, 150),
    color: escapeText(item.color, 80),
    size: escapeText(item.size, 30),
    quantity: Math.max(1, Math.min(10, Number(item.quantity) || 1)),
    price: Math.max(0, Number(item.price) || 0),
  }));
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "Email service not configured" }, { status: 500 });

    const body = await request.json();
    const type = body?.type;
    const raw = body?.data || {};
    let emailConfig: { from: string; to: string; replyTo?: string; subject: string; html: string };

    if (type === "welcome") {
      const user = await getRequestUser(request);
      const email = validEmail(user?.email);
      if (!user || !email) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
      emailConfig = buildWelcomeEmail({
        name: escapeText(user.user_metadata?.full_name || user.user_metadata?.name, 120),
        email,
      });
    } else {
      if (!isInternalRequest(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      const email = validEmail(raw.email);
      if (!email) return NextResponse.json({ error: "Invalid recipient" }, { status: 400 });

      if (type === "order-confirmation") {
        emailConfig = buildOrderConfirmationEmail({
          email,
          name: escapeText(raw.name, 120),
          orderId: escapeText(raw.orderId, 100),
          paymentId: escapeText(raw.paymentId, 100),
          invoiceUrl: typeof raw.invoiceUrl === "string" && raw.invoiceUrl.startsWith("https://") ? raw.invoiceUrl : undefined,
          total: Number(raw.total) || 0,
          shipping: Number(raw.shipping) || 0,
          promoCode: raw.promoCode ? escapeText(raw.promoCode, 30) : undefined,
          promoDiscount: Number(raw.promoDiscount) || 0,
          items: safeItems(raw.items),
        });
      } else if (type === "order-shipped") {
        emailConfig = buildOrderShippedEmail({
          email,
          name: escapeText(raw.name, 120),
          orderId: escapeText(raw.orderId, 100),
          trackingNumber: escapeText(raw.trackingNumber, 200),
          courierPartner: escapeText(raw.courierPartner, 100),
          items: safeItems(raw.items),
        });
      } else {
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
      }
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send(emailConfig);
    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email could not be sent";
    console.error("Send email error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ── Welcome Email ──
function buildWelcomeEmail(data: { name: string; email: string }) {
  return {
    from: "DENIED. <hello@deniedofficial.com>",
    to: data.email,
    replyTo: "contact@deniedofficial.com",
    subject: "Welcome to DENIED.",
    html: `
<div style="max-width: 500px; margin: 0 auto; padding: 40px 30px; background: #0a0a0a; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: 4px; margin: 0;">DENIED.</h1>
    <p style="font-size: 11px; color: #c9a96e; letter-spacing: 2px; margin-top: 8px; text-transform: uppercase;">Not for Everyone</p>
  </div>

  <div style="width: 40px; height: 1px; background: #c9a96e; margin: 0 auto 32px;"></div>

  <p style="font-size: 14px; color: #ffffff; text-align: center; margin-bottom: 8px;">
    Welcome${data.name ? `, ${data.name}` : ""}.
  </p>

  <p style="font-size: 13px; color: #999999; text-align: center; line-height: 1.7; margin-bottom: 32px;">
    You've joined the Selected. DENIED. is built for those who refuse to blend in — every piece is crafted for the few who wear their identity, not follow one.
  </p>

  <div style="text-align: center; margin-bottom: 32px;">
    <a href="https://www.deniedofficial.com/collection" style="display: inline-block; padding: 14px 36px; background: #c9a96e; color: #0a0a0a; text-decoration: none; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; border-radius: 50px;">Explore Collection</a>
  </div>

  <p style="font-size: 13px; color: #999999; text-align: center; line-height: 1.7;">
    Luxury for the Selected.<br/>
    <span style="color: #c9a96e; font-style: italic;">DENIED.</span>
  </p>

  <div style="width: 40px; height: 1px; background: rgba(255,255,255,0.1); margin: 32px auto;"></div>

  <p style="font-size: 10px; color: #444444; text-align: center; letter-spacing: 1px;">
    <a href="https://deniedofficial.com" style="color: #c9a96e; text-decoration: none;">deniedofficial.com</a> · <a href="https://www.instagram.com/denied._official/" style="color: #c9a96e; text-decoration: none;">@denied._official</a>
  </p>
</div>`,
  };
}

// ── Order Confirmation Email ──
function buildOrderConfirmationEmail(data: {
  email: string;
  name: string;
  orderId: string;
  invoiceUrl?: string;
  total: number;
  shipping: number;
  promoCode?: string;
  promoDiscount?: number;
  paymentId: string;
  items: { name: string; color?: string; size?: string; quantity: number; price: number }[];
}) {
  const itemsHtml = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px 0; color: #ffffff; font-size: 13px; border-bottom: 1px solid #1a1a1a;">
            ${item.name}${item.color ? ` — ${item.color}` : ""}${item.size ? ` / ${item.size}` : ""} × ${item.quantity}
          </td>
          <td style="padding: 8px 0; color: #c9a96e; font-size: 13px; text-align: right; border-bottom: 1px solid #1a1a1a;">
            ₹${(item.price * item.quantity).toLocaleString("en-IN")}
          </td>
        </tr>`
    )
    .join("");

  return {
    from: "DENIED. <orderconfirmation@deniedofficial.com>",
    to: data.email,
    replyTo: "contact@deniedofficial.com",
    subject: `Order Confirmed — DENIED. #${data.orderId.slice(0, 8)}`,
    html: `
<div style="max-width: 500px; margin: 0 auto; padding: 40px 30px; background: #0a0a0a; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: 4px; margin: 0;">DENIED.</h1>
    <p style="font-size: 11px; color: #c9a96e; letter-spacing: 2px; margin-top: 8px; text-transform: uppercase;">Not for Everyone</p>
  </div>

  <div style="width: 40px; height: 1px; background: #c9a96e; margin: 0 auto 32px;"></div>

  <p style="font-size: 14px; color: #ffffff; text-align: center; margin-bottom: 8px;">Order Confirmed</p>
  <p style="font-size: 13px; color: #999999; text-align: center; line-height: 1.6; margin-bottom: 32px;">
    Thank you, ${data.name}. You're now one of the Selected.
  </p>

  <div style="background: #111; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 16px;">
    <p style="color: #c9a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Order Details</p>
    <p style="color: #ccc; font-size: 13px; margin: 4px 0;"><strong style="color: #fff;">Order ID:</strong> #${data.orderId.slice(0, 8)}</p>
    <p style="color: #ccc; font-size: 13px; margin: 4px 0;"><strong style="color: #fff;">Payment ID:</strong> ${data.paymentId}</p>
  </div>

  <div style="background: #111; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 16px;">
    <p style="color: #c9a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Items</p>
    <table style="width: 100%; border-collapse: collapse;">
      ${itemsHtml}
    </table>
    <div style="border-top: 1px solid #222; margin-top: 12px; padding-top: 12px;">
      <table style="width: 100%;">
        ${data.promoCode ? `<tr><td style="color: #999; font-size: 13px;">Promo (${data.promoCode})</td><td style="text-align: right; color: #999; font-size: 13px;">-₹${data.promoDiscount}</td></tr>` : ""}
        <tr>
          <td style="color: #999; font-size: 13px;">Shipping</td>
          <td style="text-align: right; color: #999; font-size: 13px;">${data.shipping === 0 ? "Free" : "₹" + data.shipping}</td>
        </tr>
        <tr>
          <td style="color: #fff; font-size: 16px; font-weight: bold; padding-top: 8px;">Total</td>
          <td style="text-align: right; color: #c9a96e; font-size: 16px; font-weight: bold; padding-top: 8px;">₹${data.total.toLocaleString("en-IN")}</td>
        </tr>
      </table>
    </div>
  </div>

  <div style="background: #111; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 24px; text-align: center;">
    <p style="color: #999; font-size: 13px; margin: 0;">We're preparing your order with care. You'll receive a notification once it ships.</p>
  </div>

  <div style="text-align: center; margin: 24px 0;">
    ${data.invoiceUrl ? `<a href="${data.invoiceUrl}" style="display: inline-block; padding: 12px 28px; background: #c9a96e; color: #0a0a0a; text-decoration: none; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; border-radius: 50px; margin-right: 8px; margin-bottom: 8px;">View Invoice</a>` : ""}
    <a href="https://www.deniedofficial.com/account" style="display: inline-block; padding: 12px 28px; background: #ffffff; color: #0a0a0a; text-decoration: none; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; border-radius: 50px;">View My Orders</a>
  </div>

  <div style="width: 40px; height: 1px; background: rgba(255,255,255,0.1); margin: 32px auto;"></div>

  <p style="font-size: 10px; color: #444444; text-align: center; letter-spacing: 1px;">
    Need help? Reply to this email or reach us at <a href="mailto:contact@deniedofficial.com" style="color: #c9a96e; text-decoration: none;">contact@deniedofficial.com</a>
  </p>
</div>`,
  };
}

// ── Order Shipped Email ──
function buildOrderShippedEmail(data: {
  email: string;
  name: string;
  orderId: string;
  trackingNumber: string;
  courierPartner: string;
  items: { name: string; quantity: number; price: number }[];
}) {
  const itemsList = data.items
    .map((item) => `• ${item.name} × ${item.quantity}`)
    .join("<br>");

  return {
    from: "DENIED. Orders <orders@deniedofficial.com>",
    to: data.email,
    replyTo: "contact@deniedofficial.com",
    subject: `Your order has shipped — #${data.orderId.slice(0, 8)}`,
    html: `
<div style="max-width: 500px; margin: 0 auto; padding: 40px 30px; background: #0a0a0a; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: 4px; margin: 0;">DENIED.</h1>
    <p style="font-size: 11px; color: #c9a96e; letter-spacing: 2px; margin-top: 8px; text-transform: uppercase;">Not for Everyone</p>
  </div>

  <div style="width: 40px; height: 1px; background: #c9a96e; margin: 0 auto 32px;"></div>

  <p style="font-size: 14px; color: #ffffff; text-align: center; margin-bottom: 8px;">Your Order Has Shipped</p>
  <p style="font-size: 13px; color: #999999; text-align: center; line-height: 1.6; margin-bottom: 32px;">
    ${data.name}, your exclusive piece is on its way.
  </p>

  <div style="background: #111; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 16px;">
    <p style="color: #c9a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Shipment Details</p>
    <p style="color: #ccc; font-size: 13px; margin: 4px 0;"><strong style="color: #fff;">Order ID:</strong> #${data.orderId.slice(0, 8)}</p>
    <p style="color: #ccc; font-size: 13px; margin: 4px 0;"><strong style="color: #fff;">Courier:</strong> ${data.courierPartner}</p>
    <p style="color: #ccc; font-size: 13px; margin: 4px 0;"><strong style="color: #fff;">Tracking:</strong> ${data.trackingNumber}</p>
  </div>

  <div style="background: #111; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 16px;">
    <p style="color: #c9a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Items in this shipment</p>
    <p style="color: #ccc; font-size: 13px; line-height: 1.8; margin: 0;">${itemsList}</p>
  </div>

  <div style="background: #111; border: 1px solid #1a1a1a; padding: 16px; margin-bottom: 24px; text-align: center;">
    <p style="color: #999; font-size: 13px; margin: 0;">Track your order using the tracking number above on your courier partner's website.</p>
  </div>

  <div style="text-align: center; margin: 24px 0;">
    <a href="https://www.deniedofficial.com/account" style="display: inline-block; padding: 12px 28px; background: #ffffff; color: #0a0a0a; text-decoration: none; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; border-radius: 50px;">View My Orders</a>
  </div>

  <div style="width: 40px; height: 1px; background: rgba(255,255,255,0.1); margin: 32px auto;"></div>

  <p style="font-size: 10px; color: #444444; text-align: center; letter-spacing: 1px;">
    Need help? Reply to this email or reach us at <a href="mailto:contact@deniedofficial.com" style="color: #c9a96e; text-decoration: none;">contact@deniedofficial.com</a>
  </p>
</div>`,
  };
}
