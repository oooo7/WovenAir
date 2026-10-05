import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Textile Care Guide · Silk, Zari & Linen · WOVENAIR",
  description: "Preserving the life and luster of authentic Indian handloom sarees across generations.",
};

export default function CarePolicyPage() {
  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen py-12 sm:py-20">
      <div className="max-w-[900px] mx-auto px-6 sm:px-10">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[#666158] flex items-center gap-2 mb-8">
          <Link href="/" className="hover:text-[#1F1E1A]">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
          <span className="text-[#1F1E1A]">Textile Care</span>
        </div>

        <h1 className="font-serif text-[42px] sm:text-[54px] text-[#1F1E1A] leading-tight mb-8">
          The Textile Care Guide
        </h1>

        <div className="space-y-8 text-[15px] sm:text-[16px] text-[#666158] font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">1. Pure Silk & Brocade Care (Chanderi, Banarasi, Kanjeevaram)</h2>
            <p>
              Natural silk fibers contain living protein threads (fibroin and sericin). For the first two to three cleans, dry cleaning is strongly recommended to protect natural plant dyes and extra-weft zari bindings.
            </p>
            <p>
              • Always iron on low silk setting with a clean press cloth between iron and fabric.
              <br />• Never spray alcohol-based perfumes or deodorants directly onto zari borders.
              <br />• Every six months, unfold the saree, air in ambient shade for an hour, and refold along new creases to prevent fiber fatigue.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">2. Handloom Linen & Jamdani Muslin Care</h2>
            <p>
              Hand-spun cottons and pure European-origin flax linens soften with each wash. Hand wash gently in cold water using a mild pH-neutral liquid detergent.
            </p>
            <p>
              • Do not wring or spin vigorously; gentle squeeze only.
              <br />• Dry flat on a drying rack in natural shade away from harsh noon sunlight.
              <br />• Press while slightly damp for crisp, architectural pleats.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">3. Storage & Longevity</h2>
            <p>
              Never store handwoven sarees inside synthetic plastic or PVC zippered bags, which trap humidity and can oxidize metallic silver or gold zari. Keep your sarees inside the breathable unbleached cotton bags provided with your order, placed alongside dried neem leaves or cedar blocks.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
