"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SareeInMotionSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative w-full h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#1F1E1A] my-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=85"
          alt="Saree in motion editorial banner"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.7] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-[#F6F1E8] px-6 max-w-2xl mx-auto space-y-6">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#D8CDBD] font-light">
          Kinetic Drape Study
        </span>

        <h2 className="font-serif text-[42px] sm:text-[60px] font-normal leading-tight">
          Let the Fabric Speak
        </h2>

        <p className="text-[15px] text-[#D8CDBD]/90 font-light max-w-lg mx-auto leading-relaxed">
          Watch how unweighted mulberry silk and fine handloom cotton respond to real human movement, wind, and ambient light.
        </p>

        <div>
          <button
            onClick={() => setIsPlaying(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#F6F1E8] text-[#1F1E1A] text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#9B5E49] hover:text-[#F6F1E8] transition-all duration-300"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>See the Saree in Motion</span>
          </button>
        </div>
      </div>

      {/* Cinematic Modal */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#1F1E1A] border border-[#444038] overflow-hidden"
            >
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-20 p-2 text-[#F6F1E8] hover:text-[#9B5E49] transition-colors rounded-full bg-black/50"
                aria-label="Close motion film"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85"
                  alt="Drape motion frame"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-end p-8 text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8CDBD]">
                    Film 01 · Motion & Weight
                  </span>
                  <h4 className="font-serif text-[24px]">Kaveri in Morning Light</h4>
                  <p className="text-[13px] text-[#D8CDBD]/80 max-w-md mt-1">
                    Captured at 120fps. Pure degummed mulberry silk warp reacting to cross-breezes along the Yamuna riverfront.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
