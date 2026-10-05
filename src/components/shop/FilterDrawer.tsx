"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFabrics: string[];
  setSelectedFabrics: (val: string[]) => void;
  selectedWeaves: string[];
  setSelectedWeaves: (val: string[]) => void;
  selectedOccasions: string[];
  setSelectedOccasions: (val: string[]) => void;
  selectedPrice: string;
  setSelectedPrice: (val: string) => void;
  selectedColors: string[];
  setSelectedColors: (val: string[]) => void;
  onReset: () => void;
}

const fabrics = [
  "Chanderi",
  "Cotton-Silk",
  "Tussar Silk",
  "Linen",
  "Pure Cotton",
  "Silk",
  "Organza",
  "Kota Cotton",
];

const weaves = [
  "Chanderi",
  "Kanjeevaram",
  "Jamdani",
  "Ikat",
  "Maheshwari",
  "Kota",
  "Banarasi",
  "Linen",
];

const occasions = [
  "Everyday",
  "Work",
  "Festive",
  "Wedding",
  "Evening",
  "Dinner",
];

const colors = [
  "Indigo",
  "Ivory",
  "Brown",
  "Blue",
  "Green",
  "Rust",
  "Rose",
  "White",
];

const prices = [
  { label: "All Prices", value: "" },
  { label: "Under ₹7,500", value: "under-7500" },
  { label: "₹7,500 – ₹12,500", value: "7500-12500" },
  { label: "Above ₹12,500", value: "above-12500" },
];

export default function FilterDrawer({
  isOpen,
  onClose,
  selectedFabrics,
  setSelectedFabrics,
  selectedWeaves,
  setSelectedWeaves,
  selectedOccasions,
  setSelectedOccasions,
  selectedPrice,
  setSelectedPrice,
  selectedColors,
  setSelectedColors,
  onReset,
}: FilterDrawerProps) {
  const toggleArrayItem = (list: string[], item: string, setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const activeFilterCount =
    selectedFabrics.length +
    selectedWeaves.length +
    selectedOccasions.length +
    selectedColors.length +
    (selectedPrice ? 1 : 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1F1E1A]/50 backdrop-blur-xs"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] h-full bg-[#F6F1E8] border-l border-[#D8CDBD] flex flex-col justify-between z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#D8CDBD] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#666158]">
                  Refine Catalogue
                </span>
                <h3 className="font-serif text-[24px] text-[#1F1E1A]">
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#666158] hover:text-[#1F1E1A] transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Weave */}
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#666158] font-semibold mb-3">
                  Weave Discipline
                </h4>
                <div className="flex flex-wrap gap-2">
                  {weaves.map((w) => {
                    const isSelected = selectedWeaves.includes(w);
                    return (
                      <button
                        key={w}
                        onClick={() => toggleArrayItem(selectedWeaves, w, setSelectedWeaves)}
                        className={`px-3 py-1.5 text-[12px] border transition-all ${
                          isSelected
                            ? "bg-[#1F1E1A] text-[#F6F1E8] border-[#1F1E1A]"
                            : "bg-[#FBF9F5] text-[#1F1E1A] border-[#D8CDBD] hover:border-[#9B5E49]"
                        }`}
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fabric */}
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#666158] font-semibold mb-3">
                  Fabric Base
                </h4>
                <div className="flex flex-wrap gap-2">
                  {fabrics.map((f) => {
                    const isSelected = selectedFabrics.includes(f);
                    return (
                      <button
                        key={f}
                        onClick={() => toggleArrayItem(selectedFabrics, f, setSelectedFabrics)}
                        className={`px-3 py-1.5 text-[12px] border transition-all ${
                          isSelected
                            ? "bg-[#1F1E1A] text-[#F6F1E8] border-[#1F1E1A]"
                            : "bg-[#FBF9F5] text-[#1F1E1A] border-[#D8CDBD] hover:border-[#9B5E49]"
                        }`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#666158] font-semibold mb-3">
                  Occasion
                </h4>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((o) => {
                    const isSelected = selectedOccasions.includes(o);
                    return (
                      <button
                        key={o}
                        onClick={() => toggleArrayItem(selectedOccasions, o, setSelectedOccasions)}
                        className={`px-3 py-1.5 text-[12px] border transition-all ${
                          isSelected
                            ? "bg-[#1F1E1A] text-[#F6F1E8] border-[#1F1E1A]"
                            : "bg-[#FBF9F5] text-[#1F1E1A] border-[#D8CDBD] hover:border-[#9B5E49]"
                        }`}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Tones */}
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#666158] font-semibold mb-3">
                  Color Tone
                </h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => {
                    const isSelected = selectedColors.includes(c);
                    return (
                      <button
                        key={c}
                        onClick={() => toggleArrayItem(selectedColors, c, setSelectedColors)}
                        className={`px-3 py-1.5 text-[12px] border transition-all ${
                          isSelected
                            ? "bg-[#1F1E1A] text-[#F6F1E8] border-[#1F1E1A]"
                            : "bg-[#FBF9F5] text-[#1F1E1A] border-[#D8CDBD] hover:border-[#9B5E49]"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#666158] font-semibold mb-3">
                  Price
                </h4>
                <div className="space-y-2 text-[13px]">
                  {prices.map((p) => (
                    <label
                      key={p.value}
                      className="flex items-center gap-3 cursor-pointer py-1 text-[#1F1E1A]"
                    >
                      <input
                        type="radio"
                        name="priceFilter"
                        checked={selectedPrice === p.value}
                        onChange={() => setSelectedPrice(p.value)}
                        className="accent-[#9B5E49] w-4 h-4"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 bg-[#FBF9F5] border-t border-[#D8CDBD] flex gap-3">
              <button
                onClick={onReset}
                className="flex-1 py-3.5 border border-[#1F1E1A] text-[#1F1E1A] text-[12px] uppercase tracking-[0.16em] hover:bg-[#F6F1E8] transition-colors"
              >
                Reset All
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3.5 bg-[#1F1E1A] text-[#F6F1E8] text-[12px] uppercase tracking-[0.16em] hover:bg-[#9B5E49] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
