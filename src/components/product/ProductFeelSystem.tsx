"use client";

import { FeelRatings } from "@/types";

interface ProductFeelSystemProps {
  feelRatings: FeelRatings;
  feelDescription: string;
}

export default function ProductFeelSystem({
  feelRatings,
  feelDescription,
}: ProductFeelSystemProps) {
  const getDescriptor = (label: string, score: number) => {
    switch (label) {
      case "Lightness":
        return score >= 4 ? "Featherlight" : score === 3 ? "Balanced" : "Substantial";
      case "Structure":
        return score >= 4 ? "Crisp & Sculptural" : score === 3 ? "Supple Body" : "Unstructured";
      case "Sheen":
        return score >= 4 ? "Luminous Zari" : score === 3 ? "Subtle Halo" : "Matte Earth";
      case "Drape":
        return score >= 4 ? "Liquid Cascade" : score === 3 ? "Defined Pleats" : "Architectural";
      default:
        return "";
    }
  };

  const metrics = [
    { label: "Lightness", score: feelRatings.lightness },
    { label: "Structure", score: feelRatings.structure },
    { label: "Sheen", score: feelRatings.sheen },
    { label: "Drape", score: feelRatings.drape },
  ];

  return (
    <div className="p-5 bg-[#FBF9F5] border border-[#D8CDBD] space-y-4">
      <div className="flex items-baseline justify-between border-b border-[#D8CDBD]/70 pb-3">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#666158] font-semibold block">
            Tactile Feel Matrix
          </span>
          <span className="text-[13px] font-serif italic text-[#704238]">
            Feels: {feelDescription}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.16em] text-[#68705B] font-medium bg-[#68705B]/10 px-2 py-0.5">
          Handloom Calibrated
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 pt-1">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#1F1E1A] font-medium">{m.label}</span>
              <span className="text-[11px] text-[#666158] italic font-serif">
                {getDescriptor(m.label, m.score)}
              </span>
            </div>
            <div className="flex items-center gap-1.5" aria-label={`${m.label}: ${m.score} of 5`}>
              {[1, 2, 3, 4, 5].map((dot) => (
                <span
                  key={dot}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    dot <= m.score ? "bg-[#1F1E1A]" : "bg-[#D8CDBD]/60"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
