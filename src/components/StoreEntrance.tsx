"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "loading" | "approach" | "transition" | "interior" | "exit";
type Scene = "storefront" | "interior";
const SEEN_KEY = "denied-entrance-seen";
const DESKTOP_ASSETS = {
  storefront: "/assets/Desktop storefront.png",
  interior: "/assets/Desktop store interior.png",
};
const MOBILE_ASSETS = {
  storefront: "/assets/Mobile storefront.png",
  interior: "/assets/Mobile store interior.png",
};

export default function StoreEntrance() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<Phase>("loading");
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [loaded, setLoaded] = useState<Record<Scene, boolean>>({ storefront: false, interior: false });
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    setShow(false);
    document.body.style.overflow = "";
    try { sessionStorage.setItem(SEEN_KEY, "true"); } catch { /* Storage may be unavailable. */ }
  }, [clearTimers]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceReplay = params.get("replay") === "1";
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "true"; } catch { /* Continue without persistence. */ }
    if (seen && !forceReplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try { sessionStorage.setItem(SEEN_KEY, "true"); } catch { /* Storage may be unavailable. */ }
      return;
    }

    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    setShow(true);
    setPhase("loading");
    document.body.style.overflow = "hidden";
    timers.current = [window.setTimeout(() => {
      setLoaded({ storefront: true, interior: true });
    }, 5000)];

    return () => {
      clearTimers();
      document.body.style.overflow = "";
    };
  }, [clearTimers]);

  useEffect(() => {
    if (!show || phase !== "loading" || !loaded.storefront || !loaded.interior) return;
    clearTimers();
    setPhase("approach");
    timers.current = [
      window.setTimeout(() => setPhase("transition"), 2600),
      window.setTimeout(() => setPhase("interior"), 3150),
      window.setTimeout(() => setPhase("exit"), 5150),
      window.setTimeout(finish, 6200),
    ];
  }, [finish, loaded, phase, show]);

  const markLoaded = (scene: Scene) => {
    setLoaded((current) => current[scene] ? current : { ...current, [scene]: true });
  };

  const handleSkip = () => {
    if (phase === "exit") return;
    clearTimers();
    setPhase("exit");
    timers.current = [window.setTimeout(finish, 800)];
  };

  if (!show || isMobile === null) return null;
  const assets = isMobile ? MOBILE_ASSETS : DESKTOP_ASSETS;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: phase === "exit" ? 0.75 : 0.3, ease: "easeInOut" }}
      onAnimationComplete={() => { if (phase === "exit") finish(); }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-black"
      aria-label="DENIED. store entrance"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{
          opacity: phase === "approach" ? 1 : 0,
          scale: phase === "approach" ? 1.18 : 1.21,
        }}
        transition={{
          opacity: { duration: phase === "approach" ? 0.7 : 0.45, ease: "easeInOut" },
          scale: { duration: 2.9, ease: [0.22, 1, 0.36, 1] },
        }}
        className="absolute inset-0"
      >
        <Image
          src={assets.storefront}
          alt=""
          fill
          priority
          quality={88}
          sizes="100vw"
          onLoad={() => markLoaded("storefront")}
          onError={() => markLoaded("storefront")}
          className="object-cover object-center"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 1.07 }}
        animate={{
          opacity: phase === "interior" || phase === "exit" ? 1 : 0,
          scale: phase === "interior" || phase === "exit" ? 1.01 : 1.07,
        }}
        transition={{
          opacity: { duration: 0.85, ease: "easeOut" },
          scale: { duration: 2.2, ease: [0.22, 1, 0.36, 1] },
        }}
        className="absolute inset-0"
      >
        <Image
          src={assets.interior}
          alt=""
          fill
          priority
          quality={88}
          sizes="100vw"
          onLoad={() => markLoaded("interior")}
          onError={() => markLoaded("interior")}
          className="object-cover object-center"
        />
      </motion.div>

      <motion.div
        animate={{ opacity: phase === "loading" || phase === "transition" ? 1 : 0 }}
        transition={{ duration: phase === "transition" ? 0.45 : 0.7, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 bg-black"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      <motion.button
        type="button"
        onClick={handleSkip}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "loading" || phase === "approach" || phase === "interior" ? 0.55 : 0 }}
        transition={{ delay: phase === "approach" ? 0.8 : 0.25, duration: 0.4 }}
        className="absolute bottom-7 left-1/2 z-20 min-h-11 -translate-x-1/2 rounded-full border border-white/15 bg-black/35 px-5 text-[9px] uppercase tracking-brutal text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
        aria-label="Skip store entrance"
      >
        Tap to enter
      </motion.button>
    </motion.div>
  );
}
