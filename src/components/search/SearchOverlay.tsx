"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CommerceProvider, SearchResults } from "@/lib/commerce";
import { formatPrice } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    products: [],
    collections: [],
    weaves: [],
    journal: [],
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery("");
    setResults({ products: [], collections: [], weaves: [], journal: [] });
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  useEffect(() => {
    let active = true;
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults({ products: [], collections: [], weaves: [], journal: [] });
        return;
      }
      const data = await CommerceProvider.searchAll(query);
      if (active) {
        setResults(data);
      }
    };
    const timer = setTimeout(fetchResults, 200);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  const hasResults =
    results.products.length > 0 ||
    results.collections.length > 0 ||
    results.weaves.length > 0 ||
    results.journal.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#1F1E1A]/60 backdrop-blur-sm flex flex-col justify-start"
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-[#F6F1E8] border-b border-[#D8CDBD] max-h-[88vh] overflow-y-auto shadow-2xl"
          >
            {/* Header bar */}
            <div className="max-w-[1320px] mx-auto px-6 sm:px-10 pt-8 pb-6">
              <div className="flex items-center justify-between border-b-2 border-[#1F1E1A] pb-4">
                <div className="flex items-center gap-4 flex-1">
                  <SearchIcon className="w-6 h-6 text-[#666158]" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search a weave, colour, collection..."
                    className="w-full bg-transparent font-serif text-[22px] sm:text-[32px] text-[#1F1E1A] placeholder:text-[#666158]/50 focus:outline-none"
                    aria-label="Search site catalogue"
                  />
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-[#666158] hover:text-[#1F1E1A] transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Suggestions when query is empty */}
              {!query.trim() && (
                <div className="py-8">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#666158] block mb-4">
                    Popular Searches
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Chanderi", "Indigo", "Ivory Silk", "Jamdani", "Festive", "Linen", "Kanjeevaram"].map(
                      (item) => (
                        <button
                          key={item}
                          onClick={() => setQuery(item)}
                          className="px-4 py-1.5 bg-[#FBF9F5] border border-[#D8CDBD] text-[13px] text-[#1F1E1A] hover:border-[#9B5E49] hover:text-[#9B5E49] transition-colors"
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Grouped Search Results */}
              {query.trim() && hasResults && (
                <div className="py-8 space-y-10">
                  {/* Products */}
                  {results.products.length > 0 && (
                    <div>
                      <div className="flex items-baseline justify-between mb-4 border-b border-[#D8CDBD] pb-2">
                        <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#666158] font-semibold">
                          Sarees ({results.products.length})
                        </h4>
                        <Link
                          href={`/shop?search=${encodeURIComponent(query)}`}
                          onClick={handleClose}
                          className="text-[12px] uppercase tracking-[0.1em] text-[#9B5E49] hover:underline"
                        >
                          View All in Shop →
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {results.products.slice(0, 4).map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            onClick={handleClose}
                            className="group block space-y-2"
                          >
                            <div className="relative aspect-[3/4] bg-[#D8CDBD] overflow-hidden">
                              <Image
                                src={product.images.fullDrape}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.15em] text-[#666158] block">
                              {product.weave}
                            </span>
                            <h5 className="font-serif text-[17px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors">
                              {product.name}
                            </h5>
                            <span className="text-[13px] text-[#1F1E1A] font-medium block">
                              {formatPrice(product.price)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weaves & Collections */}
                  {(results.weaves.length > 0 || results.collections.length > 0) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {results.weaves.length > 0 && (
                        <div>
                          <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#666158] font-semibold mb-4 border-b border-[#D8CDBD] pb-2">
                            Textile Weaves ({results.weaves.length})
                          </h4>
                          <div className="space-y-3">
                            {results.weaves.map((weave) => (
                              <Link
                                key={weave.id}
                                href={`/weaves/${weave.slug}`}
                                onClick={handleClose}
                                className="group flex items-center justify-between p-3 bg-[#FBF9F5] border border-[#D8CDBD] hover:border-[#9B5E49] transition-all"
                              >
                                <div>
                                  <h6 className="font-serif text-[16px] group-hover:text-[#9B5E49] transition-colors">
                                    {weave.name}
                                  </h6>
                                  <p className="text-[12px] text-[#666158]">{weave.tagline}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#666158] group-hover:text-[#9B5E49] group-hover:translate-x-1 transition-all" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {results.collections.length > 0 && (
                        <div>
                          <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#666158] font-semibold mb-4 border-b border-[#D8CDBD] pb-2">
                            Collections ({results.collections.length})
                          </h4>
                          <div className="space-y-3">
                            {results.collections.map((col) => (
                              <Link
                                key={col.id}
                                href={`/collections/${col.slug}`}
                                onClick={handleClose}
                                className="group flex items-center justify-between p-3 bg-[#FBF9F5] border border-[#D8CDBD] hover:border-[#9B5E49] transition-all"
                              >
                                <div>
                                  <h6 className="font-serif text-[16px] group-hover:text-[#9B5E49] transition-colors">
                                    {col.title}
                                  </h6>
                                  <p className="text-[12px] text-[#666158]">{col.subtitle}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#666158] group-hover:text-[#9B5E49] group-hover:translate-x-1 transition-all" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Journal Articles */}
                  {results.journal.length > 0 && (
                    <div>
                      <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#666158] font-semibold mb-4 border-b border-[#D8CDBD] pb-2">
                        Journal Stories ({results.journal.length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {results.journal.map((art) => (
                          <Link
                            key={art.id}
                            href={`/journal/${art.slug}`}
                            onClick={handleClose}
                            className="group p-4 bg-[#FBF9F5] border border-[#D8CDBD] hover:border-[#9B5E49] transition-colors block"
                          >
                            <span className="text-[10px] uppercase tracking-[0.15em] text-[#9B5E49] block mb-1">
                              {art.category} · {art.readTime}
                            </span>
                            <h5 className="font-serif text-[17px] group-hover:text-[#9B5E49] transition-colors">
                              {art.title}
                            </h5>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* No results */}
              {query.trim() && !hasResults && (
                <div className="py-16 text-center">
                  <p className="font-serif text-[24px] text-[#1F1E1A] mb-2">No matching weaves or stories</p>
                  <p className="text-[14px] text-[#666158] max-w-md mx-auto">
                    Try searching for “Chanderi”, “Indigo”, “Festive”, “Silk”, or browse our full catalogue.
                  </p>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="inline-block mt-6 px-6 py-2.5 bg-[#1F1E1A] text-[#F6F1E8] text-[12px] uppercase tracking-[0.15em] hover:bg-[#9B5E49] transition-colors"
                  >
                    Explore All Sarees
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
