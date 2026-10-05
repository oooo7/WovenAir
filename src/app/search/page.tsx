"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { CommerceProvider, SearchResults } from "@/lib/commerce";
import ProductCard from "@/components/product/ProductCard";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResults>({
    products: [],
    collections: [],
    weaves: [],
    journal: [],
  });

  useEffect(() => {
    const runSearch = async () => {
      if (!query.trim()) {
        setResults({ products: [], collections: [], weaves: [], journal: [] });
        return;
      }
      const res = await CommerceProvider.searchAll(query);
      setResults(res);
    };
    runSearch();
  }, [query]);

  const totalResultsCount =
    results.products.length +
    results.collections.length +
    results.weaves.length +
    results.journal.length;

  return (
    <div className="w-full bg-[#F6F1E8] min-h-[80vh] py-12 sm:py-20">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        {/* Search Input Bar */}
        <div className="max-w-3xl mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block mb-3 font-medium">
            Textile Discovery
          </span>
          <div className="relative border-b-2 border-[#1F1E1A] pb-3 flex items-center gap-4">
            <SearchIcon className="w-7 h-7 text-[#666158]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a weave, colour, collection..."
              className="w-full bg-transparent font-serif text-[32px] sm:text-[44px] text-[#1F1E1A] placeholder:text-[#666158]/40 focus:outline-none"
            />
          </div>

          <p className="text-[13px] text-[#666158] mt-3">
            {query.trim()
              ? `Found ${totalResultsCount} ${totalResultsCount === 1 ? "result" : "results"} for “${query}”`
              : "Search across our complete catalogue of sarees, handloom weaves, collections, and journal stories."}
          </p>
        </div>

        {/* Results */}
        {query.trim() && totalResultsCount > 0 && (
          <div className="space-y-16">
            {/* Sarees */}
            {results.products.length > 0 && (
              <div>
                <div className="mb-6 pb-3 border-b border-[#D8CDBD]">
                  <h2 className="font-serif text-[28px] text-[#1F1E1A]">
                    Sarees ({results.products.length})
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                  {results.products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}

            {/* Weaves */}
            {results.weaves.length > 0 && (
              <div>
                <div className="mb-6 pb-3 border-b border-[#D8CDBD]">
                  <h2 className="font-serif text-[28px] text-[#1F1E1A]">
                    Weaves ({results.weaves.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.weaves.map((w) => (
                    <Link
                      key={w.id}
                      href={`/weaves/${w.slug}`}
                      className="group p-5 bg-[#FBF9F5] border border-[#D8CDBD] hover:border-[#9B5E49] transition-all block space-y-2"
                    >
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B5E49]">
                        {w.region}
                      </span>
                      <h3 className="font-serif text-[22px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors">
                        {w.name}
                      </h3>
                      <p className="text-[13px] text-[#666158] font-light leading-relaxed">
                        {w.definition}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Collections */}
            {results.collections.length > 0 && (
              <div>
                <div className="mb-6 pb-3 border-b border-[#D8CDBD]">
                  <h2 className="font-serif text-[28px] text-[#1F1E1A]">
                    Collections ({results.collections.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {results.collections.map((col) => (
                    <Link
                      key={col.id}
                      href={`/collections/${col.slug}`}
                      className="group p-5 bg-[#FBF9F5] border border-[#D8CDBD] hover:border-[#9B5E49] transition-all block space-y-2"
                    >
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B5E49]">
                        {col.chapterNumber}
                      </span>
                      <h3 className="font-serif text-[22px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors">
                        {col.title}
                      </h3>
                      <p className="text-[13px] text-[#666158] font-light">
                        {col.subtitle}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Journal Stories */}
            {results.journal.length > 0 && (
              <div>
                <div className="mb-6 pb-3 border-b border-[#D8CDBD]">
                  <h2 className="font-serif text-[28px] text-[#1F1E1A]">
                    Journal Stories ({results.journal.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.journal.map((art) => (
                    <Link
                      key={art.id}
                      href={`/journal/${art.slug}`}
                      className="group p-5 bg-[#FBF9F5] border border-[#D8CDBD] hover:border-[#9B5E49] transition-all block space-y-2"
                    >
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B5E49]">
                        {art.category} · {art.readTime}
                      </span>
                      <h3 className="font-serif text-[22px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-[13px] text-[#666158] font-light line-clamp-2">
                        {art.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {query.trim() && totalResultsCount === 0 && (
          <div className="py-20 text-center space-y-4 bg-[#FBF9F5] border border-[#D8CDBD] p-12 max-w-xl mx-auto">
            <h2 className="font-serif text-[28px] text-[#1F1E1A]">No results for “{query}”</h2>
            <p className="text-[14px] text-[#666158] font-light">
              Try searching for “Chanderi”, “Indigo”, “Silk”, “Jamdani”, or explore all sarees.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-block px-8 py-3.5 bg-[#1F1E1A] text-[#F6F1E8] text-[11px] uppercase tracking-[0.18em] hover:bg-[#9B5E49] transition-colors"
              >
                Browse All Sarees
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="py-32 text-center text-[#666158] font-serif text-[20px]">
          Loading search catalogue...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
