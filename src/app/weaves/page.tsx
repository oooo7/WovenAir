import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CommerceProvider } from "@/lib/commerce";

export const metadata = {
  title: "The Textile Library · Handloom Disciplines · WOVENAIR",
  description:
    "An archive of eight master Indian handloom weaves: Chanderi, Kanjeevaram, Jamdani, Ikat, Maheshwari, Kota, Banarasi, and Linen.",
};

export default async function WeavesPage() {
  const weaves = await CommerceProvider.getWeaves();

  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen py-12 sm:py-20">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block font-medium">
            Textile Archive
          </span>
          <h1 className="font-serif text-[42px] sm:text-[56px] text-[#1F1E1A] leading-tight">
            The Textile Library
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#666158] font-light leading-relaxed">
            Textile education made beautiful. Explore the microclimates, loom techniques, and tactile signatures of India&apos;s celebrated weaving traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {weaves.map((weave) => (
            <Link
              key={weave.id}
              href={`/weaves/${weave.slug}`}
              className="group block bg-[#FBF9F5] border border-[#D8CDBD] overflow-hidden"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#D8CDBD]">
                <Image
                  src={weave.heroImage}
                  alt={weave.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="p-8 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B5E49] font-medium">
                    {weave.region} · {weave.fabric}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#666158] group-hover:text-[#9B5E49] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h2 className="font-serif text-[28px] sm:text-[34px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors leading-tight">
                  {weave.name}
                </h2>

                <p className="text-[13px] text-[#666158] italic font-serif">
                  “{weave.tagline}”
                </p>

                <p className="text-[14px] text-[#666158] leading-relaxed font-light">
                  {weave.definition}
                </p>

                <div className="pt-2 border-t border-[#D8CDBD]/70">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#1F1E1A] group-hover:text-[#9B5E49] font-medium inline-block">
                    Explore Weave Discipline →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
