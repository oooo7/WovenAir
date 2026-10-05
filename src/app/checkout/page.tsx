"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Lock, Gift, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);

  // Form State
  const [formData, setFormData] = useState({
    name: "Devika Sharma",
    email: "devika.sharma@example.com",
    phone: "9876543210",
    address: "B-42, Amrita Shergill Marg",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110003",
    country: "India",
    giftWrap: true,
    deliveryNote: "Please handle with care. Wedding gift for sister.",
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `WA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="w-full bg-[#F6F1E8] min-h-[80vh] py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-8 bg-[#FBF9F5] border border-[#D8CDBD] p-10 sm:p-14">
          <div className="w-16 h-16 rounded-full bg-[#68705B]/15 text-[#68705B] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#68705B] font-semibold block">
              Prototype Order Confirmed
            </span>
            <h1 className="font-serif text-[38px] sm:text-[48px] text-[#1F1E1A] leading-tight">
              A Weave Begins Its Journey
            </h1>
            <p className="text-[14px] text-[#666158] font-light max-w-md mx-auto">
              Your test order <strong className="font-mono text-[#1F1E1A]">{orderId}</strong> has been logged in prototype mode. No real payment was charged.
            </p>
          </div>

          <div className="p-4 bg-[#F6F1E8] border border-[#D8CDBD] text-[12px] text-[#1F1E1A] text-left space-y-1">
            <p className="font-medium uppercase tracking-wider text-[10px] text-[#666158]">
              Prototype Delivery Summary
            </p>
            <p>Recipient: {formData.name} ({formData.phone})</p>
            <p>Address: {formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
            {formData.giftWrap && <p className="text-[#9B5E49]">• Hand-tied handmade paper gift wrap requested</p>}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-[#1F1E1A] text-[#F6F1E8] text-[12px] uppercase tracking-[0.16em] hover:bg-[#9B5E49] transition-colors"
            >
              Explore More Sarees
            </Link>
            <Link
              href="/"
              className="px-8 py-3.5 border border-[#1F1E1A] text-[#1F1E1A] text-[12px] uppercase tracking-[0.16em] hover:bg-[#F6F1E8] transition-colors"
            >
              Return to Flagship
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        {/* Prototype Banner */}
        <div className="mb-10 p-4 bg-[#FBF9F5] border border-[#68705B]/40 text-[12px] text-[#1F1E1A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#68705B]" />
            <span>
              <strong>PROTOTYPE CHECKOUT:</strong> This is a front-end simulation. No real money or credit card details are required.
            </span>
          </div>
          <Link href="/cart" className="text-[11px] uppercase tracking-wider text-[#9B5E49] hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Bag</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="p-6 bg-[#FBF9F5] border border-[#D8CDBD] space-y-4">
                <h3 className="font-serif text-[22px] text-[#1F1E1A] border-b border-[#D8CDBD] pb-2">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#666158] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F6F1E8] border border-[#D8CDBD] p-2.5 text-[14px] text-[#1F1E1A] focus:outline-none focus:border-[#1F1E1A]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#666158] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F6F1E8] border border-[#D8CDBD] p-2.5 text-[14px] text-[#1F1E1A] focus:outline-none focus:border-[#1F1E1A]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-wider text-[#666158] block mb-1">
                      Phone Number (For Delivery Updates)
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F6F1E8] border border-[#D8CDBD] p-2.5 text-[14px] text-[#1F1E1A] focus:outline-none focus:border-[#1F1E1A]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="p-6 bg-[#FBF9F5] border border-[#D8CDBD] space-y-4">
                <h3 className="font-serif text-[22px] text-[#1F1E1A] border-b border-[#D8CDBD] pb-2">
                  2. Delivery Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#666158] block mb-1">
                      Street Address & Apartment
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#F6F1E8] border border-[#D8CDBD] p-2.5 text-[14px] text-[#1F1E1A] focus:outline-none focus:border-[#1F1E1A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#666158] block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#F6F1E8] border border-[#D8CDBD] p-2.5 text-[14px] text-[#1F1E1A] focus:outline-none focus:border-[#1F1E1A]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#666158] block mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-[#F6F1E8] border border-[#D8CDBD] p-2.5 text-[14px] text-[#1F1E1A] focus:outline-none focus:border-[#1F1E1A]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#666158] block mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full bg-[#F6F1E8] border border-[#D8CDBD] p-2.5 text-[14px] text-[#1F1E1A] focus:outline-none focus:border-[#1F1E1A]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gifting & Delivery Note */}
              <div className="p-6 bg-[#FBF9F5] border border-[#D8CDBD] space-y-4">
                <h3 className="font-serif text-[22px] text-[#1F1E1A] border-b border-[#D8CDBD] pb-2">
                  3. Gifting & Personalization
                </h3>

                <label className="flex items-center gap-3 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    checked={formData.giftWrap}
                    onChange={(e) => setFormData({ ...formData, giftWrap: e.target.checked })}
                    className="accent-[#9B5E49] w-4 h-4"
                  />
                  <div className="flex items-center gap-2 text-[13px] text-[#1F1E1A]">
                    <Gift className="w-4 h-4 text-[#9B5E49]" />
                    <span>Include complimentary artisanal gift wrap and handmade calligraphy note</span>
                  </div>
                </label>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#666158] block mb-1">
                    Special Delivery Note or Message
                  </label>
                  <textarea
                    rows={2}
                    value={formData.deliveryNote}
                    onChange={(e) => setFormData({ ...formData, deliveryNote: e.target.value })}
                    className="w-full bg-[#F6F1E8] border border-[#D8CDBD] p-2.5 text-[13px] text-[#1F1E1A] focus:outline-none focus:border-[#1F1E1A]"
                    placeholder="Instructions for courier or gift message..."
                  />
                </div>
              </div>

              {/* Payment Method (Simulated) */}
              <div className="p-6 bg-[#FBF9F5] border border-[#D8CDBD] space-y-4">
                <div className="flex items-center justify-between border-b border-[#D8CDBD] pb-2">
                  <h3 className="font-serif text-[22px] text-[#1F1E1A]">
                    4. Payment Selection
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-[#68705B] bg-[#68705B]/15 px-2 py-0.5 font-medium">
                    Simulated Mode
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "upi", label: "UPI / QR (Google Pay, PhonePe, Paytm)", sub: "Instant zero-fee prototype verification" },
                    { id: "card", label: "Credit / Debit Card (Visa, Mastercard, RuPay, Amex)", sub: "Razorpay / Stripe compliant gateway simulation" },
                    { id: "cod", label: "Cash on Delivery", sub: "Available across 19,000+ Indian pincodes" },
                  ].map((method, idx) => (
                    <label
                      key={method.id}
                      className="flex items-start gap-3 p-3.5 border border-[#D8CDBD] bg-[#F6F1E8] cursor-pointer hover:border-[#1F1E1A] transition-colors"
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        defaultChecked={idx === 0}
                        className="accent-[#9B5E49] w-4 h-4 mt-0.5"
                      />
                      <div>
                        <span className="text-[13px] font-medium text-[#1F1E1A] block">{method.label}</span>
                        <span className="text-[11px] text-[#666158] font-light">{method.sub}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#1F1E1A] text-[#F6F1E8] text-[13px] uppercase tracking-[0.2em] font-medium hover:bg-[#9B5E49] transition-colors shadow-sm"
              >
                Place Prototype Order ({formatPrice(subtotal)})
              </button>
            </form>
          </div>

          {/* Right Summary (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#FBF9F5] border border-[#D8CDBD] space-y-6">
            <h3 className="font-serif text-[22px] text-[#1F1E1A] border-b border-[#D8CDBD] pb-3">
              Order Review ({items.length})
            </h3>

            {items.length === 0 ? (
              <p className="text-[13px] text-[#666158]">
                No items in bag. Please select a saree first.
              </p>
            ) : (
              <div className="divide-y divide-[#D8CDBD] max-h-[380px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.product.id} className="py-3 flex gap-3 items-center">
                    <div className="relative w-14 aspect-[3/4] bg-[#D8CDBD] overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images.fullDrape}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-[16px] text-[#1F1E1A] leading-tight">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#666158]">
                        Qty: {item.quantity} · {item.product.weave}
                      </p>
                    </div>
                    <span className="text-[13px] font-medium text-[#1F1E1A]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 pt-4 border-t border-[#D8CDBD] text-[13px]">
              <div className="flex justify-between text-[#666158]">
                <span>Subtotal</span>
                <span className="text-[#1F1E1A] font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#666158]">
                <span>Shipping</span>
                <span className="text-[#68705B] font-medium">Complimentary</span>
              </div>
              <div className="pt-2 border-t border-[#D8CDBD] flex justify-between text-[16px] font-medium text-[#1F1E1A]">
                <span>Total Due</span>
                <span className="font-serif text-[20px]">{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
