import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CommerceProvider } from "@/lib/commerce";

export const metadata = {
  title: "Collections Archive · WOVENAIR",
  description:
    "Curated chapters and edits in Indian handloom craft. Chapter 01: The First Weave, The Festive Edit, and The Everyday Edit.",
};

export default async function CollectionsPage() {
  const collections = await CommerceProvider.getCollections();

  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen py-12 sm:py-20">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block font-medium">
            Curatorial Worlds
          </span>
          <h1 className="font-serif text-[42px] sm:text-[56px] text-[#1F1E1A] leading-tight">
            Collection Edits
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#666158] font-light leading-relaxed">
            Each collection explores an essential question of drape, tension, and living. Handloom sarees designed to exist as cohesive worlds.
          </p>
        </div>

        <div className="space-y-24">
          {collections.map((col, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={col.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-b border-[#D8CDBD] pb-20"
              >
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Link href={`/collections/${col.slug}`} className="group block relative aspect-[16/10] overflow-hidden bg-[#D8CDBD]">
                    <Image
                      src={col.heroImage}
                      alt={col.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    />
                  </Link>
                </div>

                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? "lg:order-1 lg:pr-6" : "lg:order-2 lg:pl-6"
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#9B5E49] font-medium block">
                    {col.chapterNumber || col.eyebrow}
                  </span>

                  <h2 className="font-serif text-[36px] sm:text-[46px] text-[#1F1E1A] leading-tight">
                    <Link href={`/collections/${col.slug}`} className="hover:text-[#9B5E49] transition-colors">
                      {col.title}
                    </Link>
                  </h2>

                  <p className="text-[15px] text-[#666158] font-light leading-relaxed">
                    {col.subtitle}
                  </p>

                  <p className="text-[14px] text-[#666158] font-light leading-relaxed">
                    {col.story}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/collections/${col.slug}`}
                      className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#1F1E1A] text-[#F6F1E8] text-[12px] uppercase tracking-[0.18em] font-medium hover:bg-[#9B5E49] transition-colors"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
