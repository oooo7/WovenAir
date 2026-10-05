"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface RealLifeEntry {
  id: string;
  name: string;
  location: string;
  sareeName: string;
  sareeSlug: string;
  image: string;
  caption: string;
}

const entries: RealLifeEntry[] = [
  {
    id: "irl-1",
    name: "Dr. Alisha Roy",
    location: "Bengaluru, India",
    sareeName: "KAVERI",
    sareeSlug: "kaveri",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    caption: "I wore Kaveri for twelve hours straight during a national hospital conference. Never slipped, never felt hot.",
  },
  {
    id: "irl-2",
    name: "Meera Krishnan",
    location: "London, UK",
    sareeName: "NOOR",
    sareeSlug: "noor",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    caption: "The antique gold zari doesn't glare under gallery spotlights. It feels like an illuminated manuscript.",
  },
  {
    id: "irl-3",
    name: "Tara Singhania",
    location: "Mumbai, India",
    sareeName: "NEEL",
    sareeSlug: "neel",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    caption: "Linen handloom that I can pack into a weekend carry-on and drape in five minutes without an iron.",
  },
  {
    id: "irl-4",
    name: "Shreya Sen",
    location: "Kolkata, India",
    sareeName: "VAANI",
    sareeSlug: "vaani",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    caption: "Muslin Jamdani so light it feels like an early morning breeze along the Hooghly.",
  },
];

export default function InRealLifeGallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F5] border-b border-[#D8CDBD]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 pb-6 border-b border-[#D8CDBD]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block mb-2 font-medium">
              Living Portraits
            </span>
            <h2 className="font-serif text-[38px] sm:text-[48px] text-[#1F1E1A] leading-tight">
              WOVENAIR / In Real Life
            </h2>
          </div>
          <p className="text-[13px] text-[#666158] max-w-sm mt-2 sm:mt-0 font-light">
            Sarees lived in, traveled in, and celebrated across cities and continents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[#F6F1E8] border border-[#D8CDBD] flex flex-col justify-between cursor-pointer"
              onMouseEnter={() => setHoveredId(entry.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#D8CDBD]">
                <Image
                  src={entry.image}
                  alt={`${entry.name} wearing ${entry.sareeName}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`object-cover object-top transition-transform duration-700 ease-out ${hoveredId === entry.id ? "scale-[1.05]" : "scale-100"}`}
                />
                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${hoveredId === entry.id ? "opacity-100" : "opacity-0"}`} />
                <div className="absolute top-3 left-3 bg-[#F6F1E8]/90 backdrop-blur-sm px-2.5 py-1">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#1F1E1A] font-medium">{entry.sareeName}</span>
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-serif text-[18px] text-[#1F1E1A] font-medium">
                      {entry.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#666158]">
                      {entry.location}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#666158] italic font-serif leading-relaxed">
                    &ldquo;{entry.caption}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D8CDBD]/70">
                  <Link
                    href={`/products/${entry.sareeSlug}`}
                    className="text-[11px] uppercase tracking-[0.16em] text-[#9B5E49] hover:text-[#1F1E1A] font-medium transition-colors"
                  >
                    View {entry.sareeName} Saree &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
