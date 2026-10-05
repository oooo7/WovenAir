"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const items = useCartStore((state) => state.items);
  const closeCart = useCartStore((state) => state.closeCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.getSubtotal());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#1F1E1A]/50 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[480px] h-full bg-[#F6F1E8] border-l border-[#D8CDBD] shadow-2xl flex flex-col z-10"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#D8CDBD] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#666158]">
                  Your Collection
                </span>
                <h3 className="font-serif text-[24px] text-[#1F1E1A]">
                  Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-[#666158] hover:text-[#1F1E1A] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notification banner */}
            <div className="bg-[#FBF9F5] px-6 py-2.5 border-b border-[#D8CDBD] text-[12px] text-[#68705B] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#68705B]" />
              <span>A new weave joins your collection. Complimentary shipping applied.</span>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <p className="font-serif text-[22px] text-[#1F1E1A]">Your bag is currently empty</p>
                  <p className="text-[13px] text-[#666158] max-w-xs mx-auto">
                    Explore our handwoven sarees curated for modern life and occasion.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-block px-6 py-3 bg-[#1F1E1A] text-[#F6F1E8] text-[11px] uppercase tracking-[0.16em] hover:bg-[#9B5E49] transition-colors"
                  >
                    Explore Sarees
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 pb-6 border-b border-[#D8CDBD]/70"
                  >
                    <div className="relative w-20 aspect-[3/4] bg-[#D8CDBD] flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.images.fullDrape}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.15em] text-[#666158]">
                              {item.product.weave}
                            </span>
                            <h4 className="font-serif text-[18px] text-[#1F1E1A]">
                              <Link
                                href={`/products/${item.product.slug}`}
                                onClick={closeCart}
                                className="hover:text-[#9B5E49] transition-colors"
                              >
                                {item.product.name}
                              </Link>
                            </h4>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-[#666158] hover:text-[#9B5E49] p-1 transition-colors"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[14px] text-[#1F1E1A] font-medium mt-1">
                          {formatPrice(item.product.price)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#D8CDBD] bg-[#FBF9F5]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 text-[#666158] hover:text-[#1F1E1A]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-[12px] font-medium text-[#1F1E1A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 text-[#666158] hover:text-[#1F1E1A]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[13px] font-medium text-[#1F1E1A]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Complete the Look Cross-sell */}
              {items.length > 0 && (
                <div className="p-4 bg-[#FBF9F5] border border-[#D8CDBD] space-y-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#9B5E49] font-medium">
                    Complete The Ensemble
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 bg-[#D8CDBD] flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                        alt="Unstitched Raw Silk Blouse Piece"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-serif text-[15px] leading-tight">Tailored Slate Silk Crop</h5>
                      <span className="text-[12px] text-[#666158]">₹3,400 · Natural Mulberry</span>
                    </div>
                    <Link
                      href="/shop"
                      onClick={closeCart}
                      className="text-[11px] uppercase tracking-[0.1em] border-b border-[#1F1E1A] pb-0.5"
                    >
                      Add +
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer with Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-[#FBF9F5] border-t border-[#D8CDBD] space-y-4">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-[#666158]">Subtotal</span>
                  <span className="font-serif text-[20px] text-[#1F1E1A] font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="text-[11px] text-[#666158]">
                  Taxes and complimentary shipping calculated at checkout.
                </div>

                <div className="space-y-2.5">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full py-4 bg-[#1F1E1A] text-[#F6F1E8] text-[12px] uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 hover:bg-[#9B5E49] transition-colors"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="w-full py-3 border border-[#1F1E1A] text-[#1F1E1A] text-[12px] uppercase tracking-[0.16em] font-medium flex items-center justify-center hover:bg-[#F6F1E8] transition-colors"
                  >
                    View Full Bag
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
