import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CommerceProvider } from "@/lib/commerce";
import ProductPageClient from "./ProductPageClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await CommerceProvider.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} — ${product.fabric} Saree`,
    description: product.description,
    openGraph: {
      title: `${product.name} · WOVENAIR`,
      description: product.description,
      images: [
        {
          url: product.images.fullDrape,
          width: 800,
          height: 1067,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await CommerceProvider.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products
  const allProducts = await CommerceProvider.getProducts();
  const relatedProducts = allProducts.filter((p) =>
    product.relatedProductSlugs.includes(p.slug)
  );

  return (
    <ProductPageClient
      product={product}
      relatedProducts={relatedProducts.length > 0 ? relatedProducts : allProducts.slice(0, 4)}
    />
  );
}
