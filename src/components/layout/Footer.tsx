"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#1F1E1A] text-[#F6F1E8] pt-20 pb-12 border-t border-[#2C2B26]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#33312B]">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8CDBD]/70 font-medium">
              Join the Conversation
            </span>
            <h3 className="font-serif text-[32px] sm:text-[40px] leading-tight text-[#F6F1E8]">
              Enter the World of Wovenair
            </h3>
            <p className="text-[14px] text-[#D8CDBD]/80 max-w-md leading-relaxed font-light">
              Receive occasional dispatches on new weave chapters, artisan field journals, and private collection previews. Never noisy.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {subscribed ? (
              <div className="flex items-center gap-3 p-4 bg-[#2C2B26] border border-[#68705B] text-[#F6F1E8] text-[14px]">
                <Check className="w-5 h-5 text-[#68705B]" />
                <span>You have entered the world of Wovenair. Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-[#2C2B26] border border-[#444038] px-5 py-3 text-[14px] text-[#F6F1E8] placeholder:text-[#666158] focus:outline-none focus:border-[#D8CDBD] transition-colors"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#F6F1E8] text-[#1F1E1A] text-[12px] uppercase tracking-[0.16em] font-semibold hover:bg-[#9B5E49] hover:text-[#F6F1E8] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Sign Me In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <span className="text-[11px] text-[#666158] mt-3">
              We respect your quiet inbox. Unsubscribe anytime.
            </span>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-16 text-[13px] border-b border-[#33312B]">
          {/* Col 1 */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#D8CDBD] font-semibold">Shop</h4>
            <ul className="space-y-2.5 text-[#D8CDBD]/80">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Sarees
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=new" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=bestseller" className="hover:text-white transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/shop?price=under-7500" className="hover:text-white transition-colors">
                  Under ₹7,500
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Saved Weaves
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#D8CDBD] font-semibold">Collections</h4>
            <ul className="space-y-2.5 text-[#D8CDBD]/80">
              <li>
                <Link href="/collections/chapter-01" className="hover:text-white transition-colors">
                  Chapter 01: The First Weave
                </Link>
              </li>
              <li>
                <Link href="/collections/festive-edit" className="hover:text-white transition-colors">
                  The Festive Edit
                </Link>
              </li>
              <li>
                <Link href="/collections/everyday-edit" className="hover:text-white transition-colors">
                  The Everyday Edit
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  Collection Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#D8CDBD] font-semibold">Textile Craft</h4>
            <ul className="space-y-2.5 text-[#D8CDBD]/80">
              <li>
                <Link href="/weaves" className="hover:text-white transition-colors">
                  The Textile Library
                </Link>
              </li>
              <li>
                <Link href="/makers" className="hover:text-white transition-colors">
                  The Master Weavers
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  Our Story & Manifesto
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-white transition-colors">
                  Journal & Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#D8CDBD] font-semibold">Client Care</h4>
            <ul className="space-y-2.5 text-[#D8CDBD]/80">
              <li>
                <Link href="/policies/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/policies/care" className="hover:text-white transition-colors">
                  Textile Care Guide
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5 */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#D8CDBD] font-semibold">Connect</h4>
            <ul className="space-y-2.5 text-[#D8CDBD]/80">
              <li>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Wovenair,%20I'd%20like%20to%20inquire%20about%20a%20saree."
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram @wovenair
                </a>
              </li>
              <li>
                <a href="mailto:curator@wovenair.com" className="hover:text-white transition-colors">
                  curator@wovenair.com
                </a>
              </li>
              <li className="pt-2 text-[12px] text-[#666158]">
                Studio: 44 Lodhi Estate, New Delhi 110003
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#666158] gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif tracking-[0.2em] text-[14px] text-[#F6F1E8]">WOVENAIR</span>
            <span>© 2026 WOVENAIR. All rights reserved.</span>
          </div>

          <div className="text-center md:text-right max-w-lg text-[10px] text-[#666158] leading-normal">
            Digital Flagship Prototype · Conceptualized for contemporary Indian textile craft.
            All maker narratives and mock records are crafted for interactive design demonstration.
          </div>
        </div>
      </div>
    </footer>
  );
}
