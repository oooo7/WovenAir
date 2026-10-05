"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { JournalArticle } from "@/types";

interface JournalSectionProps {
  articles: JournalArticle[];
}

export default function JournalSection({ articles }: JournalSectionProps) {
  const displayArticles = articles.slice(0, 3);

  return (
    <section className="py-24 sm:py-32 bg-[#F6F1E8]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 pb-6 border-b border-[#D8CDBD]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block mb-2 font-medium">
              Editorial Dispatches
            </span>
            <h2 className="font-serif text-[38px] sm:text-[48px] text-[#1F1E1A] leading-tight">
              From The Journal
            </h2>
          </div>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[#1F1E1A] hover:text-[#9B5E49] transition-colors mt-4 sm:mt-0 font-medium self-start sm:self-auto"
          >
            <span>Read All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayArticles.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group block space-y-4"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#D8CDBD]">
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[#9B5E49] font-medium">
                  <span>{article.category}</span>
                  <span>·</span>
                  <span className="text-[#666158] font-normal">{article.readTime}</span>
                </div>

                <h3 className="font-serif text-[22px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-[13px] text-[#666158] line-clamp-2 leading-relaxed font-light">
                  {article.excerpt}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#1F1E1A] group-hover:text-[#9B5E49] font-medium inline-flex items-center gap-1.5 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
