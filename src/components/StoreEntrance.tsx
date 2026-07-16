"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Sequence:
 *   0.0s  — Storefront visible (cover, centered). HOLD.
 *   1.5s  — Doors slide open (left goes left, right goes right)
 *   3.5s  — Whole overlay fades out, website revealed
 *   4.8s  — Overlay removed from DOM
 *
 * ?replay=1 to replay.
 */
export default function StoreEntrance() {
  const [show, setShow] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceReplay = params.get("replay") === "1";
    const seen = sessionStorage.getItem("denied-entrance-seen");
    if (seen && !forceReplay) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setDoorsOpen(true), 1500);
    const t2 = setTimeout(() => setFadeOut(true), 3500);
    const t3 = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setDoorsOpen(true);
    setFadeOut(true);
    setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 700);
  };

  if (!show) return null;

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
      {/* Storefront background — fills the screen */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/assets/Storefront.png)",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Left door — slides left */}
      <motion.div
        initial={{ x: "0%" }}
        animate={doorsOpen ? { x: "-100%" } : { x: "0%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-1/2 h-full z-10"
      >
        <img
          src="/assets/door-left.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Right door — slides right */}
      <motion.div
        initial={{ x: "0%" }}
        animate={doorsOpen ? { x: "100%" } : { x: "0%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 right-0 w-1/2 h-full z-10"
      >
        <img
          src="/assets/door-right.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

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
