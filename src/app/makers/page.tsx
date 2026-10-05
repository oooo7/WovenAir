import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CommerceProvider } from "@/lib/commerce";

export const metadata = {
  title: "The Master Weavers · Human Craft Lineage · WOVENAIR",
  description:
    "Meet the master weavers and craft custodians across Bundelkhand, Nadia, Kanchipuram, Sambalpur, and Kaithun.",
};

export default async function MakersPage() {
  const makers = await CommerceProvider.getMakers();

  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen py-12 sm:py-20">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#68705B] block font-semibold">
            Human Lineage
          </span>
          <h1 className="font-serif text-[42px] sm:text-[56px] text-[#1F1E1A] leading-tight">
            The Master Weavers
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#666158] font-light leading-relaxed">
            Behind every yard of unhurried fabric are individuals who carry generations of oral mathematics, tension sensitivity, and loom lore.
          </p>
          <div className="p-3 bg-[#FBF9F5] border border-[#D8CDBD] text-[11px] text-[#666158] italic font-light inline-block">
            * Note: Artisan profiles are conceptual prototype narratives celebrating authentic Indian weaving traditions.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {makers.map((maker) => (
            <Link
              key={maker.id}
              href={`/makers/${maker.slug}`}
              className="group block bg-[#FBF9F5] border border-[#D8CDBD] overflow-hidden"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#D8CDBD]">
                <Image
                  src={maker.portrait}
                  alt={maker.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#68705B] font-medium">
                    {maker.region}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#666158] group-hover:text-[#9B5E49] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h2 className="font-serif text-[24px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors">
                  {maker.name}
                </h2>

                <p className="text-[12px] text-[#666158] font-medium uppercase tracking-wider">
                  {maker.title} · {maker.yearsOfExperience} Years at Loom
                </p>

                <p className="text-[13px] text-[#666158] italic font-serif leading-relaxed line-clamp-2">
                  “{maker.quote}”
                </p>

                <div className="pt-2 border-t border-[#D8CDBD]/70">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#1F1E1A] group-hover:text-[#9B5E49] font-medium inline-block">
                    Read Maker Story →
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
