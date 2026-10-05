"use client";

import { MessageSquare } from "lucide-react";

export default function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hello%20Wovenair,%20I'm%20interested%20in%20learning%20more%20about%20your%20sarees."
      target="_blank"
      rel="noreferrer"
      aria-label="Contact Wovenair curator on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 bg-[#1F1E1A] text-[#F6F1E8] border border-[#D8CDBD]/40 shadow-lg hover:bg-[#9B5E49] hover:border-[#9B5E49] transition-all group"
    >
      <MessageSquare className="w-4 h-4 text-[#F6F1E8]" />
      <span className="text-[11px] uppercase tracking-[0.14em] font-medium hidden sm:inline-block">
        Ask Curator
      </span>
    </a>
  );
}
