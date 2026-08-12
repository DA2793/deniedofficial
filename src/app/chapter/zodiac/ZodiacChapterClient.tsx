"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ConstellationBackdrop from "@/components/ConstellationBackdrop";

interface SignBeat {
  name: string;
  symbol: string;
  chinese: string;
  line: string;
}

// One-two liners: a gist of each sign in the brand voice, not an explanation.
const SIGNS: SignBeat[] = [
  { name: "Aries", symbol: "\u2648", chinese: "白羊", line: "First into the fire. No permission asked." },
  { name: "Taurus", symbol: "\u2649", chinese: "金牛", line: "Holds its ground long after the ground gives way." },
  { name: "Gemini", symbol: "\u264A", chinese: "双子", line: "Two minds. One edge. You never know which one showed up." },
  { name: "Cancer", symbol: "\u264B", chinese: "巨蟹", line: "The shell was never for hiding. It's for holding." },
  { name: "Leo", symbol: "\u264C", chinese: "狮子", line: "Doesn't perform. Presides." },
  { name: "Virgo", symbol: "\u264D", chinese: "处女", line: "Precision isn't a habit. It's a reflex." },
  { name: "Libra", symbol: "\u264E", chinese: "天秤", line: "Balance — held on a blade's edge." },
  { name: "Scorpio", symbol: "\u264F", chinese: "天蝎", line: "Still water. Venomous depth." },
  { name: "Sagittarius", symbol: "\u2650", chinese: "射手", line: "The arrow never apologises." },
  { name: "Capricorn", symbol: "\u2651", chinese: "摩羯", line: "Born in the deep. Headed for the peak." },
  { name: "Aquarius", symbol: "\u2652", chinese: "水瓶", line: "Pours for everyone. Belongs to no one." },
  { name: "Pisces", symbol: "\u2653", chinese: "双鱼", line: "Two currents. Opposite ways. Both right." },
];

export default function ZodiacChapterClient() {
  return (
    <div className="relative bg-black">
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <ConstellationBackdrop />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <p className="mb-6 text-[10px] uppercase tracking-brutal text-gold">
            The Chapter
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.95] text-white sm:text-7xl md:text-8xl">
            Zodiac.
          </h1>
          <div className="mx-auto my-8 h-px w-16 bg-gold/60" />
          <p className="mx-auto max-w-md font-serif text-xl italic text-gray-300 md:text-2xl">
            Your Sign. Your Energy. Your Statement.
          </p>
        </motion.div>
      </section>

      {/* ===== INTRO + TWELVE BEATS under one continuous sky ===== */}
      <section className="relative overflow-hidden px-6 pb-28">
        {/* Tall section: star count scales with height so density matches the hero */}
        <ConstellationBackdrop starCount={360} seed={777001} className="opacity-80" />

        <div className="relative mx-auto max-w-2xl py-28 text-center md:py-36">
          <ScrollReveal>
            <p className="font-serif text-xl italic leading-relaxed text-gray-300 md:text-2xl">
              Twelve signs. Twelve tempers.
              <br />
              Each drawn in celestial detail, signed in ink older than astrology itself.
            </p>
            <p className="mt-8 text-[10px] uppercase tracking-brutal text-gray-500">
              Front — your constellation. Back — your sign&apos;s name in brush calligraphy.
            </p>
          </ScrollReveal>
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col gap-24 md:gap-32">
          {SIGNS.map((sign, index) => (
            <ScrollReveal key={sign.name} delay={0.05}>
              <div
                className={`flex flex-col items-center gap-10 md:gap-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="relative w-56 shrink-0 sm:w-64 md:w-72">
                  <Image
                    src={`/chapter/zodiac/${sign.name.toLowerCase()}.webp`}
                    alt={`${sign.name} artwork`}
                    width={720}
                    height={960}
                    className="h-auto w-full drop-shadow-[0_0_30px_rgba(201,169,110,0.12)]"
                  />
                </div>
                <div className={`text-center ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <p className="text-[10px] uppercase tracking-brutal text-gold">
                    {sign.symbol} &nbsp;{String(index + 1).padStart(2, "0")} / 12
                  </p>
                  <h2 className="mt-3 font-display text-4xl uppercase text-white md:text-5xl">
                    {sign.name}
                  </h2>
                  <p className="mt-2 text-lg text-gold/70">{sign.chinese}</p>
                  <p className="mt-5 max-w-xs font-serif text-lg italic leading-relaxed text-gray-300 md:text-xl">
                    {sign.line}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== CLOSING CTA ===== */}
      <section className="relative overflow-hidden px-6 py-32 md:py-44">
        <ConstellationBackdrop starCount={80} seed={424242} className="opacity-60" shooting={false} />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <p className="mb-5 text-[10px] uppercase tracking-brutal text-gold">
              The Collection
            </p>
            <h2 className="font-display text-5xl uppercase text-white md:text-7xl">
              Claim Your Sign.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-gray-400">
              One tee. Twelve signs. Black ringer construction, white celestial
              artwork, brush calligraphy across the back — printed or embroidered
              only after you claim yours.
            </p>
            <div className="mt-10">
              <Link
                href="/product/15"
                className="inline-flex rounded-full bg-white px-10 py-4 text-[10px] uppercase tracking-brutal text-black transition-colors duration-300 hover:bg-gold"
              >
                Enter the Collection
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
