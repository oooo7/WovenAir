"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { productsData } from "@/data/products";

export default function ShopTheLookSection() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);
  const addItem = useCartStore((state) => state.addItem);
  const kaveriProduct = productsData.find((p) => p.slug === "kaveri") || productsData[0];

  const hotspots = [
    {
      id: 1,
      type: "SAREE",
      name: "Kaveri Indigo Chanderi",
      price: 8900,
      detail: "Handwoven Cotton-Silk with hairline metallic border",
      x: 48,
      y: 65,
      isSaree: true,
    },
    {
      id: 2,
      type: "BLOUSE",
      name: "Raw Silk Boat-Neck Crop",
      price: 3400,
      detail: "Tailored slate grey raw mulberry silk with horn buttons",
      x: 52,
      y: 36,
      isSaree: false,
    },
    {
      id: 3,
      type: "JEWELLERY",
      name: "Kashmir Silver Ear Pin",
      price: 4200,
      detail: "Minimal beaten 925 sterling silver drop pin",
      x: 46,
      y: 18,
      isSaree: false,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F6F1E8] border-b border-[#D8CDBD]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block font-medium">
            Styling Concept
          </span>
          <h2 className="font-serif text-[38px] sm:text-[48px] text-[#1F1E1A] leading-tight">
            Shop the Look
          </h2>
          <p className="text-[14px] text-[#666158] font-light">
            Interactive ensembles curated for fluid transitions between daylight commitments and evening celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Model Photograph with Clickable Pins */}
          <div className="lg:col-span-8 relative aspect-[4/5] sm:aspect-[16/11] bg-[#D8CDBD] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85"
              alt="Editorial Model draped in Kaveri Saree"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover object-top"
            />

            {/* Hotspot Pins */}
            {hotspots.map((spot, index) => (
              <div
                key={spot.id}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  onClick={() => setActiveHotspot(activeHotspot === index ? null : index)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                    activeHotspot === index
                      ? "bg-[#9B5E49] text-white scale-110 shadow-lg ring-4 ring-white/50"
                      : "bg-[#1F1E1A]/85 text-white hover:bg-[#9B5E49] hover:scale-105"
                  }`}
                  aria-label={`View ${spot.name}`}
                >
                  <Plus className={`w-3.5 h-3.5 transition-transform ${activeHotspot === index ? "rotate-45" : ""}`} />
                </button>
              </div>
            ))}
          </div>

          {/* Right: Selected Hotspot Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#666158] font-semibold border-b border-[#D8CDBD] pb-2">
              Ensemble Breakdown
            </h4>

            <div className="space-y-3">
              {hotspots.map((spot, index) => {
                const isSelected = activeHotspot === index;
                return (
                  <div
                    key={spot.id}
                    onClick={() => setActiveHotspot(index)}
                    className={`p-4 border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#FBF9F5] border-[#9B5E49] shadow-xs"
                        : "bg-[#F6F1E8] border-[#D8CDBD] hover:border-[#666158]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#9B5E49] mb-1">
                      <span>{spot.type}</span>
                      <span className="text-[#1F1E1A] font-semibold font-sans text-[13px]">
                        {formatPrice(spot.price)}
                      </span>
                    </div>

                    <h5 className="font-serif text-[18px] text-[#1F1E1A] leading-snug">
                      {spot.name}
                    </h5>

                    <p className="text-[12px] text-[#666158] mt-1 font-light leading-relaxed">
                      {spot.detail}
                    </p>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-[#D8CDBD] flex gap-2">
                        {spot.isSaree ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem(kaveriProduct, 1);
                            }}
                            className="flex-1 py-2 bg-[#1F1E1A] text-[#F6F1E8] text-[11px] uppercase tracking-[0.14em] flex items-center justify-center gap-1.5 hover:bg-[#9B5E49] transition-colors"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add Saree to Bag</span>
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem(kaveriProduct, 1, spot.name);
                            }}
                            className="flex-1 py-2 bg-[#1F1E1A] text-[#F6F1E8] text-[11px] uppercase tracking-[0.14em] flex items-center justify-center gap-1.5 hover:bg-[#9B5E49] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Piece ({formatPrice(spot.price)})</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
