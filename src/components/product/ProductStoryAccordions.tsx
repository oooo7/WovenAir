"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";

interface ProductStoryAccordionsProps {
  product: Product;
}

export default function ProductStoryAccordions({ product }: ProductStoryAccordionsProps) {
  const [openSection, setOpenSection] = useState<string | null>("story");

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: "story",
      title: "THE STORY",
      content: (
        <div className="space-y-3 text-[14px] text-[#666158] font-light leading-relaxed">
          <p>{product.story}</p>
        </div>
      ),
    },
    {
      id: "weave",
      title: "THE WEAVE & ORIGIN",
      content: (
        <div className="space-y-3 text-[14px] text-[#666158] font-light leading-relaxed">
          <p>
            Woven in {product.region} utilizing traditional {product.technique} methods. This piece preserves indigenous handloom geometry while optimizing warp tension for all-day lightness and breathability.
          </p>
        </div>
      ),
    },
    {
      id: "details",
      title: "THE CRAFT DETAILS",
      content: (
        <ul className="space-y-2 text-[13px] text-[#666158] list-disc list-inside font-light">
          {product.craftDetails.map((detail, idx) => (
            <li key={idx} className="leading-relaxed">
              {detail}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "drape",
      title: "THE DRAPE & FEEL",
      content: (
        <div className="space-y-2 text-[14px] text-[#666158] font-light leading-relaxed">
          <p>
            Characterized as a <strong className="font-medium text-[#1F1E1A]">{product.drape.toLowerCase()}</strong> drape with <strong className="font-medium text-[#1F1E1A]">{product.weight.toLowerCase()}</strong> weight and <strong className="font-medium text-[#1F1E1A]">{product.transparency.toLowerCase()}</strong> opacity.
          </p>
          <p className="text-[13px] italic font-serif text-[#704238]">
            “Feels: {product.feelDescription}”
          </p>
        </div>
      ),
    },
    {
      id: "included",
      title: "WHAT'S INCLUDED",
      content: (
        <div className="space-y-2 text-[13px] text-[#666158] font-light">
          <p>• Saree: {product.length} length × {product.width} width.</p>
          <p>• Blouse Piece: {product.blousePieceDetails || "80cm unstitched fabric included."}</p>
          <p>• Packaging: Archival breathable organic cotton storage bag & handwritten maker card.</p>
        </div>
      ),
    },
    {
      id: "care",
      title: "CARE INSTRUCTIONS",
      content: (
        <div className="space-y-2 text-[13px] text-[#666158] font-light leading-relaxed">
          <p>{product.care}</p>
          <p>Avoid harsh chemical perfumes directly on metallic threads. Store folded in breathable cotton away from moisture.</p>
        </div>
      ),
    },
    {
      id: "shipping",
      title: "SHIPPING & RETURNS",
      content: (
        <div className="space-y-2 text-[13px] text-[#666158] font-light leading-relaxed">
          <p>• {product.delivery}</p>
          <p>• 7-day hassle-free return window for unworn items in original archival packaging.</p>
          <p>• International express delivery calculated dynamically at checkout.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="border-t border-[#D8CDBD] mt-8 divide-y divide-[#D8CDBD]">
      {sections.map((section) => {
        const isOpen = openSection === section.id;
        return (
          <div key={section.id} className="py-4">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between text-left py-1 text-[12px] uppercase tracking-[0.18em] font-medium text-[#1F1E1A] hover:text-[#9B5E49] transition-colors"
            >
              <span>{section.title}</span>
              <ChevronDown
                className={`w-4 h-4 text-[#666158] transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-[#1F1E1A]" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden pt-3 pb-1"
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
