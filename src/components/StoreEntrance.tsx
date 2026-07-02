"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StoreEntrance() {
  const [show, setShow] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("denied-entrance-seen");
    if (seen) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    // Doors start opening after 2s
    const doorsTimer = setTimeout(() => setDoorsOpen(true), 2000);

    // Zoom into store after doors open
    const zoomTimer = setTimeout(() => setZoomIn(true), 3200);

    // Fade to black
    const fadeTimer = setTimeout(() => setFadeOut(true), 4200);

    // Remove overlay
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 5000);

    return () => {
      clearTimeout(doorsTimer);
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
    }, 600);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] cursor-pointer overflow-hidden"
          onClick={handleSkip}
        >
          {/* Storefront image background */}
          <motion.div
            animate={zoomIn ? { scale: 2.5, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/assets/Storefront.png')" }}
            />

            {/* Door overlays — positioned over the glass panels */}
            {/* Left door */}
            <motion.div
              initial={{ x: "0%" }}
              animate={doorsOpen ? { x: "-100%" } : { x: "0%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-[18%] bottom-[8%] left-[28%] w-[22%] bg-black/40 backdrop-blur-md border-r border-white/[0.05]"
            />

            {/* Right door */}
            <motion.div
              initial={{ x: "0%" }}
              animate={doorsOpen ? { x: "100%" } : { x: "0%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-[18%] bottom-[8%] right-[28%] w-[22%] bg-black/40 backdrop-blur-md border-l border-white/[0.05]"
            />
          </motion.div>

          {/* Fade to black overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={fadeOut ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-black z-10"
          />

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-[9px] uppercase tracking-brutal z-20"
          >
            Tap to enter
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
