"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[92vh] min-h-[640px] flex items-center justify-center overflow-hidden bg-[#1F1E1A]">
      {/* Background Cinematic Editorial Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90"
          alt="WOVENAIR Silk Drape in Motion"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.78] contrast-[1.05] transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-10 text-center text-[#F6F1E8] flex flex-col items-center justify-center h-full">
        <div className="max-w-3xl space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-[11px] sm:text-[13px] uppercase tracking-[0.3em] font-medium text-[#D8CDBD]"
          >
            A Contemporary Indian Textile House
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[56px] sm:text-[84px] lg:text-[96px] font-normal leading-[1.05] tracking-tight"
          >
            Woven stories.
            <br />
            <span className="italic font-light">Made for now.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15px] sm:text-[17px] text-[#D8CDBD]/90 max-w-xl mx-auto font-light leading-relaxed"
          >
            The meeting point of loom and air. Traditional Indian handloom craft carried into modern wardrobes with featherlight grace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link
              href="/collections/chapter-01"
              className="w-full sm:w-auto px-8 py-4 bg-[#F6F1E8] text-[#1F1E1A] text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#9B5E49] hover:text-[#F6F1E8] transition-all duration-300"
            >
              Explore The First Weave
            </Link>

            <Link
              href="/our-story"
              className="w-full sm:w-auto px-8 py-4 border border-[#F6F1E8]/70 text-[#F6F1E8] text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#F6F1E8]/10 hover:border-[#F6F1E8] transition-all duration-300"
            >
              Discover Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Editorial Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 inset-x-0 flex justify-center z-10"
      >
        <a
          href="#manifesto"
          aria-label="Scroll down to manifesto"
          className="text-[#D8CDBD]/60 hover:text-[#D8CDBD] transition-colors flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-light">Scroll</span>
          <div className="animate-scroll-pulse">
            <ArrowDown className="w-3 h-3" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
