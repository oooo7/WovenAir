"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Weave } from "@/types";

interface ShopByWeaveSectionProps {
  weaves: Weave[];
}

export default function ShopByWeaveSection({ weaves }: ShopByWeaveSectionProps) {
  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F5] border-t border-[#D8CDBD]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block font-medium">
            Handloom Archive
          </span>
          <h2 className="font-serif text-[38px] sm:text-[48px] text-[#1F1E1A] leading-tight">
            The Textile Stories
          </h2>
          <p className="text-[14px] text-[#666158] font-light">
            Eight master handloom disciplines reimagined for contemporary drape, breathability, and weight.
          </p>
        </motion.div>

        {/* 8 Weave Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weaves.map((weave, index) => (
            <motion.div
              key={weave.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: (index % 4) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/weaves/${weave.slug}`}
                className="group block relative bg-[#F6F1E8] border border-[#D8CDBD] overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#D8CDBD]">
                  <Image
                    src={weave.heroImage}
                    alt={weave.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between min-h-[140px]">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#666158]">
                        {weave.region}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#666158] group-hover:text-[#9B5E49] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h3 className="font-serif text-[22px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors">
                      {weave.name}
                    </h3>
                    <p className="text-[12px] text-[#666158] mt-1 line-clamp-2 leading-relaxed font-light">
                      "{weave.tagline}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D8CDBD]/60">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-[#1F1E1A] group-hover:text-[#9B5E49] font-medium inline-block">
                      Explore Weave →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
