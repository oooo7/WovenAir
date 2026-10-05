"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface DesktopMegaMenuProps {
  activeMenu: string | null;
  onClose: () => void;
}

export default function DesktopMegaMenu({ activeMenu, onClose }: DesktopMegaMenuProps) {
  return (
    <AnimatePresence>
      {activeMenu && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onMouseLeave={onClose}
          className="absolute top-full left-0 w-full bg-[#F6F1E8]/98 backdrop-blur-md border-b border-[#D8CDBD] shadow-sm z-50 text-[#1F1E1A]"
        >
          <div className="max-w-[1320px] mx-auto px-10 py-12">
            {activeMenu === "SHOP" && (
              <div className="grid grid-cols-4 gap-12">
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#666158] mb-5 font-semibold">
                    Sarees
                  </h4>
                  <ul className="space-y-3 text-[14px]">
                    <li>
                      <Link href="/shop" onClick={onClose} className="hover:text-[#9B5E49] transition-colors">
                        All Sarees
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?filter=new" onClick={onClose} className="hover:text-[#9B5E49] transition-colors">
                        New Arrivals
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?filter=bestseller" onClick={onClose} className="hover:text-[#9B5E49] transition-colors">
                        Bestsellers
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?filter=ready" onClick={onClose} className="hover:text-[#9B5E49] transition-colors">
                        Ready to Ship
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?filter=last-few" onClick={onClose} className="hover:text-[#9B5E49] transition-colors">
                        Last Few Pieces
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#666158] mb-5 font-semibold">
                    Shop by Price
                  </h4>
                  <ul className="space-y-3 text-[14px]">
                    <li>
                      <Link href="/shop?price=under-7500" onClick={onClose} className="hover:text-[#9B5E49] transition-colors">
                        Under ₹7,500
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?price=7500-12500" onClick={onClose} className="hover:text-[#9B5E49] transition-colors">
                        ₹7,500 – ₹12,500
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?price=12500-20000" onClick={onClose} className="hover:text-[#9B5E49] transition-colors">
                        ₹12,500 – ₹20,000
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop?price=above-20000" onClick={onClose} className="hover:text-[#9B5E49] transition-colors">
                        Above ₹20,000
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#666158] mb-5 font-semibold">
                    Featured Edit
                  </h4>
                  <p className="text-[13px] text-[#666158] leading-relaxed mb-4">
                    Lightness in dialogue with structure. Sarees calibrated for modern movement.
                  </p>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="inline-block text-[12px] uppercase tracking-[0.15em] border-b border-[#1F1E1A] pb-0.5 hover:text-[#9B5E49] hover:border-[#9B5E49] transition-all"
                  >
                    View All 16 Sarees →
                  </Link>
                </div>

                <div className="relative aspect-[3/4] overflow-hidden bg-[#D8CDBD]">
                  <Image
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
                    alt="Kaveri Silk Saree"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] uppercase tracking-[0.2em]">Featured Weave</span>
                    <span className="font-serif text-[18px]">Kaveri Indigo Chanderi</span>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "COLLECTIONS" && (
              <div className="grid grid-cols-4 gap-8">
                <Link
                  href="/collections/chapter-01"
                  onClick={onClose}
                  className="group block space-y-3"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#D8CDBD]">
                    <Image
                      src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
                      alt="Chapter 01"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#666158]">Chapter 01</span>
                    <h5 className="font-serif text-[18px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors">
                      The First Weave
                    </h5>
                    <p className="text-[12px] text-[#666158]">Inaugural conversation between craft and air.</p>
                  </div>
                </Link>

                <Link
                  href="/collections/festive-edit"
                  onClick={onClose}
                  className="group block space-y-3"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#D8CDBD]">
                    <Image
                      src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80"
                      alt="Festive Edit"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#666158]">Chapter 02</span>
                    <h5 className="font-serif text-[18px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors">
                      The Festive Edit
                    </h5>
                    <p className="text-[12px] text-[#666158]">Ceremonial splendour with weightless ease.</p>
                  </div>
                </Link>

                <Link
                  href="/collections/everyday-edit"
                  onClick={onClose}
                  className="group block space-y-3"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#D8CDBD]">
                    <Image
                      src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"
                      alt="Everyday Edit"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#666158]">Chapter 03</span>
                    <h5 className="font-serif text-[18px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors">
                      The Everyday Edit
                    </h5>
                    <p className="text-[12px] text-[#666158]">Honest linens and breathable morning muslins.</p>
                  </div>
                </Link>

                <div className="flex flex-col justify-center p-6 border-l border-[#D8CDBD]">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#666158] mb-3">Archive</span>
                  <h4 className="font-serif text-[24px] mb-3 leading-snug">World-Building in Six Yards</h4>
                  <p className="text-[13px] text-[#666158] mb-6 leading-relaxed">
                    Explore the stories, artisan regions, and moodboards behind each collection edit.
                  </p>
                  <Link
                    href="/collections"
                    onClick={onClose}
                    className="text-[12px] uppercase tracking-[0.15em] border-b border-[#1F1E1A] pb-0.5 hover:text-[#9B5E49] hover:border-[#9B5E49] transition-colors self-start"
                  >
                    View All Collections →
                  </Link>
                </div>
              </div>
            )}

            {activeMenu === "WEAVES" && (
              <div>
                <div className="flex justify-between items-baseline mb-6 border-b border-[#D8CDBD] pb-4">
                  <div>
                    <h3 className="font-serif text-[24px]">The Textile Library</h3>
                    <p className="text-[13px] text-[#666158]">Eight master handloom disciplines reimagined.</p>
                  </div>
                  <Link
                    href="/weaves"
                    onClick={onClose}
                    className="text-[12px] uppercase tracking-[0.15em] hover:text-[#9B5E49] transition-colors"
                  >
                    Explore Full Library →
                  </Link>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {[
                    { name: "CHANDERI", sub: "Silk, light and luminous", slug: "chanderi" },
                    { name: "KANJEEVARAM", sub: "Structure and ceremony", slug: "kanjeevaram" },
                    { name: "JAMDANI", sub: "Patterns built into the weave", slug: "jamdani" },
                    { name: "IKAT", sub: "Colour carried through thread", slug: "ikat" },
                    { name: "MAHESHWARI", sub: "Light, fluid and precise", slug: "maheshwari" },
                    { name: "KOTA", sub: "Air woven into form", slug: "kota" },
                    { name: "BANARASI", sub: "Pattern, silk and splendour", slug: "banarasi" },
                    { name: "LINEN", sub: "Quiet texture for everyday", slug: "linen" },
                  ].map((weave) => (
                    <Link
                      key={weave.slug}
                      href={`/weaves/${weave.slug}`}
                      onClick={onClose}
                      className="group p-4 bg-[#FBF9F5] border border-[#D8CDBD]/70 hover:border-[#9B5E49] transition-all"
                    >
                      <h5 className="font-serif text-[17px] font-medium group-hover:text-[#9B5E49] transition-colors">
                        {weave.name}
                      </h5>
                      <p className="text-[12px] text-[#666158] mt-1">{weave.sub}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeMenu === "EDIT" && (
              <div className="grid grid-cols-3 gap-10">
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#666158] mb-5 font-semibold">
                    Shop by Occasion
                  </h4>
                  <ul className="space-y-3 text-[14px]">
                    {["Everyday", "Work", "Festive", "Wedding", "Evening", "Gifting"].map((item) => (
                      <li key={item}>
                        <Link
                          href={`/shop?occasion=${item.toLowerCase()}`}
                          onClick={onClose}
                          className="hover:text-[#9B5E49] transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#666158] mb-5 font-semibold">
                    Curated Stories
                  </h4>
                  <ul className="space-y-3 text-[14px]">
                    <li>
                      <Link href="/shop" onClick={onClose} className="hover:text-[#9B5E49] transition-colors">
                        Shop The Look (Complete Ensembles)
                      </Link>
                    </li>
                    <li>
                      <Link href="/our-story" onClick={onClose} className="hover:text-[#9B5E49] transition-colors">
                        The Thread to Saree Philosophy
                      </Link>
                    </li>
                    <li>
                      <Link href="/makers" onClick={onClose} className="hover:text-[#9B5E49] transition-colors">
                        Meet The Master Weavers
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#FBF9F5] p-6 border border-[#D8CDBD] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B5E49] font-semibold">
                      Saree Consultation
                    </span>
                    <h5 className="font-serif text-[20px] mt-2 mb-3">Unsure Which Weave Suits You?</h5>
                    <p className="text-[13px] text-[#666158] leading-relaxed">
                      Connect directly via WhatsApp with our textile curator for personalized drape, weight, and occasion advice.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/919876543210?text=Hello,%20I'd%20like%20to%20consult%20on%20choosing%20a%20saree%20from%20Wovenair."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-4 text-[12px] uppercase tracking-[0.15em] text-[#9B5E49] font-medium border-b border-[#9B5E49] pb-0.5 self-start"
                  >
                    Consult on WhatsApp →
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
