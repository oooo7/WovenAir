import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Returns & Exchanges Policy · WOVENAIR",
  description: "7-day return policy for unworn handloom sarees in archival packaging.",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen py-12 sm:py-20">
      <div className="max-w-[900px] mx-auto px-6 sm:px-10">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[#666158] flex items-center gap-2 mb-8">
          <Link href="/" className="hover:text-[#1F1E1A]">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
          <span className="text-[#1F1E1A]">Returns & Exchanges</span>
        </div>

        <h1 className="font-serif text-[42px] sm:text-[54px] text-[#1F1E1A] leading-tight mb-8">
          Returns & Exchanges
        </h1>

        <div className="space-y-8 text-[15px] sm:text-[16px] text-[#666158] font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">1. The 7-Day Window</h2>
            <p>
              We want you to feel complete intimacy and confidence with every piece. If the drape, hue, or texture does not resonate with you, we accept returns within 7 calendar days of delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">2. Return Conditions</h2>
            <p>
              • The saree must remain unworn, unwashed, and unpleated.
              <br />• The included unstitched blouse piece must remain attached and uncut.
              <br />• All original security tags, maker authenticity certificates, and archival cotton storage bags must be returned in mint condition.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">3. Doorstep Pickup & Refund Process</h2>
            <p>
              To initiate a return or exchange, simply message our concierge on WhatsApp (+91 98765 43210) or email returns@wovenair.com with your order ID. We will schedule a reverse pickup at your doorstep. Once inspected at our studio, refunds are credited back to your original source within 3 to 5 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
