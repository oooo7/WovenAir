"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuickViewStore } from "@/store/quickview-store";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function QuickViewModal() {
  const isOpen = useQuickViewStore((state) => state.isOpen);
  const product = useQuickViewStore((state) => state.product);
  const closeQuickView = useQuickViewStore((state) => state.closeQuickView);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuickView();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeQuickView]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addItem(product, 1);
    closeQuickView();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-[#F6F1E8] border border-[#D8CDBD] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-10 p-2 bg-[#F6F1E8]/80 backdrop-blur-xs text-[#1F1E1A] hover:text-[#9B5E49] transition-colors rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image */}
          <div className="relative w-full md:w-1/2 aspect-[3/4] md:aspect-auto bg-[#D8CDBD]">
            <Image
              src={product.images.fullDrape}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#666158] mb-1">
                {product.weave} · {product.region}
              </div>
              <h2 className="font-serif text-[28px] sm:text-[32px] text-[#1F1E1A] mb-2 leading-tight">
                {product.name}
              </h2>
              <div className="text-[18px] text-[#1F1E1A] font-medium mb-4">
                {formatPrice(product.price)}
              </div>

              <p className="text-[14px] text-[#666158] leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Feel overview */}
              <div className="p-3 bg-[#FBF9F5] border border-[#D8CDBD] mb-6">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#666158] block mb-1">
                  Tactile Feel
                </span>
                <span className="text-[13px] text-[#1F1E1A] font-serif italic">
                  {product.feelDescription}
                </span>
              </div>

              {/* Specifications mini */}
              <div className="grid grid-cols-2 gap-3 text-[12px] border-t border-[#D8CDBD] pt-4 mb-6">
                <div>
                  <span className="text-[#666158] block text-[10px] uppercase">Fabric</span>
                  <span className="text-[#1F1E1A] font-medium">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-[#666158] block text-[10px] uppercase">Drape</span>
                  <span className="text-[#1F1E1A] font-medium">{product.drape}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#D8CDBD]">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-[#1F1E1A] text-[#F6F1E8] text-[12px] uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 hover:bg-[#9B5E49] transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
              <Link
                href={`/products/${product.slug}`}
                onClick={closeQuickView}
                className="w-full py-3 border border-[#1F1E1A] text-[#1F1E1A] text-[12px] uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 hover:bg-[#FBF9F5] transition-colors"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
