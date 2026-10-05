import { CommerceProvider } from "@/lib/commerce";
import HeroSection from "@/components/home/HeroSection";
import ManifestoSection from "@/components/home/ManifestoSection";
import ChapterOneSection from "@/components/home/ChapterOneSection";
import FeaturedEditSection from "@/components/home/FeaturedEditSection";
import ShopByWeaveSection from "@/components/home/ShopByWeaveSection";
import SareeInMotionSection from "@/components/home/SareeInMotionSection";
import ThreadToSareeTimeline from "@/components/home/ThreadToSareeTimeline";
import TheMakersSection from "@/components/home/TheMakersSection";
import ShopTheLookSection from "@/components/home/ShopTheLookSection";
import InRealLifeGallery from "@/components/home/InRealLifeGallery";
import JournalSection from "@/components/home/JournalSection";

export const metadata = {
  title: "WOVENAIR · Contemporary Indian Textile House",
  description:
    "A contemporary Indian textile house creating sarees that carry traditional craft into modern wardrobes. Woven stories. Made for now.",
};

export default async function HomePage() {
  const [featuredProducts, weaves, makers, journalArticles] = await Promise.all([
    CommerceProvider.getFeaturedProducts(4),
    CommerceProvider.getWeaves(),
    CommerceProvider.getMakers(),
    CommerceProvider.getJournalArticles(),
  ]);

  return (
    <div className="w-full">
      {/* 01: Hero */}
      <HeroSection />

      {/* 02: Manifesto */}
      <ManifestoSection />

      {/* 03: Chapter 01 Feature */}
      <ChapterOneSection />

      {/* 04: The First Edit (4 Featured Sarees) */}
      <FeaturedEditSection products={featuredProducts} />

      {/* 05: The Textile Stories (8 Weave cards) */}
      <ShopByWeaveSection weaves={weaves} />

      {/* 06: Saree in Motion */}
      <SareeInMotionSection />

      {/* 07: From Thread to Saree Interactive Timeline */}
      <ThreadToSareeTimeline />

      {/* 08: The Makers */}
      <TheMakersSection makers={makers} />

      {/* 09: Shop The Look */}
      <ShopTheLookSection />

      {/* 10: In Real Life */}
      <InRealLifeGallery />

      {/* 11: Journal */}
      <JournalSection articles={journalArticles} />
    </div>
  );
}
