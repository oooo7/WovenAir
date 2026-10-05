"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.getSubtotal());

  return (
    <div className="w-full bg-[#F6F1E8] min-h-[75vh] py-12 sm:py-20">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="mb-10 pb-6 border-b border-[#D8CDBD]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block mb-2 font-medium">
            Your Collection
          </span>
          <h1 className="font-serif text-[42px] sm:text-[56px] text-[#1F1E1A] leading-tight">
            Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center space-y-5 bg-[#FBF9F5] border border-[#D8CDBD] p-12 max-w-2xl mx-auto">
            <h2 className="font-serif text-[28px] sm:text-[34px] text-[#1F1E1A]">
              Your bag is currently empty
            </h2>
            <p className="text-[14px] text-[#666158] font-light max-w-md mx-auto">
              Explore our handwoven sarees curated for modern life, work, and ceremonial elegance.
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Items Table (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="divide-y divide-[#D8CDBD] border-y border-[#D8CDBD]">
                {items.map((item) => (
                  <div key={item.product.id} className="py-6 flex gap-6 items-center">
                    <div className="relative w-24 sm:w-28 aspect-[3/4] bg-[#D8CDBD] flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.images.fullDrape}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.16em] text-[#666158]">
                            {item.product.weave} · {item.product.region}
                          </span>
                          <h3 className="font-serif text-[22px] sm:text-[26px] text-[#1F1E1A]">
                            <Link href={`/products/${item.product.slug}`} className="hover:text-[#9B5E49]">
                              {item.product.name}
                            </Link>
                          </h3>
                        </div>
                        <span className="text-[16px] sm:text-[18px] font-medium text-[#1F1E1A]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>

                      <p className="text-[13px] text-[#666158] font-light line-clamp-1">
                        {item.product.fabric} · {item.product.color}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#D8CDBD] bg-[#FBF9F5]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 text-[#666158] hover:text-[#1F1E1A]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-4 text-[13px] font-medium text-[#1F1E1A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 text-[#666158] hover:text-[#1F1E1A]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-[12px] uppercase tracking-[0.14em] text-[#9B5E49] hover:underline flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Complete the look recommendation */}
              <div className="p-6 bg-[#FBF9F5] border border-[#D8CDBD] flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B5E49] font-semibold">
                    Curated Ensemble
                  </span>
                  <h4 className="font-serif text-[18px] text-[#1F1E1A]">
                    Archival Organic Cotton Storage Bag
                  </h4>
                  <p className="text-[12px] text-[#666158]">
                    Complementary breathable muslin bag included with every order.
                  </p>
                </div>
                <span className="text-[11px] uppercase tracking-[0.16em] bg-[#68705B]/15 text-[#68705B] px-3 py-1 font-medium">
                  Included Free
                </span>
              </div>
            </div>

            {/* Summary Sidebar (4 cols) */}
            <div className="lg:col-span-4 p-8 bg-[#FBF9F5] border border-[#D8CDBD] space-y-6">
              <h3 className="font-serif text-[24px] text-[#1F1E1A] border-b border-[#D8CDBD] pb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-[14px]">
                <div className="flex justify-between text-[#666158]">
                  <span>Subtotal</span>
                  <span className="text-[#1F1E1A] font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#666158]">
                  <span>Shipping (India)</span>
                  <span className="text-[#68705B] font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between text-[#666158]">
                  <span>Estimated Taxes (GST 5%)</span>
                  <span className="text-[#1F1E1A]">Included in price</span>
                </div>
                <div className="pt-3 border-t border-[#D8CDBD] flex justify-between text-[17px] font-medium text-[#1F1E1A]">
                  <span>Total</span>
                  <span className="font-serif text-[22px]">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#D8CDBD]">
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-[#1F1E1A] text-[#F6F1E8] text-[12px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 hover:bg-[#9B5E49] transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/shop"
                  className="w-full py-3 border border-[#1F1E1A] text-[#1F1E1A] text-[12px] uppercase tracking-[0.16em] font-medium flex items-center justify-center hover:bg-[#F6F1E8] transition-colors"
                >
                  Continue Browsing
                </Link>
              </div>

              <div className="text-[11px] text-[#666158] space-y-1 pt-2">
                <p>• Secured prototype checkout</p>
                <p>• 7-day doorstep return guarantee</p>
                <p>• Authenticity seal with each artisan weave</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
