"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import { useQuickViewStore } from "@/store/quickview-store";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.slug));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const openQuickView = useQuickViewStore((state) => state.openQuickView);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.slug);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <article
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with 3:4 aspect ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE6DC]">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <Image
            src={product.images.fullDrape}
            alt={`${product.name} - ${product.fabric} Saree`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              isHovered && product.images.fullSaree ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Alternate Image on Hover */}
          {product.images.fullSaree && (
            <Image
              src={product.images.fullSaree}
              alt={`${product.name} detail view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-opacity duration-700 ease-in-out absolute inset-0 ${
                isHovered ? "opacity-100 scale-[1.02]" : "opacity-0 scale-100"
              }`}
            />
          )}
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isInWishlist ? "Remove from saved weaves" : "Save weave to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            isInWishlist
              ? "bg-[#9B5E49] text-white shadow-sm"
              : "bg-white/80 backdrop-blur-xs text-[#1F1E1A] hover:bg-white hover:text-[#9B5E49]"
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? "fill-white" : ""}`} />
        </button>

        {/* Restrained Tiny Status Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-[#F6F1E8]/90 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-[#1F1E1A] font-medium border border-[#D8CDBD]">
            New
          </div>
        )}
        {!product.isNew && product.stockStatus === "low_stock" && (
          <div className="absolute top-3 left-3 bg-[#9B5E49]/90 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-white font-medium">
            Last Few
          </div>
        )}
        {!product.isNew && product.stockStatus !== "low_stock" && product.isBestseller && (
          <div className="absolute top-3 left-3 bg-[#1F1E1A]/80 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-[#F6F1E8] font-medium">
            Bestseller
          </div>
        )}

        {/* Desktop Quick View Overlay Action */}
        <div className="hidden lg:block absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleQuickViewClick}
            className="w-full py-2.5 bg-[#F6F1E8] text-[#1F1E1A] text-[11px] uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 hover:bg-[#1F1E1A] hover:text-[#F6F1E8] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Metadata */}
      <div className="pt-3.5 pb-2 flex flex-col">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#666158]">
          <span>{product.weave}</span>
          <span className="font-light">{product.region}</span>
        </div>

        <h3 className="font-serif text-[18px] sm:text-[20px] font-normal text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors mt-1">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="mt-1 flex items-baseline justify-between">
          <span className="text-[14px] text-[#1F1E1A] font-medium">
            {formatPrice(product.price)}
          </span>
          <span className="text-[11px] text-[#666158] italic font-serif">
            {product.drape.toLowerCase()} drape
          </span>
        </div>
      </div>
    </article>
  );
}
