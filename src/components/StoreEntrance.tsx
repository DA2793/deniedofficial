"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StoreEntrance() {
  const [show, setShow] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("denied-entrance-seen");
    if (seen) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    // Start zooming into the store entrance after 2s
    const zoomTimer = setTimeout(() => setZoomIn(true), 2000);

    // Fade to black as zoom completes
    const fadeTimer = setTimeout(() => setFadeOut(true), 3500);

    // Remove overlay
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 4300);

    return () => {
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
          {/* Storefront image — zooms into the door area */}
          <motion.div
            initial={{ scale: 1 }}
            animate={zoomIn ? { scale: 3, y: "-10%" } : { scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-contain bg-center bg-no-repeat bg-black"
              style={{ backgroundImage: "url('/assets/Storefront.png')" }}
            />
          </motion.div>

          {/* Black fade overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={fadeOut ? { opacity: 1 } : zoomIn ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ duration: fadeOut ? 0.8 : 1.5 }}
            className="absolute inset-0 bg-black z-10"
          />

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-[9px] uppercase tracking-brutal z-20"
          >
            Tap to enter
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
