"use client";

import { motion } from "framer-motion";

export default function ManifestoSection() {
  return (
    <section id="manifesto" className="py-28 sm:py-40 bg-[#F6F1E8] text-[#1F1E1A]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block">
              Manifesto
            </span>

            <blockquote className="font-serif text-[38px] sm:text-[54px] lg:text-[64px] font-normal leading-[1.12] text-[#1F1E1A]">
              “A saree is not simply worn.
              <br />
              <span className="italic text-[#704238]">It carries where it came from.”</span>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto space-y-5 text-[#666158] text-[16px] sm:text-[18px] leading-relaxed font-light"
          >
            <p>
              WOVENAIR was born from an essential tension: between the permanence of Indian handloom heritage and the velocity of contemporary life.
            </p>
            <p>
              We calibrate thread count, twist tension, and border weight so our sarees breathe as freely as you move. Six yards of unhurried human devotion, made for right now.
            </p>
          </motion.div>

          {/* Decorative subtle hairline separator */}
          <div className="w-16 h-px bg-[#D8CDBD] mx-auto pt-4" />
        </div>
      </div>
    </section>
  );
}
