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

    // 1.8s — Doors slide open
    const doorsTimer = setTimeout(() => setDoorsOpen(true), 1800);

    // 3.2s — Storefront fades, interior revealed
    const interiorTimer = setTimeout(() => setShowInterior(true), 3200);

    // 3.8s — Zoom into interior
    const zoomTimer = setTimeout(() => setZoomIn(true), 3800);

    // 5s — Fade to black
    const fadeTimer = setTimeout(() => setFadeOut(true), 5000);

    // 5.7s — Remove
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 5700);

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
          {/* Layer 1 (back): Store interior — revealed after storefront fades */}
          <motion.div
            initial={{ scale: 1 }}
            animate={zoomIn ? { scale: 1.8 } : { scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src="/assets/Store-interior.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Layer 2 (middle): Full storefront — visible first, fades after doors open */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={showInterior ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-[5]"
          >
            <img
              src="/assets/Storefront.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Layer 3 (front): Frosted door panels — slide apart */}
          <motion.div
            initial={{ x: "0%" }}
            animate={doorsOpen ? { x: "-100%" } : { x: "0%" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 w-1/2 z-10"
          >
            <img
              src="/assets/door-left.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ x: "0%" }}
            animate={doorsOpen ? { x: "100%" } : { x: "0%" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 left-1/2 w-1/2 z-10"
          >
            <img
              src="/assets/door-right.png"
              alt=""
              className="h-full w-full object-cover"
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
