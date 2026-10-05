import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery Policy · WOVENAIR",
  description: "Complimentary express delivery across India. Global insured shipping policies.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen py-12 sm:py-20">
      <div className="max-w-[900px] mx-auto px-6 sm:px-10">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[#666158] flex items-center gap-2 mb-8">
          <Link href="/" className="hover:text-[#1F1E1A]">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
          <span className="text-[#1F1E1A]">Shipping & Delivery</span>
        </div>

        <h1 className="font-serif text-[42px] sm:text-[54px] text-[#1F1E1A] leading-tight mb-8">
          Shipping & Delivery Policy
        </h1>

        <div className="space-y-8 text-[15px] sm:text-[16px] text-[#666158] font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">1. Domestic Delivery (India)</h2>
            <p>
              We offer complimentary insured door-to-door shipping on all domestic orders across India. Orders are dispatched from our New Delhi studio within 24 to 48 hours of order confirmation.
            </p>
            <p>
              Estimated transit timelines:
              <br />• Metro Cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad): 2 to 4 business days.
              <br />• Tier II / Tier III Towns & Rural Postal Codes: 4 to 6 business days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">2. International Shipping</h2>
            <p>
              WOVENAIR delivers to over 60 countries globally via DHL Express and FedEx International. International shipping rates are calculated dynamically at checkout based on package weight and destination country.
            </p>
            <p>
              Estimated transit time is 4 to 7 business days worldwide. Custom duties, import levies, and VAT imposed by destination border authorities remain the responsibility of the recipient.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">3. Archival Packaging & Tracking</h2>
            <p>
              Every saree is gently folded in acid-free tissue paper, packed in a breathable organic cotton storage bag, and sealed in weather-resistant exterior protective cartons. You will receive an automated tracking link via email and WhatsApp upon courier dispatch.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
