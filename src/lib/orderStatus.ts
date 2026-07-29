// Maps stored order status values to customer-facing labels.
// The database keeps "printing" for existing orders; customers see "Crafting"
// to match the policy's made-to-order stages.
const STATUS_LABELS: Record<string, string> = {
  placed: "Placed",
  confirmed: "Confirmed",
  printing: "Crafting",
  quality_check: "Quality Check",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function formatOrderStatus(status: string): string {
  return STATUS_LABELS[status] ?? status;
}
