export type DrapeType = "Airy" | "Fluid" | "Structured" | "Soft";
export type WeightType = "Light" | "Medium" | "Substantial";
export type TransparencyType = "Sheer" | "Slightly-sheer" | "Opaque";
export type StockStatus = "in_stock" | "low_stock" | "made_to_order";

export interface FeelRatings {
  lightness: number; // 1 to 5
  structure: number; // 1 to 5
  sheen: number; // 1 to 5
  drape: number; // 1 to 5
}

export interface ProductImages {
  fullDrape: string;
  fullSaree: string;
  lifestyle: string;
  palluDetail: string;
  borderDetail: string;
  macro: string;
  videoPoster?: string;
}

export interface ShopTheLookItem {
  type: "saree" | "blouse" | "jewellery";
  title: string;
  price: number;
  description: string;
  xPercent: number; // For hotspot pin
  yPercent: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  fabric: string;
  weave: string;
  region: string;
  technique: string;
  color: string;
  occasions: string[];
  price: number;
  originalPrice?: number;
  drape: DrapeType;
  weight: WeightType;
  transparency: TransparencyType;
  blousePiece: boolean;
  blousePieceDetails?: string;
  length: string;
  width: string;
  description: string;
  story: string;
  craftDetails: string[];
  feelRatings: FeelRatings;
  feelDescription: string;
  care: string;
  delivery: string;
  stockStatus: StockStatus;
  isNew?: boolean;
  isBestseller?: boolean;
  collectionSlug: string;
  weaveSlug: string;
  makerSlug?: string;
  images: ProductImages;
  lookHotspots?: ShopTheLookItem[];
  relatedProductSlugs: string[];
}

export interface Collection {
  id: string;
  slug: string;
  chapterNumber?: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  story: string;
  manifesto: string;
  heroImage: string;
  filmImage: string;
  worldBehindStory: {
    heading: string;
    paragraph: string;
    subheading: string;
    subparagraph: string;
    image: string;
  };
  relatedWeaveSlug: string;
  productSlugs: string[];
}

export interface Weave {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  region: string;
  fabric: string;
  definition: string;
  heroImage: string;
  macroImage: string;
  originStory: string;
  whatItFeelsLike: string;
  howItIsMade: string[];
  wovenairInterpretation: string;
}

export interface Maker {
  id: string;
  slug: string;
  name: string;
  title: string;
  region: string;
  craft: string;
  yearsOfExperience: number;
  portrait: string;
  workshopImage: string;
  quote: string;
  story: string;
  techniqueHighlight: string;
  specialtySarees: string[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "STORIES" | "CRAFT" | "TEXTILES" | "PEOPLE" | "STYLE";
  author: string;
  readTime: string;
  date: string;
  heroImage: string;
  excerpt: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
      pullQuote?: string;
      image?: string;
    }[];
    conclusion: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface FilterState {
  fabric: string[];
  weave: string[];
  region: string[];
  technique: string[];
  occasion: string[];
  color: string[];
  priceRange: [number, number];
  availability: string[];
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "bestselling";
