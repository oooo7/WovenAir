"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Maker } from "@/types";

interface TheMakersSectionProps {
  makers: Maker[];
}

export default function TheMakersSection({ makers }: TheMakersSectionProps) {
  const featuredMaker = makers[0];

  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F5]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large Craft Portrait */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#D8CDBD]">
              <Image
                src={featuredMaker?.workshopImage || "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=85"}
                alt="Master Artisan at Pit Loom"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Small portrait inset */}
            {featuredMaker && (
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 w-32 sm:w-40 aspect-square bg-[#F6F1E8] p-2 border border-[#D8CDBD] shadow-md">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={featuredMaker.portrait}
                    alt={featuredMaker.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6 mt-8 sm:mt-0">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#68705B] font-semibold block">
              Human Lineage
            </span>

            <h2 className="font-serif text-[38px] sm:text-[50px] leading-[1.08] text-[#1F1E1A]">
              Made by hand.
              <br />
              <span className="italic">Made by someone.</span>
            </h2>

            <p className="text-[16px] text-[#666158] leading-relaxed font-light">
              Every yard of a WOVENAIR saree is born from hours of attuned human rhythm. A master weaver does not merely supervise a machine; they listen to the tension of warp threads, compensate for humidity shifts, and build living memories into the selvage.
            </p>

            <blockquote className="border-l-2 border-[#9B5E49] pl-4 italic font-serif text-[18px] text-[#1F1E1A]">
              “The shuttle must breathe at the exact rhythm of the weaver&apos;s hands.”
              <span className="block text-[11px] font-sans not-italic uppercase tracking-widest text-[#666158] mt-2">
                — Ramesh Chandra Bunkar · 34 Years at the Loom
              </span>
            </blockquote>

            <div className="pt-4">
              <Link
                href="/makers"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1F1E1A] text-[#F6F1E8] text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#68705B] transition-colors"
              >
                <span>Meet The Master Weavers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
