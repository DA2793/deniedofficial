"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SizeChartRow } from "@/data/products";

interface SizeGuideProps {
  sizeChart?: SizeChartRow[] | null;
}

export default function SizeGuide({ sizeChart }: SizeGuideProps) {
  const [open, setOpen] = useState(false);

  if (!sizeChart || sizeChart.length === 0) return null;

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
              className="bg-black-soft border border-white/[0.06] rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
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

              <div className="relative w-full rounded-lg overflow-hidden">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.12]">
                      <th className="py-3 text-[10px] uppercase tracking-brutal text-gold font-medium">Size</th>
                      <th className="py-3 text-[10px] uppercase tracking-brutal text-gold font-medium">Chest (in)</th>
                      <th className="py-3 text-[10px] uppercase tracking-brutal text-gold font-medium">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((row) => (
                      <tr key={row.size} className="border-b border-white/[0.06] last:border-0">
                        <td className="py-3 text-sm uppercase tracking-wide text-white">{row.size}</td>
                        <td className="py-3 text-sm text-gray-300">{row.chest}</td>
                        <td className="py-3 text-sm text-gray-300">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-gray-500 text-[10px] mt-4 uppercase tracking-brutal text-center">
                Measurements in inches. Tip: measure a tee that fits you well and compare with our chart.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
