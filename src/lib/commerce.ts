import { productsData } from "@/data/products";
import { collectionsData } from "@/data/collections";
import { weavesData } from "@/data/weaves";
import { makersData } from "@/data/makers";
import { journalData } from "@/data/journal";
import { Product, Collection, Weave, Maker, JournalArticle, FilterState, SortOption } from "@/types";

export interface SearchResults {
  products: Product[];
  collections: Collection[];
  weaves: Weave[];
  journal: JournalArticle[];
}

export const CommerceProvider = {
  // Products
  async getProducts(params?: {
    filters?: Partial<FilterState>;
    sort?: SortOption;
    collectionSlug?: string;
    weaveSlug?: string;
    occasion?: string;
    search?: string;
  }): Promise<Product[]> {
    let result = [...productsData];

    if (params?.collectionSlug) {
      result = result.filter((p) => p.collectionSlug === params.collectionSlug);
    }

    if (params?.weaveSlug) {
      result = result.filter((p) => p.weaveSlug === params.weaveSlug);
    }

    if (params?.occasion) {
      result = result.filter((p) =>
        p.occasions.some((o) => o.toLowerCase() === params.occasion?.toLowerCase())
      );
    }

    if (params?.filters) {
      const f = params.filters;
      if (f.fabric && f.fabric.length > 0) {
        result = result.filter((p) => f.fabric?.some((fab) => p.fabric.toLowerCase().includes(fab.toLowerCase())));
      }
      if (f.weave && f.weave.length > 0) {
        result = result.filter((p) => f.weave?.some((w) => p.weave.toLowerCase().includes(w.toLowerCase())));
      }
      if (f.region && f.region.length > 0) {
        result = result.filter((p) => f.region?.some((r) => p.region.toLowerCase().includes(r.toLowerCase())));
      }
      if (f.occasion && f.occasion.length > 0) {
        result = result.filter((p) => f.occasion?.some((occ) => p.occasions.includes(occ)));
      }
      if (f.color && f.color.length > 0) {
        result = result.filter((p) => f.color?.some((c) => p.color.toLowerCase().includes(c.toLowerCase())));
      }
      if (f.priceRange) {
        const [min, max] = f.priceRange;
        result = result.filter((p) => p.price >= min && p.price <= max);
      }
      if (f.availability && f.availability.length > 0) {
        result = result.filter((p) => f.availability?.includes(p.stockStatus));
      }
    }

    if (params?.search) {
      const q = params.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.weave.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q)
      );
    }

    // Sort
    const sort = params?.sort || "featured";
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "bestselling":
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case "featured":
      default:
        // natural curated order
        break;
    }

    return result;
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return productsData.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  },

  async getFeaturedProducts(limit = 4): Promise<Product[]> {
    return productsData.slice(0, limit);
  },

  // Collections
  async getCollections(): Promise<Collection[]> {
    return collectionsData;
  },

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    return collectionsData.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
  },

  // Weaves
  async getWeaves(): Promise<Weave[]> {
    return weavesData;
  },

  async getWeaveBySlug(slug: string): Promise<Weave | undefined> {
    return weavesData.find((w) => w.slug.toLowerCase() === slug.toLowerCase());
  },

  // Makers
  async getMakers(): Promise<Maker[]> {
    return makersData;
  },

  async getMakerBySlug(slug: string): Promise<Maker | undefined> {
    return makersData.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
  },

  // Journal
  async getJournalArticles(): Promise<JournalArticle[]> {
    return journalData;
  },

  async getJournalBySlug(slug: string): Promise<JournalArticle | undefined> {
    return journalData.find((j) => j.slug.toLowerCase() === slug.toLowerCase());
  },

  // Global Search
  async searchAll(query: string): Promise<SearchResults> {
    const q = query.toLowerCase().trim();
    if (!q) {
      return { products: [], collections: [], weaves: [], journal: [] };
    }

    const products = productsData.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.weave.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    const collections = collectionsData.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.story.toLowerCase().includes(q)
    );

    const weaves = weavesData.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.region.toLowerCase().includes(q) ||
        w.definition.toLowerCase().includes(q) ||
        w.tagline.toLowerCase().includes(q)
    );

    const journal = journalData.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.excerpt.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q)
    );

    return { products, collections, weaves, journal };
  },
};
