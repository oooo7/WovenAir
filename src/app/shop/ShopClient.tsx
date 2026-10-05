"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import FilterDrawer from "@/components/shop/FilterDrawer";
import { Product, SortOption } from "@/types";

interface ShopClientProps {
  initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const searchParams = useSearchParams();

  // URL query params
  const initialFilterParam = searchParams.get("filter") || "";
  const initialPriceParam = searchParams.get("price") || "";
  const initialOccasionParam = searchParams.get("occasion") || "";
  const initialSearchParam = searchParams.get("search") || "";

  // State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedWeaves, setSelectedWeaves] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(
    initialOccasionParam ? [initialOccasionParam] : []
  );
  const [selectedPrice, setSelectedPrice] = useState<string>(initialPriceParam);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("featured");


  // Reset all
  const handleResetFilters = () => {
    setSelectedFabrics([]);
    setSelectedWeaves([]);
    setSelectedOccasions([]);
    setSelectedPrice("");
    setSelectedColors([]);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Search query if passed
    if (initialSearchParam) {
      const q = initialSearchParam.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.weave.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Special quick filters (from mega-menu)
    if (initialFilterParam === "new") {
      list = list.filter((p) => p.isNew);
    } else if (initialFilterParam === "bestseller") {
      list = list.filter((p) => p.isBestseller);
    } else if (initialFilterParam === "ready") {
      list = list.filter((p) => p.stockStatus === "in_stock");
    } else if (initialFilterParam === "last-few") {
      list = list.filter((p) => p.stockStatus === "low_stock");
    }

    // Weaves
    if (selectedWeaves.length > 0) {
      list = list.filter((p) =>
        selectedWeaves.some((w) => p.weave.toLowerCase().includes(w.toLowerCase()))
      );
    }

    // Fabrics
    if (selectedFabrics.length > 0) {
      list = list.filter((p) =>
        selectedFabrics.some((f) => p.fabric.toLowerCase().includes(f.toLowerCase()))
      );
    }

    // Occasions
    if (selectedOccasions.length > 0) {
      list = list.filter((p) =>
        selectedOccasions.some((occ) =>
          p.occasions.some((o) => o.toLowerCase() === occ.toLowerCase())
        )
      );
    }

    // Colors
    if (selectedColors.length > 0) {
      list = list.filter((p) =>
        selectedColors.some((c) => p.color.toLowerCase().includes(c.toLowerCase()))
      );
    }

    // Price
    if (selectedPrice) {
      if (selectedPrice === "under-7500") {
        list = list.filter((p) => p.price < 7500);
      } else if (selectedPrice === "7500-12500") {
        list = list.filter((p) => p.price >= 7500 && p.price <= 12500);
      } else if (selectedPrice === "above-12500" || selectedPrice === "above-20000") {
        list = list.filter((p) => p.price > 12500);
      }
    }

    // Sorting
    switch (sortOption) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "bestselling":
        list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case "featured":
      default:
        break;
    }

    return list;
  }, [
    initialProducts,
    initialFilterParam,
    initialSearchParam,
    selectedWeaves,
    selectedFabrics,
    selectedOccasions,
    selectedColors,
    selectedPrice,
    sortOption,
  ]);

  const activeFilterCount =
    selectedFabrics.length +
    selectedWeaves.length +
    selectedOccasions.length +
    selectedColors.length +
    (selectedPrice ? 1 : 0);

  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        {/* Editorial Top Heading */}
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block mb-2 font-medium">
            Catalogue Archive
          </span>
          <h1 className="font-serif text-[42px] sm:text-[56px] text-[#1F1E1A] leading-tight mb-3">
            Sarees
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#666158] font-light leading-relaxed">
            Six yards of calibrated stillness and breath. Each piece loomed in its regional heartland, finished for ease of modern drape.
          </p>
        </div>

        {/* Controls Bar: Product Count, Filters & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-[#D8CDBD] mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FBF9F5] border border-[#D8CDBD] text-[12px] uppercase tracking-[0.16em] text-[#1F1E1A] hover:border-[#1F1E1A] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            <span className="text-[13px] text-[#666158]">
              Showing <span className="font-medium text-[#1F1E1A]">{filteredProducts.length}</span>{" "}
              {filteredProducts.length === 1 ? "weave" : "weaves"}
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[12px] uppercase tracking-[0.14em] text-[#666158] hidden sm:inline">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none bg-[#FBF9F5] border border-[#D8CDBD] px-4 py-2 pr-8 text-[12px] uppercase tracking-[0.14em] text-[#1F1E1A] focus:outline-none focus:border-[#1F1E1A] cursor-pointer"
              >
                <option value="featured">Featured Edit</option>
                <option value="newest">New Arrivals</option>
                <option value="bestselling">Bestselling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-[#666158] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Pills */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#666158] mr-2">
              Active Filters:
            </span>
            {selectedWeaves.map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWeaves(selectedWeaves.filter((item) => item !== w))}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FBF9F5] border border-[#D8CDBD] text-[11px] text-[#1F1E1A] hover:bg-[#EAE2D5]"
              >
                <span>Weave: {w}</span>
                <X className="w-3 h-3" />
              </button>
            ))}
            {selectedFabrics.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFabrics(selectedFabrics.filter((item) => item !== f))}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FBF9F5] border border-[#D8CDBD] text-[11px] text-[#1F1E1A] hover:bg-[#EAE2D5]"
              >
                <span>Fabric: {f}</span>
                <X className="w-3 h-3" />
              </button>
            ))}
            {selectedOccasions.map((o) => (
              <button
                key={o}
                onClick={() => setSelectedOccasions(selectedOccasions.filter((item) => item !== o))}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FBF9F5] border border-[#D8CDBD] text-[11px] text-[#1F1E1A] hover:bg-[#EAE2D5]"
              >
                <span>Occasion: {o}</span>
                <X className="w-3 h-3" />
              </button>
            ))}
            {selectedPrice && (
              <button
                onClick={() => setSelectedPrice("")}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FBF9F5] border border-[#D8CDBD] text-[11px] text-[#1F1E1A] hover:bg-[#EAE2D5]"
              >
                <span>Price Filter</span>
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={handleResetFilters}
              className="text-[11px] uppercase tracking-[0.14em] text-[#9B5E49] underline ml-2 hover:text-[#1F1E1A]"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Product Grid: 4 cols desktop, 3 cols tablet, 2 cols mobile */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4 bg-[#FBF9F5] border border-[#D8CDBD] p-12">
            <h3 className="font-serif text-[28px] text-[#1F1E1A]">No weaves match your filter</h3>
            <p className="text-[14px] text-[#666158] max-w-md mx-auto font-light">
              We couldn&apos;t find any sarees matching that exact combination of fabric, weave, or price.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-6 py-3 bg-[#1F1E1A] text-[#F6F1E8] text-[11px] uppercase tracking-[0.16em] hover:bg-[#9B5E49] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedFabrics={selectedFabrics}
        setSelectedFabrics={setSelectedFabrics}
        selectedWeaves={selectedWeaves}
        setSelectedWeaves={setSelectedWeaves}
        selectedOccasions={selectedOccasions}
        setSelectedOccasions={setSelectedOccasions}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        onReset={handleResetFilters}
      />
    </div>
  );
}
