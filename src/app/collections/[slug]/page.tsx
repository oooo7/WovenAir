import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { CommerceProvider } from "@/lib/commerce";
import ProductCard from "@/components/product/ProductCard";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = await CommerceProvider.getCollectionBySlug(slug);

  if (!collection) {
    return { title: "Collection Not Found" };
  }

  return {
    title: `${collection.title} · Collection Edit`,
    description: collection.story,
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await CommerceProvider.getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const allProducts = await CommerceProvider.getProducts();
  const collectionProducts = allProducts.filter((p) =>
    collection.productSlugs.includes(p.slug)
  );

  const relatedWeave = await CommerceProvider.getWeaveBySlug(collection.relatedWeaveSlug);

  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 py-5 text-[11px] uppercase tracking-[0.16em] text-[#666158] flex items-center gap-2 border-b border-[#D8CDBD]/40">
        <Link href="/" className="hover:text-[#1F1E1A]">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
        <Link href="/collections" className="hover:text-[#1F1E1A]">Collections</Link>
        <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
        <span className="text-[#1F1E1A] font-medium">{collection.title}</span>
      </div>

      {/* Collection Hero */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-end justify-start overflow-hidden bg-[#1F1E1A]">
        <Image
          src={collection.heroImage}
          alt={collection.title}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-10 pb-16 w-full text-[#F6F1E8]">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D8CDBD] block mb-3 font-medium">
            {collection.chapterNumber || collection.eyebrow}
          </span>
          <h1 className="font-serif text-[44px] sm:text-[68px] leading-tight font-normal mb-4">
            {collection.title}
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#D8CDBD] max-w-xl font-light leading-relaxed">
            {collection.subtitle}
          </p>
        </div>
      </section>

      {/* Story & Manifesto */}
      <section className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#D8CDBD]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center space-y-8">
          <blockquote className="font-serif text-[32px] sm:text-[44px] text-[#1F1E1A] leading-tight font-normal">
            “{collection.manifesto}”
          </blockquote>
          <p className="text-[16px] text-[#666158] font-light leading-relaxed max-w-2xl mx-auto">
            {collection.story}
          </p>
        </div>
      </section>

      {/* Collection Products Grid */}
      <section className="py-20 sm:py-28 max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="flex justify-between items-baseline mb-12 pb-4 border-b border-[#D8CDBD]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#666158] block mb-1">
              Pieces in Edit
            </span>
            <h3 className="font-serif text-[32px] sm:text-[40px] text-[#1F1E1A]">
              The Sarees ({collectionProducts.length})
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* The World Behind The Collection */}
      <section className="py-24 sm:py-32 bg-[#FBF9F5] border-t border-[#D8CDBD]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#9B5E49] font-medium block">
                World-Building
              </span>
              <h2 className="font-serif text-[36px] sm:text-[48px] text-[#1F1E1A] leading-tight">
                {collection.worldBehindStory.heading}
              </h2>
              <p className="text-[15px] text-[#666158] leading-relaxed font-light">
                {collection.worldBehindStory.paragraph}
              </p>

              <div className="p-5 bg-[#F6F1E8] border-l-2 border-[#1F1E1A] space-y-1">
                <h4 className="font-serif text-[18px] text-[#1F1E1A]">
                  {collection.worldBehindStory.subheading}
                </h4>
                <p className="text-[13px] text-[#666158] font-light leading-relaxed">
                  {collection.worldBehindStory.subparagraph}
                </p>
              </div>

              {relatedWeave && (
                <div className="pt-4">
                  <Link
                    href={`/weaves/${relatedWeave.slug}`}
                    className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[#1F1E1A] hover:text-[#9B5E49] transition-colors border-b border-[#1F1E1A] pb-1 hover:border-[#9B5E49]"
                  >
                    <span>Explore Anchor Weave: {relatedWeave.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] bg-[#D8CDBD] overflow-hidden">
              <Image
                src={collection.worldBehindStory.image}
                alt={collection.worldBehindStory.heading}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
