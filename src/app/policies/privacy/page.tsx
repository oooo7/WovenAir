import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy · WOVENAIR",
  description: "How WOVENAIR protects and respects client data and digital privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen py-12 sm:py-20">
      <div className="max-w-[900px] mx-auto px-6 sm:px-10">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[#666158] flex items-center gap-2 mb-8">
          <Link href="/" className="hover:text-[#1F1E1A]">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
          <span className="text-[#1F1E1A]">Privacy Policy</span>
        </div>

        <h1 className="font-serif text-[42px] sm:text-[54px] text-[#1F1E1A] leading-tight mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-[15px] sm:text-[16px] text-[#666158] font-light leading-relaxed">
          <p>
            At WOVENAIR, we value your privacy as deeply as we value handcrafted integrity. We collect only the essential personal information required to curate, process, and securely deliver your handloom orders.
          </p>

          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">Information We Collect</h2>
            <p>
              When you interact with our storefront or place a prototype order, we may collect your name, shipping address, email address, and phone number for delivery tracking and client consultation. We never sell, rent, or trade your data with third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-[24px] text-[#1F1E1A]">Data Protection & Cookies</h2>
            <p>
              We employ standard encryption protocols and local browser storage to remember your bag and wishlist selections across sessions. You can clear your cookies or request complete data deletion at any time by contacting privacy@wovenair.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
