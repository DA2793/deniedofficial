"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StoreEntrance() {
  const [show, setShow] = useState(false);
  const [gatesOpen, setGatesOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show once per session
    const seen = sessionStorage.getItem("denied-entrance-seen");
    if (seen) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    // Gates start opening after 1.5s
    const openTimer = setTimeout(() => setGatesOpen(true), 1500);

    // Fade out after gates open
    const fadeTimer = setTimeout(() => setFadeOut(true), 3200);

    // Remove completely
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 3800);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  // Skip on tap
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
      {!fadeOut ? (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] cursor-pointer"
          onClick={handleSkip}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-black" />

          {/* Left Gate */}
          <motion.div
            initial={{ x: "0%" }}
            animate={gatesOpen ? { x: "-100%" } : { x: "0%" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-1/2 h-full bg-black border-r border-white/[0.04] flex items-center justify-end pr-4 z-10"
          >
            {/* Gate texture */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-950 to-black" />
            {/* Gate line detail */}
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          </motion.div>

          {/* Right Gate */}
          <motion.div
            initial={{ x: "0%" }}
            animate={gatesOpen ? { x: "100%" } : { x: "0%" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 right-0 w-1/2 h-full bg-black border-l border-white/[0.04] flex items-center justify-start pl-4 z-10"
          >
            {/* Gate texture */}
            <div className="absolute inset-0 bg-gradient-to-l from-black via-gray-950 to-black" />
            {/* Gate line detail */}
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          </motion.div>

          {/* Center Logo — visible before gates open */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={gatesOpen ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: gatesOpen ? 0 : 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-display text-5xl md:text-7xl uppercase tracking-wider text-white mb-3">
                DENIED<span className="text-gold">.</span>
              </h1>
              <p className="text-[10px] uppercase tracking-brutal text-gray-500">
                Not for Everyone
              </p>
            </motion.div>
          </motion.div>

          {/* Zoom-forward effect behind gates */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={gatesOpen ? { scale: 1, opacity: 0.3 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.08)_0%,transparent_60%)]"
          />

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-700 text-[9px] uppercase tracking-brutal z-30"
          >
            Tap to skip
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
