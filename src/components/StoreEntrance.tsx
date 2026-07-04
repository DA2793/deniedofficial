"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Sequence (dead simple, no doors):
 *
 *   0.0s  — Full storefront visible (object-contain, scale 1). HOLD.
 *   1.2s  — Storefront starts slow zoom-in ("walking towards it")
 *   4.2s  — Storefront fades out
 *   4.2s  — Interior fades in, gently zooming
 *   6.5s  — Interior fades out, revealing the site
 *   7.8s  — Overlay removed from DOM
 *
 * Add ?replay=1 to any URL to replay without clearing sessionStorage.
 */
export default function StoreEntrance() {
  const [show, setShow] = useState(false);
  const [startZoom, setStartZoom] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [revealSite, setRevealSite] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceReplay = params.get("replay") === "1";
    const seen = sessionStorage.getItem("denied-entrance-seen");
    if (seen && !forceReplay) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    const zoomTimer = setTimeout(() => setStartZoom(true), 1200);
    const interiorTimer = setTimeout(() => setShowInterior(true), 4200);
    const revealTimer = setTimeout(() => setRevealSite(true), 6500);
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 7800);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(interiorTimer);
      clearTimeout(revealTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setRevealSite(true);
    setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 700);
  };

  if (!show) return null;

  return (
    <motion.div
      animate={{ opacity: revealSite ? 0 : 1 }}
      transition={{ duration: 1.3, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (revealSite) {
          setShow(false);
          document.body.style.overflow = "";
          sessionStorage.setItem("denied-entrance-seen", "true");
        }
      }}
      className="fixed inset-0 z-[9999] cursor-pointer overflow-hidden bg-black"
      onClick={handleSkip}
    >
      {/* Interior — behind, full-bleed. Kicks in with a gentle zoom once
          the storefront has faded out. */}
      <motion.img
        src="/assets/Store-interior.png"
        alt=""
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: showInterior ? 1.12 : 1,
          opacity: showInterior ? 1 : 0,
        }}
        transition={{
          opacity: { duration: 1.4, ease: "easeInOut" },
          scale: { duration: 3, ease: [0.16, 1, 0.3, 1] },
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Storefront — ENTIRE image visible at start (object-contain, scale 1).
          After a 1.2s hold, container scales up over 3s to feel like walking
          towards it. Then fades out on cue. */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: startZoom ? 1.3 : 1,
          opacity: showInterior ? 0 : 1,
        }}
        transition={{
          scale: { duration: 3, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 1.4, ease: "easeInOut" },
        }}
        className="absolute inset-0 z-[5]"
      >
        <img
          src="/assets/Storefront.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
        />
      </motion.div>

      {/* Skip hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: revealSite ? 0 : 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-[9px] uppercase tracking-brutal z-30"
      >
        Tap to enter
      </motion.p>
    </motion.div>
  );
}
