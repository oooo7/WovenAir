"use client";

import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

interface StickyMobileBarProps {
  product: Product;
}

export default function StickyMobileBar({ product }: StickyMobileBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after scrolling 450px down
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#F6F1E8]/98 backdrop-blur-md border-t border-[#D8CDBD] p-3 shadow-lg flex items-center justify-between gap-4">
      <div>
        <h4 className="font-serif text-[16px] text-[#1F1E1A] leading-tight">
          {product.name}
        </h4>
        <span className="text-[13px] font-medium text-[#1F1E1A]">
          {formatPrice(product.price)}
        </span>
      </div>

      <button
        onClick={() => addItem(product, 1)}
        className="px-6 py-2.5 bg-[#1F1E1A] text-[#F6F1E8] text-[11px] uppercase tracking-[0.16em] font-medium flex items-center gap-2 hover:bg-[#9B5E49] transition-colors flex-shrink-0"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>Add to Bag</span>
      </button>
    </div>
  );
}
