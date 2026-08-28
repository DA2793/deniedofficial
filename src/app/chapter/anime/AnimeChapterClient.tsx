"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import GrandLineBackdrop from "@/components/GrandLineBackdrop";
import { products, type Product } from "@/data/products";

/**
 * The Anime chapter holds every saga on one page — each anime is a section,
 * never a separate build. A saga is told through its beats: the nine names,
 * in the locked narrative order, each carrying one whisper. Tonight the
 * beats stand alone; when a tee named for a beat enters the catalog with
 * chapterSlug "anime", it surfaces inside its beat automatically — image,
 * price, and Claim Yours — with no page edits.
 */
interface Saga {
  name: string;
  tagline: string;
  /** Short scene-setter under the masthead — a whisper, not an essay. */
  intro: string[];
  beats: { title: string; line: string }[];
}

const SAGAS: Saga[] = [
  {
    name: "One Piece",
    tagline: "Freedom isn't given. It's claimed.",
    intro: [
      "Not everyone sets sail for treasure.",
      "Some sail to find a dream. Some to keep a promise. Some because staying where they are is no longer an option.",
    ],
    // The rise (01–07), the price (08), the answer (09).
    beats: [
      { title: "Identity", line: "The strongest identity is the one you never abandon." },
      { title: "Dream", line: "The world said impossible. He sailed anyway." },
      { title: "Ambition", line: "He never wanted to rule the seas. He wanted no one to rule him." },
      { title: "Crew", line: "The greatest treasure chose to sail beside him." },
      { title: "Evolution", line: "Every gear earned. The dream never changed." },
      { title: "Loyalty", line: "Nothing happened. Yet everything did." },
      { title: "Liberation", line: "Legends don't conquer the world. They liberate it." },
      { title: "Cost", line: "The people we lose become the reason we never stop." },
      { title: "3D2Y", line: "Growth begins the moment you admit you're not ready." },
    ],
  },
];

/** A beat owns the product named for it (e.g. "Identity Oversized Tee"). */
function productForBeat(chapterProducts: Product[], title: string): Product | undefined {
  const needle = title.toLowerCase();
  return chapterProducts.find((p) => p.name.toLowerCase().startsWith(needle));
}

export default function AnimeChapterClient() {
  const chapterProducts = products.filter((p) => p.chapterSlug === "anime");
  const hasProducts = chapterProducts.length > 0;

  return (
    <main className="bg-black text-white">
      {/* ===== HERO — the chapter, not any one franchise ===== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <GrandLineBackdrop />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto mt-40 max-w-3xl text-center"
        >
          <p className="mb-6 text-[10px] uppercase tracking-brutal text-gold">
            The Chapter
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.95] text-white sm:text-7xl md:text-8xl">
            Anime.
          </h1>
          <div className="mx-auto my-8 h-px w-16 bg-gold/50" />
          <p className="mx-auto max-w-md font-serif text-xl italic text-gray-300 md:text-2xl">
            The stories that raised us,
            <br />
            worn like they mattered.
          </p>
          <div className="mt-14">
            <a
              href="#sagas"
              className="inline-flex rounded-full bg-white px-10 py-4 text-[10px] uppercase tracking-brutal text-black transition-colors duration-300 hover:bg-gold"
            >
              Enter the Chapter
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== SAGAS ===== */}
      <div id="sagas">
        {SAGAS.map((saga, sagaIndex) => (
          <section key={saga.name} className="relative overflow-hidden px-6 pb-28">
            <GrandLineBackdrop className="opacity-70" showCompass={false} />

            {/* Saga masthead */}
            <div className="relative mx-auto max-w-2xl py-24 text-center md:py-32">
              <ScrollReveal>
                <p className="text-[10px] uppercase tracking-brutal text-gray-500">
                  Saga {String(sagaIndex + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 font-display text-5xl uppercase text-white md:text-6xl">
                  {saga.name}
                </h2>
                <p className="mt-6 font-serif text-xl italic leading-relaxed text-gray-300 md:text-2xl">
                  {saga.tagline}
                </p>
                <div className="mx-auto mt-10 flex max-w-md flex-col gap-3">
                  {saga.intro.map((line) => (
                    <p key={line} className="font-serif text-base italic leading-relaxed text-gray-400 md:text-lg">
                      {line}
                    </p>
                  ))}
                </div>
                <p className="mt-10 text-[10px] uppercase tracking-brutal text-gray-500">
                  One story, told in {saga.beats.length} pieces.
                </p>
              </ScrollReveal>
            </div>

            {/* The beats — the narrative IS the collection */}
            <div className="relative mx-auto flex max-w-5xl flex-col gap-24 md:gap-32">
              {saga.beats.map((beat, index) => {
                const product = productForBeat(chapterProducts, beat.title);
                const alignRight = index % 2 !== 0;
                return (
                  <ScrollReveal key={beat.title} delay={0.05}>
                    {product ? (
                      /* Beat with its tee — image beside the words */
                      <div
                        className={`flex flex-col items-center gap-10 md:gap-16 ${
                          alignRight ? "md:flex-row-reverse" : "md:flex-row"
                        }`}
                      >
                        <Link
                          href={`/product/${product.id}`}
                          className="group relative w-64 shrink-0 overflow-hidden rounded-xl border border-white/[0.06] sm:w-72 md:w-80"
                          aria-label={`View ${product.name}`}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={720}
                            height={900}
                            className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>
                        <div className={`text-center ${alignRight ? "md:text-right" : "md:text-left"}`}>
                          <p className="text-[10px] uppercase tracking-brutal text-gold">
                            {String(index + 1).padStart(2, "0")} / {saga.beats.length}
                          </p>
                          <h3 className="mt-3 font-display text-4xl uppercase text-white md:text-5xl">
                            {beat.title}
                          </h3>
                          <p className="mt-5 max-w-xs font-serif text-lg italic leading-relaxed text-gray-300 md:text-xl">
                            {beat.line}
                          </p>
                          <p className="mt-5 text-sm text-gold">
                            ₹{product.price.toLocaleString("en-IN")}
                          </p>
                          <Link
                            href={`/product/${product.id}`}
                            className="mt-4 inline-flex rounded-full border border-white/15 px-7 py-3 text-[10px] uppercase tracking-brutal text-white transition-all duration-300 hover:border-gold hover:text-gold"
                          >
                            Claim Yours
                          </Link>
                        </div>
                      </div>
                    ) : (
                      /* Beat before its tee arrives — the story stands alone */
                      <div className={alignRight ? "text-right" : "text-left"}>
                        <p className="text-[10px] uppercase tracking-brutal text-gold">
                          {String(index + 1).padStart(2, "0")} / {saga.beats.length}
                        </p>
                        <h3 className="mt-3 font-display text-4xl uppercase text-white md:text-5xl">
                          {beat.title}
                        </h3>
                        <div className={`mt-6 flex flex-col ${alignRight ? "items-end" : "items-start"}`}>
                          <p className="max-w-md font-serif text-lg italic leading-relaxed text-gray-300 md:text-xl">
                            {beat.line}
                          </p>
                        </div>
                      </div>
                    )}
                  </ScrollReveal>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* ===== CLOSING ===== */}
      <section id="anime-cta" className="relative overflow-hidden px-6 py-32 md:py-44">
        <GrandLineBackdrop className="opacity-60" showCompass={false} />
        <div className="relative mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <p className="mb-5 text-[10px] uppercase tracking-brutal text-gold">
              DENIED.
            </p>
            <h2 className="font-display text-5xl uppercase text-white md:text-7xl">
              For those who refuse the ordinary.
            </h2>
            <p className="mx-auto mt-6 max-w-md font-serif text-lg italic leading-relaxed text-gray-400">
              Every saga earned its place here. So did you.
            </p>
            {!hasProducts && (
              <p className="mt-10 text-[10px] uppercase tracking-brutal text-gray-500">
                The first saga is assembling. Coming soon.
              </p>
            )}
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
