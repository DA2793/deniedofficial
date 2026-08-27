"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import GrandLineBackdrop from "@/components/GrandLineBackdrop";
import FloatingChapterCTA from "@/components/FloatingChapterCTA";
import { products } from "@/data/products";

/**
 * The chapter's narrative arc, straight from the owner's story document.
 * Products aren't required for the page to stand — once tees carrying
 * chapterSlug "one-piece" enter the catalog, they surface in the collection
 * section below automatically.
 */
const STORY: { title: string; lines: string[] }[] = [
  {
    title: "The Crew",
    lines: [
      "Not everyone sets sail for treasure.",
      "Some sail to find a dream. Some to keep a promise. Some because staying where they are is no longer an option.",
      "He doesn't build an army. He builds a family — each carrying scars, each carrying a dream.",
    ],
  },
  {
    title: "More Than Pirates",
    lines: [
      "This isn't a story about defeating villains. It's about breaking chains.",
      "Every victory isn't measured by the enemy defeated. It's measured by another person becoming free.",
    ],
  },
  {
    title: "The Cost",
    lines: [
      "Every dream has a price.",
      "For the first time, the boy who never stopped smiling breaks.",
      "Some battles cannot be won with determination. They require strength.",
    ],
  },
  {
    title: "3D2Y",
    lines: [
      "Some moments define legends.",
      "He crosses out 3D. And writes 2Y.",
      "Because sometimes the strongest decision isn't moving forward. It's knowing when you're not ready.",
    ],
  },
  {
    title: "The Will of D.",
    lines: [
      "People who refuse to bow. People who laugh in the face of death.",
      "No one fully understands what it means. But everyone fears what it represents.",
    ],
  },
  {
    title: "The Treasure",
    lines: [
      "The greatest mystery isn't what the One Piece is. It's what people become while searching for it.",
      "Every mile sailed, every promise kept, every scar earned — already part of the journey.",
    ],
  },
];

export default function OnePieceChapterClient() {
  const chapterProducts = products.filter((p) => p.chapterSlug === "one-piece");
  const hasProducts = chapterProducts.length > 0;

  return (
    <main className="bg-black text-white">
      {/* ===== HERO ===== */}
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
            One Piece.
          </h1>
          <div className="mx-auto my-8 h-px w-16 bg-gold/50" />
          <p className="mx-auto max-w-md font-serif text-xl italic text-gray-300 md:text-2xl">
            Freedom isn&apos;t given. It&apos;s claimed.
          </p>
          <div className="mt-14">
            <a
              href="#story"
              className="inline-flex rounded-full bg-white px-10 py-4 text-[10px] uppercase tracking-brutal text-black transition-colors duration-300 hover:bg-gold"
            >
              Set Sail
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== THE STORY ===== */}
      <section id="story" className="relative overflow-hidden px-6 pb-28">
        <GrandLineBackdrop className="opacity-70" showCompass={false} />

        <div className="relative mx-auto max-w-2xl py-24 text-center md:py-32">
          <ScrollReveal>
            <p className="font-serif text-xl italic leading-relaxed text-gray-300 md:text-2xl">
              A straw hat, a promise,
              <br />
              and the most dangerous seas in the world.
            </p>
          </ScrollReveal>
        </div>

        <div className="relative mx-auto flex max-w-2xl flex-col gap-24 md:gap-32">
          {STORY.map((beat, index) => (
            <ScrollReveal key={beat.title} delay={0.05}>
              <div className={`${index % 2 === 0 ? "text-left" : "text-right"}`}>
                <p className="text-[10px] uppercase tracking-brutal text-gold">
                  {String(index + 1).padStart(2, "0")} / {STORY.length}
                </p>
                <h2 className="mt-3 font-display text-4xl uppercase text-white md:text-5xl">
                  {beat.title}
                </h2>
                <div className={`mt-6 flex flex-col gap-4 ${index % 2 === 0 ? "items-start" : "items-end"}`}>
                  {beat.lines.map((line) => (
                    <p
                      key={line}
                      className="max-w-md font-serif text-lg italic leading-relaxed text-gray-300 md:text-xl"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== THE COLLECTION — populates as tees join the catalog ===== */}
      {hasProducts && (
        <section className="relative overflow-hidden px-6 pb-28">
          <GrandLineBackdrop className="opacity-70" showCompass={false} />
          <div className="relative mx-auto max-w-2xl py-10 text-center">
            <ScrollReveal>
              <p className="text-[10px] uppercase tracking-brutal text-gray-500">
                One story per tee. 100 pieces each.
              </p>
            </ScrollReveal>
          </div>
          <div className="relative mx-auto flex max-w-5xl flex-col gap-24 md:gap-32">
            {chapterProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={0.05}>
                <div
                  className={`flex flex-col items-center gap-10 md:gap-16 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
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
                  <div className={`text-center ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    <p className="text-[10px] uppercase tracking-brutal text-gold">
                      {String(index + 1).padStart(2, "0")} / {chapterProducts.length}
                    </p>
                    <h2 className="mt-3 font-display text-4xl uppercase text-white md:text-5xl">
                      {product.name.replace(/ Oversized Tee$/i, "")}
                    </h2>
                    <p className="mt-5 max-w-xs font-serif text-lg italic leading-relaxed text-gray-300 md:text-xl">
                      {product.description}
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
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Floating shortcut only once there is somewhere to go */}
      {hasProducts && (
        <FloatingChapterCTA
          href="/collection?category=T-Shirts&tier=The%20Chapter"
          endId="one-piece-cta"
        />
      )}

      {/* ===== CLOSING ===== */}
      <section id="one-piece-cta" className="relative overflow-hidden px-6 py-32 md:py-44">
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
              For those still chasing their own One Piece.
            </p>
            {hasProducts ? (
              <div className="mt-10">
                <Link
                  href="/collection?category=T-Shirts&tier=The%20Chapter"
                  className="inline-flex rounded-full bg-white px-10 py-4 text-[10px] uppercase tracking-brutal text-black transition-colors duration-300 hover:bg-gold"
                >
                  Enter the Collection
                </Link>
              </div>
            ) : (
              <p className="mt-10 text-[10px] uppercase tracking-brutal text-gray-500">
                The crew is assembling. Setting sail soon.
              </p>
            )}
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
