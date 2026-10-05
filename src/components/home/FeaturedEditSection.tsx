"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types";

interface FeaturedEditSectionProps {
  products: Product[];
}

export default function FeaturedEditSection({ products }: FeaturedEditSectionProps) {
  return (
    <section className="py-24 sm:py-32 bg-[#F6F1E8]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#D8CDBD]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block mb-2 font-medium">
              Curated Selection
            </span>
            <h2 className="font-serif text-[38px] sm:text-[48px] text-[#1F1E1A] leading-tight">
              The First Edit
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[#1F1E1A] hover:text-[#9B5E49] transition-colors mt-4 sm:mt-0 font-medium self-start sm:self-auto"
          >
            <span>View All Sarees</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Products on Desktop, 2 on Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
