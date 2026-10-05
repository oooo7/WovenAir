"use client";

import { useState } from "react";
import { Check, Truck, AlertCircle } from "lucide-react";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [city, setCity] = useState("");

  const mockCityMap: Record<string, string> = {
    "110001": "Delhi Central",
    "400001": "South Mumbai",
    "560001": "Bengaluru City",
    "600001": "Chennai Central",
    "700001": "Kolkata Hub",
    "500001": "Hyderabad",
    "380001": "Ahmedabad",
    "302001": "Jaipur",
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setStatus("error");
      setCity("");
      return;
    }

    const matchedCity = mockCityMap[cleanPin] || "your region";
    setCity(matchedCity);
    setStatus("success");
  };

  return (
    <div className="pt-2">
      <form onSubmit={handleCheck} className="space-y-2">
        <label
          htmlFor="pincodeInput"
          className="text-[11px] uppercase tracking-[0.16em] text-[#666158] block"
        >
          Check Delivery & Pincode
        </label>
        <div className="flex gap-2">
          <input
            id="pincodeInput"
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ""));
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="Enter 6-digit Pincode (e.g. 110001)"
            className="flex-1 bg-[#FBF9F5] border border-[#D8CDBD] px-3 py-2 text-[13px] text-[#1F1E1A] placeholder:text-[#666158]/50 focus:outline-none focus:border-[#1F1E1A]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#FBF9F5] border border-[#1F1E1A] text-[11px] uppercase tracking-[0.16em] text-[#1F1E1A] hover:bg-[#1F1E1A] hover:text-[#F6F1E8] transition-colors"
          >
            Check
          </button>
        </div>
      </form>

      {status === "success" && (
        <div className="mt-2.5 p-3 bg-[#FBF9F5] border border-[#68705B]/40 text-[12px] text-[#1F1E1A] space-y-1">
          <div className="flex items-center gap-1.5 text-[#68705B] font-medium">
            <Check className="w-3.5 h-3.5" />
            <span>Delivery available to {city}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#666158] text-[11px] pl-5">
            <Truck className="w-3 h-3" />
            <span>Estimated arrival in 3–5 business days · Complimentary shipping</span>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mt-2 p-2 bg-red-50/60 border border-red-200 text-red-700 text-[11px] flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Please enter a valid 6-digit Indian postal code.</span>
        </div>
      )}
    </div>
  );
}
