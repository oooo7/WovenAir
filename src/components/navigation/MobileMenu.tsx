"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#1F1E1A]/50 backdrop-blur-sm lg:hidden flex"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-[88%] max-w-[400px] h-full bg-[#F6F1E8] border-r border-[#D8CDBD] flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="p-6 border-b border-[#D8CDBD] flex items-center justify-between">
              <span className="font-serif text-[22px] tracking-[0.2em] font-medium text-[#1F1E1A]">
                WOVENAIR
              </span>
              <button
                onClick={onClose}
                className="p-2 text-[#666158] hover:text-[#1F1E1A] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-6 py-6 space-y-6">
              {/* SHOP accordion */}
              <div className="border-b border-[#D8CDBD]/70 pb-4">
                <button
                  onClick={() => toggleSection("SHOP")}
                  className="w-full flex items-center justify-between text-left py-2 font-serif text-[22px] text-[#1F1E1A]"
                >
                  <span>SHOP</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#666158] transition-transform ${
                      expandedSection === "SHOP" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedSection === "SHOP" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-2 pt-2 space-y-2.5 text-[14px] text-[#666158]"
                    >
                      <Link href="/shop" onClick={onClose} className="block py-1 hover:text-[#9B5E49]">
                        All Sarees
                      </Link>
                      <Link href="/shop?filter=new" onClick={onClose} className="block py-1 hover:text-[#9B5E49]">
                        New Arrivals
                      </Link>
                      <Link href="/shop?filter=bestseller" onClick={onClose} className="block py-1 hover:text-[#9B5E49]">
                        Bestsellers
                      </Link>
                      <Link href="/shop?price=under-7500" onClick={onClose} className="block py-1 hover:text-[#9B5E49]">
                        Under ₹7,500
                      </Link>
                      <Link href="/shop?price=7500-12500" onClick={onClose} className="block py-1 hover:text-[#9B5E49]">
                        ₹7,500 – ₹12,500
                      </Link>
                      <Link href="/shop?price=above-20000" onClick={onClose} className="block py-1 hover:text-[#9B5E49]">
                        Above ₹20,000
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* COLLECTIONS accordion */}
              <div className="border-b border-[#D8CDBD]/70 pb-4">
                <button
                  onClick={() => toggleSection("COLLECTIONS")}
                  className="w-full flex items-center justify-between text-left py-2 font-serif text-[22px] text-[#1F1E1A]"
                >
                  <span>COLLECTIONS</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#666158] transition-transform ${
                      expandedSection === "COLLECTIONS" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedSection === "COLLECTIONS" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-2 pt-2 space-y-2.5 text-[14px] text-[#666158]"
                    >
                      <Link href="/collections" onClick={onClose} className="block py-1 hover:text-[#9B5E49]">
                        All Collections
                      </Link>
                      <Link href="/collections/chapter-01" onClick={onClose} className="block py-1 hover:text-[#9B5E49]">
                        Chapter 01 — The First Weave
                      </Link>
                      <Link href="/collections/festive-edit" onClick={onClose} className="block py-1 hover:text-[#9B5E49]">
                        The Festive Edit
                      </Link>
                      <Link href="/collections/everyday-edit" onClick={onClose} className="block py-1 hover:text-[#9B5E49]">
                        The Everyday Edit
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* WEAVES accordion */}
              <div className="border-b border-[#D8CDBD]/70 pb-4">
                <button
                  onClick={() => toggleSection("WEAVES")}
                  className="w-full flex items-center justify-between text-left py-2 font-serif text-[22px] text-[#1F1E1A]"
                >
                  <span>WEAVES</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#666158] transition-transform ${
                      expandedSection === "WEAVES" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedSection === "WEAVES" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-2 pt-2 grid grid-cols-2 gap-2 text-[13px] text-[#666158]"
                    >
                      {["chanderi", "kanjeevaram", "jamdani", "ikat", "maheshwari", "kota", "banarasi", "linen"].map(
                        (w) => (
                          <Link
                            key={w}
                            href={`/weaves/${w}`}
                            onClick={onClose}
                            className="capitalize py-1 hover:text-[#9B5E49]"
                          >
                            {w}
                          </Link>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct links */}
              <div className="border-b border-[#D8CDBD]/70 pb-4">
                <Link
                  href="/journal"
                  onClick={onClose}
                  className="block py-2 font-serif text-[22px] text-[#1F1E1A] hover:text-[#9B5E49]"
                >
                  JOURNAL
                </Link>
              </div>

              <div className="border-b border-[#D8CDBD]/70 pb-4">
                <Link
                  href="/our-story"
                  onClick={onClose}
                  className="block py-2 font-serif text-[22px] text-[#1F1E1A] hover:text-[#9B5E49]"
                >
                  OUR STORY
                </Link>
              </div>

              <div className="border-b border-[#D8CDBD]/70 pb-4">
                <Link
                  href="/makers"
                  onClick={onClose}
                  className="block py-2 font-serif text-[22px] text-[#1F1E1A] hover:text-[#9B5E49]"
                >
                  THE MAKERS
                </Link>
              </div>

              <div>
                <Link
                  href="/wishlist"
                  onClick={onClose}
                  className="block py-2 font-serif text-[22px] text-[#1F1E1A] hover:text-[#9B5E49]"
                >
                  SAVED WEAVES
                </Link>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="p-6 bg-[#FBF9F5] border-t border-[#D8CDBD] space-y-4">
              <a
                href="https://wa.me/919876543210?text=Hello,%20I'd%20like%20to%20consult%20on%20a%20saree%20from%20Wovenair."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-[#9B5E49] font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </a>
              <p className="text-[11px] text-[#666158]">
                Complimentary shipping across India · Express international delivery
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
