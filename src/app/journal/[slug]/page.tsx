import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { CommerceProvider } from "@/lib/commerce";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await CommerceProvider.getJournalBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${article.title} · WOVENAIR Journal`,
    description: article.excerpt,
  };
}

export default async function JournalArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await CommerceProvider.getJournalBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await CommerceProvider.getJournalArticles();
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <article className="w-full bg-[#F6F1E8] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 py-5 text-[11px] uppercase tracking-[0.16em] text-[#666158] flex items-center gap-2 border-b border-[#D8CDBD]/40">
        <Link href="/" className="hover:text-[#1F1E1A]">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
        <Link href="/journal" className="hover:text-[#1F1E1A]">Journal</Link>
        <ChevronRight className="w-3 h-3 text-[#D8CDBD]" />
        <span className="text-[#1F1E1A] font-medium">{article.category}</span>
      </div>

      {/* Article Header */}
      <header className="py-14 sm:py-20 max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#9B5E49] font-medium">
          <span>{article.category}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="font-serif text-[42px] sm:text-[60px] leading-[1.08] text-[#1F1E1A] font-normal">
          {article.title}
        </h1>

        <p className="text-[17px] sm:text-[20px] text-[#666158] font-light italic font-serif max-w-2xl mx-auto leading-relaxed">
          {article.subtitle}
        </p>

        <div className="pt-4 flex items-center justify-center gap-4 text-[13px] text-[#666158] border-t border-[#D8CDBD]/60 max-w-xs mx-auto">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-[1100px] mx-auto px-6 mb-16">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#D8CDBD]">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Article Body Content */}
      <div className="max-w-2xl mx-auto px-6 pb-20 space-y-10 text-[16px] sm:text-[18px] text-[#1F1E1A] leading-[1.8] font-light">
        <p className="font-serif text-[22px] sm:text-[24px] text-[#1F1E1A] leading-relaxed font-normal">
          {article.content.intro}
        </p>

        {article.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-6 pt-4">
            <h2 className="font-serif text-[28px] sm:text-[34px] text-[#1F1E1A] leading-tight font-normal">
              {section.heading}
            </h2>

            {section.body.map((p, pIdx) => (
              <p key={pIdx} className="text-[#666158]">
                {p}
              </p>
            ))}

            {section.pullQuote && (
              <blockquote className="my-8 py-6 px-8 border-l-2 border-[#9B5E49] bg-[#FBF9F5] font-serif text-[22px] sm:text-[26px] italic text-[#1F1E1A] leading-snug">
                “{section.pullQuote}”
              </blockquote>
            )}

            {section.image && (
              <div className="my-8 relative aspect-[16/10] overflow-hidden bg-[#D8CDBD]">
                <Image
                  src={section.image}
                  alt={section.heading}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover"
                />
              </div>
            )}
          </section>
        ))}

        <div className="pt-8 border-t border-[#D8CDBD]">
          <p className="font-serif italic text-[20px] text-[#704238]">
            {article.content.conclusion}
          </p>
        </div>

        <div className="pt-8">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[#1F1E1A] hover:text-[#9B5E49] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal Archive</span>
          </Link>
        </div>
      </div>

      {/* Read Next Section */}
      <section className="py-20 bg-[#FBF9F5] border-t border-[#D8CDBD]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="mb-10 pb-4 border-b border-[#D8CDBD]">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#666158] block mb-1">
              Keep Reading
            </span>
            <h3 className="font-serif text-[28px] sm:text-[34px] text-[#1F1E1A]">
              Related Dispatches
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/journal/${rel.slug}`}
                className="group p-6 bg-[#F6F1E8] border border-[#D8CDBD] hover:border-[#9B5E49] transition-all block space-y-3"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B5E49] font-medium block">
                  {rel.category} · {rel.readTime}
                </span>
                <h4 className="font-serif text-[22px] text-[#1F1E1A] group-hover:text-[#9B5E49] transition-colors leading-snug">
                  {rel.title}
                </h4>
                <p className="text-[13px] text-[#666158] font-light line-clamp-2">
                  {rel.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
