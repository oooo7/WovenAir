import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CommerceProvider } from "@/lib/commerce";

export const metadata = {
  title: "Journal · Textile Stories & Field Notes · WOVENAIR",
  description:
    "Dispatches on Indian handloom culture, weaver oral histories, drape philosophies, and the science of unweighted silk.",
};

export default async function JournalPage() {
  const articles = await CommerceProvider.getJournalArticles();
  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1);

  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen py-12 sm:py-20">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-[#D8CDBD]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block mb-2 font-medium">
              The Wovenair Magazine
            </span>
            <h1 className="font-serif text-[42px] sm:text-[56px] text-[#1F1E1A] leading-tight">
              Journal & Dispatches
            </h1>
          </div>
          <div className="flex gap-4 text-[11px] uppercase tracking-[0.16em] text-[#666158] mt-4 sm:mt-0">
            <span>Stories</span>
            <span>·</span>
            <span>Craft</span>
            <span>·</span>
            <span>Textiles</span>
            <span>·</span>
            <span>People</span>
            <span>·</span>
            <span>Style</span>
          </div>
        </div>

        {/* Feature Article: Dominant Visual Space */}
        {featuredArticle && (
          <div className="mb-20 pb-20 border-b border-[#D8CDBD]">
            <Link
              href={`/journal/${featuredArticle.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden bg-[#D8CDBD]">
                <Image
                  src={featuredArticle.heroImage}
                  alt={featuredArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#9B5E49] font-semibold">
                  <span>Cover Story</span>
                  <span>·</span>
                  <span>{featuredArticle.category}</span>
                </div>

                <h2 className="font-serif text-[32px] sm:text-[40px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors leading-[1.15]">
                  {featuredArticle.title}
                </h2>

                <p className="text-[15px] text-[#666158] font-light leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between text-[12px] text-[#666158]">
                  <span>{featuredArticle.author}</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <div className="pt-2">
                  <span className="text-[12px] uppercase tracking-[0.16em] text-[#1F1E1A] group-hover:text-[#9B5E49] font-medium inline-flex items-center gap-2">
                    <span>Read Cover Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Secondary Articles Grid: Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {secondaryArticles.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group block space-y-4"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-[#D8CDBD]">
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[#9B5E49] font-semibold">
                  <span>{article.category}</span>
                  <span>·</span>
                  <span className="text-[#666158] font-normal">{article.readTime}</span>
                </div>

                <h3 className="font-serif text-[24px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-[14px] text-[#666158] line-clamp-2 leading-relaxed font-light">
                  {article.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] text-[#666158] border-t border-[#D8CDBD]/60 pt-3">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
