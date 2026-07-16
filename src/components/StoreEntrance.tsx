"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Sequence:
 *   0.0s  — Full storefront fills viewport (cover, centered on top half
 *            so the signage + door are visible). HOLD.
 *   1.5s  — Slow zoom begins (walking towards the store)
 *   4.0s  — Storefront crossfades to interior
 *   6.5s  — Everything fades out, site revealed
 *   7.8s  — Overlay removed
 *
 * ?replay=1 to replay.
 */
export default function StoreEntrance() {
  const [phase, setPhase] = useState<"idle" | "zoom" | "interior" | "reveal">("idle");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceReplay = params.get("replay") === "1";
    const seen = sessionStorage.getItem("denied-entrance-seen");
    if (seen && !forceReplay) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("zoom"), 1500);
    const t2 = setTimeout(() => setPhase("interior"), 4000);
    const t3 = setTimeout(() => setPhase("reveal"), 6500);
    const t4 = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 7800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setPhase("reveal");
    setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 700);
  };

  if (!show) return null;

  const isZooming = phase === "zoom" || phase === "interior" || phase === "reveal";
  const showInterior = phase === "interior" || phase === "reveal";
  const fadeOut = phase === "reveal";

  return (
    <motion.div
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1.3, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (fadeOut) {
          setShow(false);
          document.body.style.overflow = "";
          sessionStorage.setItem("denied-entrance-seen", "true");
        }
      }}
      className="fixed inset-0 z-[9999] cursor-pointer overflow-hidden bg-black"
      onClick={handleSkip}
    >
      {/* Interior — behind, full-bleed cover. Gentle zoom on reveal. */}
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: showInterior ? 1.08 : 1,
          opacity: showInterior ? 1 : 0,
        }}
        transition={{
          opacity: { duration: 1.2, ease: "easeInOut" },
          scale: { duration: 2.5, ease: [0.16, 1, 0.3, 1] },
        }}
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/assets/Store-interior.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Storefront — fills viewport with cover, centered so the DENIED.
          signage and door area stay visible. Sides (racks) may crop on
          narrow screens — that's fine. Zooms in on cue, then fades. */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: isZooming ? 1.35 : 1,
          opacity: showInterior ? 0 : 1,
        }}
        transition={{
          scale: { duration: 4, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 1.2, ease: "easeInOut" },
        }}
        className="absolute inset-0 z-[5]"
        style={{
          backgroundImage: "url(/assets/Storefront.png)",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Skip hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeOut ? 0 : 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-[9px] uppercase tracking-brutal z-30"
      >
        Tap to enter
      </motion.p>
    </motion.div>
  );
}
