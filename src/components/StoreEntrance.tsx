"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StoreEntrance() {
  const [show, setShow] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [revealSite, setRevealSite] = useState(false);

  useEffect(() => {
    // Add ?replay=1 to any URL to force-replay the entrance without
    // clearing sessionStorage manually.
    const params = new URLSearchParams(window.location.search);
    const forceReplay = params.get("replay") === "1";
    const seen = sessionStorage.getItem("denied-entrance-seen");
    if (seen && !forceReplay) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    // 3.0s — Storefront (which has been zooming in) crossfades to interior
    const interiorTimer = setTimeout(() => setShowInterior(true), 3000);

    // 5.5s — Interior fades away, revealing the real site
    const revealTimer = setTimeout(() => setRevealSite(true), 5500);

    // 6.8s — Fully remove overlay from the DOM
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 6800);

    return () => {
      clearTimeout(interiorTimer);
      clearTimeout(revealTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setShowInterior(true);
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
      {/* Layer 1 (back): Interior — full-bleed, revealed once storefront fades.
          Continues a slow zoom for a "stepping inside" feel. */}
      <motion.div
        initial={{ scale: 1 }}
        animate={showInterior ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <img
          src="/assets/Store-interior.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Layer 2 (front): Full storefront — shown entirely (contain), then
          gently zoomed as if walking towards it, then crossfaded to interior. */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: showInterior ? 0 : 1,
          scale: showInterior ? 1.25 : 1.2,
        }}
        transition={{
          opacity: { duration: 1.2, ease: "easeInOut" },
          scale: { duration: 4, ease: [0.16, 1, 0.3, 1] },
        }}
        className="absolute inset-0 z-[5] flex items-center justify-center"
      >
        <img
          src="/assets/Storefront.png"
          alt=""
          className="max-w-full max-h-full w-auto h-auto object-contain"
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
