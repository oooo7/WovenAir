"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImages } from "@/types";

interface ProductGalleryProps {
  images: ProductImages;
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  // Collect all available image URLs into a list with labels
  const galleryItems = [
    { label: "Drape", url: images.fullDrape },
    { label: "Spread", url: images.fullSaree },
    { label: "Lifestyle", url: images.lifestyle },
    { label: "Pallu", url: images.palluDetail },
    { label: "Border", url: images.borderDetail },
    { label: "Macro", url: images.macro },
  ].filter((item) => Boolean(item.url));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape" && isLightboxOpen) setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails rail (Horizontal on mobile, vertical on desktop) */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[720px] pb-2 lg:pb-0 scrollbar-none flex-shrink-0">
        {galleryItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-[#D8CDBD] overflow-hidden flex-shrink-0 border-2 transition-all ${
              idx === activeIndex
                ? "border-[#1F1E1A] opacity-100 ring-2 ring-[#1F1E1A]/20"
                : "border-transparent opacity-60 hover:opacity-90"
            }`}
            aria-label={`View ${item.label} of ${productName}`}
          >
            <Image
              src={item.url}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Large Image Container */}
      <div className="relative flex-1 aspect-[3/4] bg-[#ECE6DC] overflow-hidden group">
        <Image
          src={galleryItems[activeIndex]?.url || images.fullDrape}
          alt={`${productName} - ${galleryItems[activeIndex]?.label}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-opacity duration-300"
        />

        {/* View mode label tag */}
        <div className="absolute top-4 left-4 bg-[#F6F1E8]/90 backdrop-blur-xs px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#1F1E1A] font-medium border border-[#D8CDBD]">
          {galleryItems[activeIndex]?.label} View
        </div>

        {/* Zoom / Lightbox Trigger */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 bg-[#F6F1E8]/90 backdrop-blur-xs text-[#1F1E1A] hover:bg-[#1F1E1A] hover:text-[#F6F1E8] transition-colors rounded-full border border-[#D8CDBD]"
          aria-label="Enlarge image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Previous / Next Arrow Controls */}
        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-[#F6F1E8]/80 text-[#1F1E1A] hover:bg-[#1F1E1A] hover:text-[#F6F1E8] transition-colors rounded-full opacity-0 group-hover:opacity-100"
          aria-label="Previous view"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#F6F1E8]/80 text-[#1F1E1A] hover:bg-[#1F1E1A] hover:text-[#F6F1E8] transition-colors rounded-full opacity-0 group-hover:opacity-100"
          aria-label="Next view"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-white hover:text-[#9B5E49] transition-colors z-50 rounded-full bg-white/10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-4xl h-[85vh] flex items-center justify-center">
            <Image
              src={galleryItems[activeIndex]?.url || images.fullDrape}
              alt={`${productName} zoomed`}
              fill
              className="object-contain"
            />
          </div>

          {/* Lightbox Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 inset-x-0 text-center text-white/80 text-[12px] uppercase tracking-[0.2em]">
            {galleryItems[activeIndex]?.label} · {activeIndex + 1} of {galleryItems.length}
          </div>
        </div>
      )}
    </div>
  );
}
