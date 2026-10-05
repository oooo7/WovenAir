"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import AnnouncementBar from "./AnnouncementBar";
import DesktopMegaMenu from "../navigation/DesktopMegaMenu";
import MobileMenu from "../navigation/MobileMenu";
import SearchOverlay from "../search/SearchOverlay";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartTotalItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistCount = useWishlistStore((state) => state.savedSlugs.length);

  // Close menus on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "SHOP", hasMega: true },
    { label: "COLLECTIONS", hasMega: true },
    { label: "WEAVES", hasMega: true },
    { label: "EDIT", hasMega: true },
    { label: "JOURNAL", href: "/journal", hasMega: false },
    { label: "OUR STORY", href: "/our-story", hasMega: false },
  ];

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#F6F1E8]/95 backdrop-blur-md border-b border-[#D8CDBD] shadow-xs"
            : "bg-[#F6F1E8] border-b border-[#D8CDBD]/40"
        }`}
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-10 h-18 sm:h-20 flex items-center justify-between">
          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[#1F1E1A] hover:text-[#9B5E49] transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Left Nav */}
          <nav className="hidden lg:flex items-center space-x-8 text-[12px] uppercase tracking-[0.16em] font-medium text-[#1F1E1A]">
            {navLinks.slice(0, 3).map((item) => (
              <div
                key={item.label}
                className="relative py-2"
                onMouseEnter={() => item.hasMega && setActiveMegaMenu(item.label)}
              >
                {item.hasMega ? (
                  <button
                    onClick={() => setActiveMegaMenu(activeMegaMenu === item.label ? null : item.label)}
                    className={`hover:text-[#9B5E49] transition-colors pb-1 border-b-2 ${
                      activeMegaMenu === item.label ? "border-[#9B5E49] text-[#9B5E49]" : "border-transparent"
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className="hover:text-[#9B5E49] transition-colors pb-1 border-b-2 border-transparent hover:border-[#9B5E49]"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Center Brand Wordmark */}
          <div className="text-center">
            <Link
              href="/"
              className="font-serif text-[26px] sm:text-[32px] tracking-[0.22em] font-medium text-[#1F1E1A] block transition-transform hover:opacity-90"
            >
              WOVENAIR
            </Link>
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-[#666158] -mt-1 font-light">
              Digital Flagship
            </span>
          </div>

          {/* Desktop Right Nav & Icons */}
          <div className="flex items-center space-x-6 sm:space-x-7">
            {/* Desktop right text links */}
            <nav className="hidden lg:flex items-center space-x-8 text-[12px] uppercase tracking-[0.16em] font-medium text-[#1F1E1A] mr-2">
              {navLinks.slice(3).map((item) => (
                <div
                  key={item.label}
                  className="relative py-2"
                  onMouseEnter={() => item.hasMega && setActiveMegaMenu(item.label)}
                >
                  {item.hasMega ? (
                    <button
                      onClick={() => setActiveMegaMenu(activeMegaMenu === item.label ? null : item.label)}
                      className={`hover:text-[#9B5E49] transition-colors pb-1 border-b-2 ${
                        activeMegaMenu === item.label ? "border-[#9B5E49] text-[#9B5E49]" : "border-transparent"
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href || "/"}
                      className="hover:text-[#9B5E49] transition-colors pb-1 border-b-2 border-transparent hover:border-[#9B5E49]"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-[#1F1E1A] hover:text-[#9B5E49] transition-colors p-1"
              aria-label="Search catalogue"
            >
              <Search className="w-[19px] h-[19px]" />
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative text-[#1F1E1A] hover:text-[#9B5E49] transition-colors p-1"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-[19px] h-[19px]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#9B5E49] text-[#F6F1E8] text-[9px] font-semibold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Bag Icon */}
            <button
              onClick={openCart}
              className="relative text-[#1F1E1A] hover:text-[#9B5E49] transition-colors p-1 flex items-center gap-1.5"
              aria-label={`Shopping bag with ${cartTotalItems} items`}
            >
              <ShoppingBag className="w-[19px] h-[19px]" />
              <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.14em] font-medium">
                BAG ({cartTotalItems})
              </span>
              {cartTotalItems > 0 && (
                <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1F1E1A] text-[#F6F1E8] text-[9px] font-semibold flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu */}
        <DesktopMegaMenu
          activeMenu={activeMegaMenu}
          onClose={() => setActiveMegaMenu(null)}
        />
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
