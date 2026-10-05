import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Terms of Service · WOVENAIR",
  description: "Terms governing use of the WOVENAIR storefront and prototype services.",
};

export default function TermsPolicyPage() {
  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen py-12 sm:py-20">
      <div className="max-w-[900px] mx-auto px-6 sm:px-10">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[#666158] flex items-center gap-2 mb-8">
          <Link href="/" className="hover:text-[#1F1E1A]">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
          <span className="text-[#1F1E1A]">Terms of Service</span>
        </div>

        <h1 className="font-serif text-[42px] sm:text-[54px] text-[#1F1E1A] leading-tight mb-8">
          Terms of Service
        </h1>

        <div className="space-y-8 text-[15px] sm:text-[16px] text-[#666158] font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">1. Handloom Craft Variance</h2>
            <p>
              Every saree in the WOVENAIR catalogue is woven on manual throw-shuttle or pit looms. Slight variations in yarn slub, selvage pin marks, and natural vegetable dye absorption are inherent characteristics of human craft and are celebrated as marks of authentic origin rather than defects.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">2. Prototype Architecture Notice</h2>
            <p>
              This website serves as a flagship digital storefront prototype. All payment steps, order logs, and simulated pincode check flows operate in demonstration mode without financial debiting.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">3. Intellectual Property</h2>
            <p>
              All textile designs, original photography, editorial writings, and digital interface elements are proprietary to WOVENAIR. Unauthorised duplication or commercial reproduction without explicit studio consent is prohibited.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
