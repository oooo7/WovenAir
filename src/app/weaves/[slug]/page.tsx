import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { CommerceProvider } from "@/lib/commerce";
import ProductCard from "@/components/product/ProductCard";

interface WeavePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: WeavePageProps): Promise<Metadata> {
  const { slug } = await params;
  const weave = await CommerceProvider.getWeaveBySlug(slug);

  if (!weave) {
    return { title: "Weave Not Found" };
  }

  return {
    title: `${weave.name} — Handloom Textile Guide · WOVENAIR`,
    description: weave.definition,
  };
}

export default async function WeaveDetailPage({ params }: WeavePageProps) {
  const { slug } = await params;
  const weave = await CommerceProvider.getWeaveBySlug(slug);

  if (!weave) {
    notFound();
  }

  const allProducts = await CommerceProvider.getProducts();
  const availableSarees = allProducts.filter(
    (p) =>
      p.weaveSlug === weave.slug ||
      p.weave.toLowerCase().includes(weave.name.toLowerCase())
  );

  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 py-5 text-[11px] uppercase tracking-[0.16em] text-[#666158] flex items-center gap-2 border-b border-[#D8CDBD]/40">
        <Link href="/" className="hover:text-[#1F1E1A]">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
        <Link href="/weaves" className="hover:text-[#1F1E1A]">Textile Library</Link>
        <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
        <span className="text-[#1F1E1A] font-medium">{weave.name}</span>
      </div>

      {/* Hero */}
      <section className="relative w-full h-[60vh] min-h-[460px] flex items-end overflow-hidden bg-[#1F1E1A]">
        <Image
          src={weave.heroImage}
          alt={weave.name}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-10 pb-16 w-full text-[#F6F1E8]">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#D8CDBD] block mb-2">
            {weave.region} · {weave.fabric}
          </span>
          <h1 className="font-serif text-[46px] sm:text-[68px] leading-tight font-normal mb-3">
            {weave.name}
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#D8CDBD] max-w-xl font-light italic font-serif">
            “{weave.tagline}”
          </p>
        </div>
      </section>

      {/* Origin & Definition */}
      <section className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#D8CDBD]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#9B5E49] font-medium block">
                Origin & Lineage
              </span>
              <h2 className="font-serif text-[34px] sm:text-[44px] text-[#1F1E1A] leading-tight">
                Where the Weave Began
              </h2>
              <p className="text-[15px] text-[#666158] font-light leading-relaxed">
                {weave.originStory}
              </p>
              <div className="p-5 bg-[#F6F1E8] border border-[#D8CDBD] space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#666158] block font-semibold">
                  What It Feels Like
                </span>
                <p className="text-[14px] text-[#1F1E1A] font-serif italic leading-relaxed">
                  {weave.whatItFeelsLike}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] bg-[#D8CDBD] overflow-hidden">
              <Image
                src={weave.macroImage}
                alt={`${weave.name} macro weave structure`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it is Made & Wovenair Interpretation */}
      <section className="py-20 sm:py-28 max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* How It is Made */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#666158] font-semibold block">
              The Loom Process
            </span>
            <h3 className="font-serif text-[30px] sm:text-[36px] text-[#1F1E1A]">
              How {weave.name} Is Made
            </h3>
            <div className="space-y-4 pt-2">
              {weave.howItIsMade.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="font-mono text-[12px] text-[#9B5E49] pt-0.5">0{idx + 1}</span>
                  <p className="text-[14px] text-[#666158] font-light leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Wovenair's Interpretation */}
          <div className="lg:col-span-6 space-y-6 lg:pl-8 lg:border-l lg:border-[#D8CDBD]">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#9B5E49] font-semibold block">
              The Contemporary Calibration
            </span>
            <h3 className="font-serif text-[30px] sm:text-[36px] text-[#1F1E1A]">
              WOVENAIR&apos;s Interpretation
            </h3>
            <p className="text-[15px] text-[#666158] font-light leading-relaxed">
              {weave.wovenairInterpretation}
            </p>
            <div className="p-5 bg-[#FBF9F5] border-l-2 border-[#1F1E1A] text-[13px] text-[#1F1E1A] leading-relaxed">
              “We honour the weaver&apos;s hands while releasing the cloth from historical stiffness.”
            </div>
          </div>
        </div>
      </section>

      {/* Available Sarees in this Weave */}
      <section className="py-20 sm:py-28 bg-[#FBF9F5] border-t border-[#D8CDBD]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="flex justify-between items-baseline mb-12 pb-4 border-b border-[#D8CDBD]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#666158] block mb-1">
                Catalogue Exploration
              </span>
              <h3 className="font-serif text-[32px] sm:text-[40px] text-[#1F1E1A]">
                Available {weave.name} Sarees ({availableSarees.length})
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-[12px] uppercase tracking-[0.14em] text-[#9B5E49] hover:text-[#1F1E1A]"
            >
              All Sarees →
            </Link>
          </div>

          {availableSarees.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {availableSarees.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-[#666158] font-light">
              New pieces in this weave discipline are currently on the loom.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
