import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="text-[10px] uppercase tracking-brutal text-gold mb-6">Error 404</p>
      <h1 className="font-display text-6xl md:text-8xl uppercase mb-6 text-white">
        Denied.
      </h1>
      <p className="text-gray-500 text-sm mb-10 max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="bg-white text-black text-[11px] uppercase tracking-brutal px-8 py-4 rounded-full hover:bg-gold transition-colors duration-300"
        >
          Back to Home
        </Link>
        <Link
          href="/collection"
          className="border border-white/10 text-white text-[11px] uppercase tracking-brutal px-8 py-4 rounded-full hover:border-gold hover:text-gold transition-all duration-300"
        >
          View Collection
        </Link>
      </div>
    </section>
  );
}
