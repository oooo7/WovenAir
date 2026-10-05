import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  savedSlugs: string[];
  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      savedSlugs: [],

      toggleWishlist: (slug: string) => {
        set((state) => {
          const exists = state.savedSlugs.includes(slug);
          return {
            savedSlugs: exists
              ? state.savedSlugs.filter((s) => s !== slug)
              : [...state.savedSlugs, slug],
          };
        });
      },

      isInWishlist: (slug: string) => {
        return get().savedSlugs.includes(slug);
      },

      clearWishlist: () => set({ savedSlugs: [] }),
    }),
    {
      name: "wovenair-wishlist",
    }
  )
);
