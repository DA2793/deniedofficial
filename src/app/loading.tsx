export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20"
      role="status"
      aria-label="Loading page"
    >
      <span className="font-display text-2xl uppercase tracking-brutal text-white/80 animate-pulse">
        Denied.
      </span>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
