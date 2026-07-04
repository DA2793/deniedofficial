"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StoreEntrance() {
  const [show, setShow] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("denied-entrance-seen");
    if (seen) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    // 1.8s — Doors slide open (revealing the storefront behind them)
    const doorsTimer = setTimeout(() => setDoorsOpen(true), 1800);

    // 3.2s — Storefront revealed, now crossfade to interior + zoom (walking in)
    const interiorTimer = setTimeout(() => setShowInterior(true), 3200);
    const zoomTimer = setTimeout(() => setZoomIn(true), 3400);

    // 4.5s — Fade to black
    const fadeTimer = setTimeout(() => setFadeOut(true), 4500);

    // 5.2s — Site revealed
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 5200);

    return () => {
      clearTimeout(doorsTimer);
      clearTimeout(interiorTimer);
      clearTimeout(zoomTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 500);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] cursor-pointer overflow-hidden bg-black"
          onClick={handleSkip}
        >
          {/* Layer 1: Clear storefront (visible behind the doors once they open) */}
          <div className="absolute inset-0">
            <img
              src="/assets/Storefront.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Layer 2: Store interior (crossfades in over storefront, then zooms) */}
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: showInterior ? 1 : 0,
              scale: zoomIn ? 1.8 : 1,
            }}
            transition={{
              opacity: { duration: 0.6, ease: "easeInOut" },
              scale: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
            }}
            className="absolute inset-0"
          >
            <img
              src="/assets/Store-interior.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Layer 3: Left door (frosted) */}
          <motion.div
            initial={{ x: "0%" }}
            animate={doorsOpen ? { x: "-100%" } : { x: "0%" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-1/2 h-full z-10"
          >
            <img
              src="/assets/door-left.png"
              alt=""
              className="w-full h-full object-cover object-right"
            />
          </motion.div>

          {/* Layer 4: Right door (frosted) */}
          <motion.div
            initial={{ x: "0%" }}
            animate={doorsOpen ? { x: "100%" } : { x: "0%" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 right-0 w-1/2 h-full z-10"
          >
            <img
              src="/assets/door-right.png"
              alt=""
              className="w-full h-full object-cover object-left"
            />
          </motion.div>

          {/* Fade to black */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={fadeOut ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 bg-black z-20"
          />

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-[9px] uppercase tracking-brutal z-30"
          >
            Tap to enter
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
