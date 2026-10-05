"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingBag, MessageSquare, ChevronRight, Share2, Check } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductFeelSystem from "@/components/product/ProductFeelSystem";
import PincodeChecker from "@/components/product/PincodeChecker";
import ProductStoryAccordions from "@/components/product/ProductStoryAccordions";
import StickyMobileBar from "@/components/product/StickyMobileBar";
import ProductCard from "@/components/product/ProductCard";
import ShopTheLookSection from "@/components/home/ShopTheLookSection";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface ProductPageClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductPageClient({
  product,
  relatedProducts,
}: ProductPageClientProps) {
  const [copiedShare, setCopiedShare] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.slug));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in ${product.name} (${product.fabric}) from Wovenair.`
  );

  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 py-5 text-[11px] uppercase tracking-[0.16em] text-[#666158] flex items-center gap-2 border-b border-[#D8CDBD]/40">
        <Link href="/" className="hover:text-[#1F1E1A]">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
        <Link href="/shop" className="hover:text-[#1F1E1A]">Sarees</Link>
        <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
        <Link href={`/weaves/${product.weaveSlug}`} className="hover:text-[#1F1E1A]">{product.weave}</Link>
        <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
        <span className="text-[#1F1E1A] font-medium">{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Sticky Product Purchase & Information (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Top Meta & Wishlist / Share */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#9B5E49] font-medium">
                  {product.weave} · {product.region}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleShare}
                    className="p-1.5 text-[#666158] hover:text-[#1F1E1A] transition-colors"
                    aria-label="Share saree"
                  >
                    {copiedShare ? (
                      <Check className="w-4 h-4 text-[#68705B]" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.slug)}
                    className="p-1.5 text-[#666158] hover:text-[#9B5E49] transition-colors"
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist ? "fill-[#9B5E49] text-[#9B5E49]" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="font-serif text-[34px] sm:text-[42px] text-[#1F1E1A] leading-[1.1] mb-2 font-normal">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="text-[22px] sm:text-[24px] font-medium text-[#1F1E1A]">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-[12px] text-[#666158] font-light">
                    Includes taxes · Complimentary shipping
                  </span>
                </div>
              </div>

              {/* Emotional Description */}
              <p className="text-[14px] sm:text-[15px] text-[#666158] font-light leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-[12px]">
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.stockStatus === "low_stock"
                      ? "bg-[#9B5E49]"
                      : "bg-[#68705B]"
                  }`}
                />
                <span className="text-[#1F1E1A] font-medium">
                  {product.stockStatus === "low_stock"
                    ? "Last Few Pieces Left in Studio"
                    : "In Stock · Ready to Ship in 24 Hours"}
                </span>
              </div>

              {/* CTA Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => addItem(product, 1)}
                  className="w-full py-4 bg-[#1F1E1A] text-[#F6F1E8] text-[12px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 hover:bg-[#9B5E49] transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => toggleWishlist(product.slug)}
                    className="py-3 border border-[#D8CDBD] bg-[#FBF9F5] text-[#1F1E1A] text-[11px] uppercase tracking-[0.14em] font-medium flex items-center justify-center gap-1.5 hover:border-[#1F1E1A] transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isInWishlist ? "fill-[#9B5E49] text-[#9B5E49]" : ""}`} />
                    <span>{isInWishlist ? "Saved to Wishlist" : "Save to Wishlist"}</span>
                  </button>

                  <a
                    href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 border border-[#D8CDBD] bg-[#FBF9F5] text-[#1F1E1A] text-[11px] uppercase tracking-[0.14em] font-medium flex items-center justify-center gap-1.5 hover:border-[#9B5E49] hover:text-[#9B5E49] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Visual Feel System */}
              <ProductFeelSystem
                feelRatings={product.feelRatings}
                feelDescription={product.feelDescription}
              />

              {/* Pincode Checker */}
              <PincodeChecker />

              {/* Product Specifications Factsheet */}
              <div className="pt-4 border-t border-[#D8CDBD]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#666158] block mb-3 font-semibold">
                  Textile Specifications
                </span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[12px] text-[#1F1E1A]">
                  <div>
                    <span className="text-[#666158] block text-[10px] uppercase">Fabric</span>
                    <span className="font-medium">{product.fabric}</span>
                  </div>
                  <div>
                    <span className="text-[#666158] block text-[10px] uppercase">Weave Technique</span>
                    <span className="font-medium">{product.weave}</span>
                  </div>
                  <div>
                    <span className="text-[#666158] block text-[10px] uppercase">Origin Region</span>
                    <span className="font-medium">{product.region}</span>
                  </div>
                  <div>
                    <span className="text-[#666158] block text-[10px] uppercase">Color Palette</span>
                    <span className="font-medium">{product.color}</span>
                  </div>
                  <div>
                    <span className="text-[#666158] block text-[10px] uppercase">Length & Width</span>
                    <span className="font-medium">{product.length} × {product.width}</span>
                  </div>
                  <div>
                    <span className="text-[#666158] block text-[10px] uppercase">Blouse Piece</span>
                    <span className="font-medium">{product.blousePiece ? "Yes, Included" : "Not Included"}</span>
                  </div>
                </div>
              </div>

              {/* Story & Policy Accordions */}
              <ProductStoryAccordions product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Shop the Look Section */}
      <ShopTheLookSection />

      {/* You May Also Like / Related Sarees */}
      {relatedProducts.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#FBF9F5] border-t border-[#D8CDBD]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
            <div className="flex justify-between items-baseline mb-12 pb-4 border-b border-[#D8CDBD]">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#666158] block mb-1">
                  Complementary Weaves
                </span>
                <h3 className="font-serif text-[32px] sm:text-[38px] text-[#1F1E1A]">
                  You May Also Admire
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-[12px] uppercase tracking-[0.14em] text-[#9B5E49] hover:text-[#1F1E1A]"
              >
                View All Sarees →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Mobile Add To Bag Bar */}
      <StickyMobileBar product={product} />
    </div>
  );
}
