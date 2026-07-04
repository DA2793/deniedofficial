"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StoreEntrance() {
  const [show, setShow] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [revealSite, setRevealSite] = useState(false);

  useEffect(() => {
    // Add ?replay=1 to force-replay the entrance.
    const params = new URLSearchParams(window.location.search);
    const forceReplay = params.get("replay") === "1";
    const seen = sessionStorage.getItem("denied-entrance-seen");
    if (seen && !forceReplay) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    // 3s — storefront fades to interior
    const interiorTimer = setTimeout(() => setShowInterior(true), 3000);
    // 6s — interior fades to site
    const revealTimer = setTimeout(() => setRevealSite(true), 6000);
    // 7.2s — remove overlay
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 7200);

    return () => {
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
      transition={{ duration: 1.2, ease: "easeInOut" }}
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
      {/* Interior — sits behind. Slow zoom for immersion. */}
      <motion.img
        src="/assets/Store-interior.png"
        alt=""
        initial={{ scale: 1 }}
        animate={{ scale: showInterior ? 1.15 : 1 }}
        transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Storefront — full-bleed, zooms in like walking towards it, then fades. */}
      <motion.img
        src="/assets/Storefront.png"
        alt=""
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: showInterior ? 1.5 : 1.35,
          opacity: showInterior ? 0 : 1,
        }}
        transition={{
          scale: { duration: 3.5, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 1.2, ease: "easeInOut" },
        }}
        className="absolute inset-0 w-full h-full object-cover z-[5]"
      />

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
