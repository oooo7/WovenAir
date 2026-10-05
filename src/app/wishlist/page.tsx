"use client";

import { useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { productsData } from "@/data/products";
import { useWishlistStore } from "@/store/wishlist-store";

export default function WishlistPage() {
  const savedSlugs = useWishlistStore((state) => state.savedSlugs);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const savedProducts = useMemo(() => {
    return productsData.filter((p) => savedSlugs.includes(p.slug));
  }, [savedSlugs]);

  return (
    <div className="w-full bg-[#F6F1E8] min-h-[75vh] py-12 sm:py-20">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#D8CDBD]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block mb-2 font-medium">
              Saved Pieces
            </span>
            <h1 className="font-serif text-[42px] sm:text-[56px] text-[#1F1E1A] leading-tight">
              Your Wishlist ({savedProducts.length})
            </h1>
          </div>

          {savedProducts.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-[11px] uppercase tracking-[0.16em] text-[#9B5E49] hover:underline self-start sm:self-auto mt-4 sm:mt-0"
            >
              Clear All Saved Weaves
            </button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div className="py-24 text-center space-y-5 bg-[#FBF9F5] border border-[#D8CDBD] p-12 max-w-2xl mx-auto">
            <h2 className="font-serif text-[28px] sm:text-[34px] text-[#1F1E1A]">
              Your saved weaves will appear here.
            </h2>
            <p className="text-[14px] text-[#666158] font-light max-w-md mx-auto">
              Save pieces as you explore our handloom catalogue to compare drape, fabric count, and regional techniques.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-block px-8 py-4 bg-[#1F1E1A] text-[#F6F1E8] text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#9B5E49] transition-colors"
              >
                Explore Sarees
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
