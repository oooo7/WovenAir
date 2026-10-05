import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { CommerceProvider } from "@/lib/commerce";
import ProductCard from "@/components/product/ProductCard";

interface MakerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MakerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const maker = await CommerceProvider.getMakerBySlug(slug);

  if (!maker) {
    return { title: "Maker Not Found" };
  }

  return {
    title: `${maker.name} — Master Weaver · WOVENAIR`,
    description: maker.story,
  };
}

export default async function MakerDetailPage({ params }: MakerPageProps) {
  const { slug } = await params;
  const maker = await CommerceProvider.getMakerBySlug(slug);

  if (!maker) {
    notFound();
  }

  const allProducts = await CommerceProvider.getProducts();
  const artisanSarees = allProducts.filter(
    (p) =>
      p.makerSlug === maker.slug ||
      maker.specialtySarees.some((s) => s.toLowerCase() === p.name.toLowerCase())
  );

  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 py-5 text-[11px] uppercase tracking-[0.16em] text-[#666158] flex items-center gap-2 border-b border-[#D8CDBD]/40">
        <Link href="/" className="hover:text-[#1F1E1A]">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
        <Link href="/makers" className="hover:text-[#1F1E1A]">The Makers</Link>
        <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
        <span className="text-[#1F1E1A] font-medium">{maker.name}</span>
      </div>

      {/* Main Profile Story */}
      <section className="py-16 sm:py-24 max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Portrait & Workshop Imagery */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] bg-[#D8CDBD] overflow-hidden">
              <Image
                src={maker.portrait}
                alt={maker.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-video bg-[#D8CDBD] overflow-hidden">
              <Image
                src={maker.workshopImage}
                alt={`${maker.name} workshop`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 text-[9px] uppercase tracking-wider text-white">
                Studio Workshop · {maker.region}
              </div>
            </div>
          </div>

          {/* Right: Narrative & Technique */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#68705B] font-semibold block mb-2">
                {maker.region} · {maker.yearsOfExperience} Years at the Loom
              </span>
              <h1 className="font-serif text-[42px] sm:text-[56px] text-[#1F1E1A] leading-tight">
                {maker.name}
              </h1>
              <p className="text-[15px] uppercase tracking-wider text-[#666158] font-medium mt-1">
                {maker.title}
              </p>
            </div>

            <blockquote className="border-l-2 border-[#9B5E49] pl-5 italic font-serif text-[22px] sm:text-[26px] text-[#1F1E1A] leading-snug">
              “{maker.quote}”
            </blockquote>

            <div className="space-y-4 text-[15px] sm:text-[16px] text-[#666158] leading-relaxed font-light">
              <p>{maker.story}</p>
            </div>

            <div className="p-6 bg-[#FBF9F5] border border-[#D8CDBD] space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B5E49] font-semibold block">
                Artisan Technique Signature
              </span>
              <p className="text-[14px] text-[#1F1E1A] leading-relaxed font-light">
                {maker.techniqueHighlight}
              </p>
            </div>

            <div className="p-4 bg-[#F6F1E8] border border-[#D8CDBD] text-[11px] text-[#666158] italic">
              * Prototype Content Notice: This profile reflects our commitment to human-scale handloom documentation and artisan dignity.
            </div>
          </div>
        </div>
      </section>

      {/* Sarees crafted by this weaver */}
      {artisanSarees.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#FBF9F5] border-t border-[#D8CDBD]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
            <div className="mb-12 pb-4 border-b border-[#D8CDBD]">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#666158] block mb-1">
                From This Loom
              </span>
              <h3 className="font-serif text-[32px] sm:text-[40px] text-[#1F1E1A]">
                Sarees Woven by {maker.name}
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {artisanSarees.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
