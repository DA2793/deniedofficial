"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Measured directly from Storefront.png (1402 x 1122px) via template matching
// against door-left.png / door-right.png. These percentages are what keep the
// doors pixel-aligned with the storefront glass at any screen size, because
// the outer "cover box" below always preserves Storefront.png's exact aspect
// ratio (1402/1122) no matter the viewport.
const STOREFRONT_ASPECT = 1402 / 1122;
const DOOR_LEFT_START = 272 / 1402; // 19.40%
const DOOR_LEFT_WIDTH = 433 / 1402; // 30.88%
const DOOR_RIGHT_START = 703 / 1402; // 50.14%
const DOOR_RIGHT_WIDTH = 412 / 1402; // 29.39%

export default function StoreEntrance() {
  const [show, setShow] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [revealSite, setRevealSite] = useState(false);

  useEffect(() => {
    // While testing in Kiro, hard refresh won't replay the animation because
    // of the sessionStorage guard below. Add ?replay=1 to the URL, or open
    // devtools console and run: sessionStorage.removeItem("denied-entrance-seen")
    const params = new URLSearchParams(window.location.search);
    const forceReplay = params.get("replay") === "1";
    const seen = sessionStorage.getItem("denied-entrance-seen");
    if (seen && !forceReplay) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    // 1.8s — Doors slide open
    const doorsTimer = setTimeout(() => setDoorsOpen(true), 1800);

    // 3.2s — Storefront layer fades away, pure interior remains
    const interiorTimer = setTimeout(() => setShowInterior(true), 3200);

    // 3.8s — Slow zoom into interior for drama
    const zoomTimer = setTimeout(() => setZoomIn(true), 3800);

    // 5.0s — Whole overlay fades out, revealing the real site underneath
    const revealTimer = setTimeout(() => setRevealSite(true), 5000);

    // 6.0s — Fully remove overlay from the DOM
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("denied-entrance-seen", "true");
    }, 6000);

    return () => {
      clearTimeout(doorsTimer);
      clearTimeout(interiorTimer);
      clearTimeout(zoomTimer);
      clearTimeout(revealTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setDoorsOpen(true);
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
      transition={{ duration: 1, ease: "easeInOut" }}
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
      {/* Cover-box: always preserves Storefront.png's exact aspect ratio
          (1402:1122), scaled/centered to fill the viewport like object-cover
          would on a single <img>. Every child inside is positioned as a %
          of THIS box, so door alignment stays pixel-accurate on any screen. */}
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          transform: "translate(-50%, -50%)",
          aspectRatio: STOREFRONT_ASPECT,
          width: `max(100%, calc(100vh * ${STOREFRONT_ASPECT}))`,
          height: `max(100%, calc(100vw / ${STOREFRONT_ASPECT}))`,
        }}
      >
        {/* Layer 1 (back): interior — revealed once storefront fades */}
        <motion.div
          initial={{ scale: 1 }}
          animate={zoomIn ? { scale: 1.15 } : { scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 overflow-hidden"
        >
          <img
            src="/assets/Store-interior.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Layer 2 (middle): full storefront */}
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

        {/* Layer 3 (front): door panels, sized to their REAL measured
            position within Storefront.png instead of a naive 50/50 split */}
        <motion.div
          initial={{ x: "0%" }}
          animate={doorsOpen ? { x: "-100%" } : { x: "0%" }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          className="absolute z-10"
          style={{
            top: 0,
            height: "100%",
            left: `${DOOR_LEFT_START * 100}%`,
            width: `${DOOR_LEFT_WIDTH * 100}%`,
          }}
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
          className="absolute z-10"
          style={{
            top: 0,
            height: "100%",
            left: `${DOOR_RIGHT_START * 100}%`,
            width: `${DOOR_RIGHT_WIDTH * 100}%`,
          }}
        >
          <img
            src="/assets/door-right.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>

      {/* Skip hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: revealSite ? 0 : 0.4 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-[9px] uppercase tracking-brutal z-30"
      >
        Tap to enter
      </motion.p>
    </motion.div>
  );
}
