"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sizeData = [
  { size: "XS", chest: "36", length: "26", shoulder: "20" },
  { size: "S", chest: "38", length: "27", shoulder: "21" },
  { size: "M", chest: "40", length: "28", shoulder: "22" },
  { size: "L", chest: "42", length: "29", shoulder: "23" },
  { size: "XL", chest: "44", length: "30", shoulder: "24" },
  { size: "XXL", chest: "46", length: "31", shoulder: "25" },
];

export default function SizeGuide() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-[10px] uppercase tracking-brutal text-gold hover:text-gold-light transition-colors underline underline-offset-4"
      >
        Size Guide
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black-soft border border-white/[0.06] rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display text-2xl uppercase">Size Guide</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-400 text-xs mb-6">
                All measurements in inches. Our oversized fits run relaxed — if between sizes, size down for a less oversized look.
              </p>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-3 text-[10px] uppercase tracking-brutal text-gold font-medium">Size</th>
                      <th className="text-center py-3 text-[10px] uppercase tracking-brutal text-gray-400 font-medium">Chest</th>
                      <th className="text-center py-3 text-[10px] uppercase tracking-brutal text-gray-400 font-medium">Length</th>
                      <th className="text-center py-3 text-[10px] uppercase tracking-brutal text-gray-400 font-medium">Shoulder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData.map((row) => (
                      <tr key={row.size} className="border-b border-white/[0.04]">
                        <td className="py-3 text-white font-medium">{row.size}</td>
                        <td className="py-3 text-center text-gray-400">{row.chest}&quot;</td>
                        <td className="py-3 text-center text-gray-400">{row.length}&quot;</td>
                        <td className="py-3 text-center text-gray-400">{row.shoulder}&quot;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-gray-500 text-[10px] mt-6 uppercase tracking-brutal">
                Tip: Measure a tee that fits you well and compare with our chart.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
