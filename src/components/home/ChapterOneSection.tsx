"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ChapterOneSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F5] border-y border-[#D8CDBD]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Asymmetrical Left: Large Editorial Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#D8CDBD]">
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
                alt="Chapter 01 - The First Weave"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            {/* Small floating detail card */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-48 bg-[#F6F1E8] p-4 border border-[#D8CDBD] shadow-sm">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#666158] block mb-1">
                Field Note
              </span>
              <p className="text-[12px] font-serif text-[#1F1E1A] leading-snug">
                Chanderi pit looms, Bundelkhand. Warp tension 22 denier.
              </p>
            </div>
          </motion.div>

          {/* Asymmetrical Right: Editorial Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6 lg:pl-6"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#9B5E49] font-medium block">
              CHAPTER 01
            </span>

            <h2 className="font-serif text-[42px] sm:text-[56px] leading-[1.08] text-[#1F1E1A]">
              The First Weave
            </h2>

            <p className="text-[16px] text-[#666158] leading-relaxed font-light">
              A first conversation between Indian craft and modern movement.
            </p>

            <p className="text-[14px] text-[#666158] leading-relaxed font-light">
              Designed as our inaugural statement, this edit re-evaluates the weight of traditional ceremonial silks. We removed stiffening starches, broadened warp breathability, and engineered pieces that cascade with effortless fluidity.
            </p>

            <div className="pt-4">
              <Link
                href="/collections/chapter-01"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1F1E1A] text-[#F6F1E8] text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#9B5E49] transition-colors"
              >
                <span>Discover Chapter 01</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
