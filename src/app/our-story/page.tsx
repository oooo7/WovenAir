import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Story · The Architecture of Thread & Air · WOVENAIR",
  description:
    "Why WOVENAIR exists: a contemporary Indian textile house balancing indigenous handloom continuity with modern movement.",
};

export default function OurStoryPage() {
  return (
    <div className="w-full bg-[#F6F1E8] min-h-screen">
      {/* Editorial Hero */}
      <section className="relative w-full h-[70vh] min-h-[520px] flex items-end overflow-hidden bg-[#1F1E1A]">
        <Image
          src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=2000&q=85"
          alt="Loom shuttle in motion"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.7] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-10 pb-16 w-full text-[#F6F1E8]">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D8CDBD] block mb-3 font-medium">
            Brand Manifesto
          </span>
          <h1 className="font-serif text-[46px] sm:text-[72px] leading-tight font-normal max-w-3xl">
            Woven Stories.
            <br />
            <span className="italic">Made for Now.</span>
          </h1>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28 space-y-24 text-[#1F1E1A]">
        {/* Section 1: Why Wovenair Exists */}
        <section className="space-y-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#9B5E49] font-medium block">
            01 / Genesis
          </span>
          <h2 className="font-serif text-[36px] sm:text-[44px] leading-tight">
            Why WOVENAIR Exists
          </h2>
          <div className="space-y-4 text-[16px] sm:text-[17px] text-[#666158] leading-relaxed font-light">
            <p>
              The Indian saree is the world&apos;s oldest surviving unstitched garment. For thousands of years, it has wrapped bodies across celebrations, workdays, protests, and quiet domestic rituals.
            </p>
            <p>
              Yet in recent decades, many traditional sarees became trapped under two opposing extremes: either cheaply imitated by polyester powerlooms, or weighed down with stiff synthetic glazes meant only for stationary stage photography.
            </p>
            <p>
              WOVENAIR was created to free the saree from that impasse. We design six yards you can run up stairs in, sit cross-legged through boardroom strategy meetings in, or dance until midnight in—without ever losing poise.
            </p>
          </div>
        </section>

        {/* Section 2: What We Believe */}
        <section className="space-y-6 pt-10 border-t border-[#D8CDBD]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#9B5E49] font-medium block">
            02 / Philosophy
          </span>
          <h2 className="font-serif text-[36px] sm:text-[44px] leading-tight">
            What We Believe
          </h2>
          <div className="space-y-4 text-[16px] sm:text-[17px] text-[#666158] leading-relaxed font-light">
            <blockquote className="border-l-2 border-[#1F1E1A] pl-5 font-serif text-[22px] sm:text-[26px] italic text-[#1F1E1A] leading-snug my-6">
              “Craft cannot survive in museums. It survives only when worn with modern ease.”
            </blockquote>
            <p>
              We believe in the dignity of slow time. A weaver seated at a manual pit loom is not an anachronism; they are an acoustic, kinetic intelligence operating with sensitivities that digital code cannot compute.
            </p>
            <p>
              We do not add unnecessary embroidery simply to inflate price. The beauty is in the structure of the weave itself—the clean hairline selvedge, the honesty of the slub, the way the light grazes the warp.
            </p>
          </div>
        </section>

        {/* Section 3: The Textiles */}
        <section className="space-y-6 pt-10 border-t border-[#D8CDBD]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#9B5E49] font-medium block">
            03 / Materiality
          </span>
          <h2 className="font-serif text-[36px] sm:text-[44px] leading-tight">
            The Textiles: Weave Meets Air
          </h2>
          <div className="space-y-4 text-[16px] sm:text-[17px] text-[#666158] leading-relaxed font-light">
            <p>
              “WOVEN” is the discipline of thread, loom, tradition, human hands, and geographic heritage.
            </p>
            <p>
              “AIR” is space, drape, breath, light, movement, and modern pace.
            </p>
            <p>
              By recalibrating yarn counts, loosening reed density, and eliminating chemical stiffness, our sarees invite air to circulate freely. You feel lighter because the textile is literally designed to breathe.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/weaves"
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[#1F1E1A] hover:text-[#9B5E49] transition-colors border-b border-[#1F1E1A] pb-1 hover:border-[#9B5E49]"
            >
              <span>Explore The 8 Textile Disciplines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section 4: The People */}
        <section className="space-y-6 pt-10 border-t border-[#D8CDBD]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#9B5E49] font-medium block">
            04 / Community
          </span>
          <h2 className="font-serif text-[36px] sm:text-[44px] leading-tight">
            The People
          </h2>
          <div className="space-y-4 text-[16px] sm:text-[17px] text-[#666158] leading-relaxed font-light">
            <p>
              We partner directly with multi-generational weaver families across Madhya Pradesh, Bengal, Odisha, Tamil Nadu, and Rajasthan. No opaque middlemen, no predatory consignment terms.
            </p>
            <p>
              By paying living wages and committing to year-round production schedules, we ensure young artisans see a viable, proud future in their ancestral craft.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/makers"
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[#1F1E1A] hover:text-[#9B5E49] transition-colors border-b border-[#1F1E1A] pb-1 hover:border-[#9B5E49]"
            >
              <span>Meet The Artisans</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section 5: The Future */}
        <section className="space-y-6 pt-10 border-t border-[#D8CDBD]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#9B5E49] font-medium block">
            05 / Horizons
          </span>
          <h2 className="font-serif text-[36px] sm:text-[44px] leading-tight">
            The Future of Handloom
          </h2>
          <div className="space-y-4 text-[16px] sm:text-[17px] text-[#666158] leading-relaxed font-light">
            <p>
              We are building a digital flagship that bridges geographic distances. Whether you are ordering from New Delhi, London, or New York, you receive an authentic piece of Indian textile artistry that arrives ready to live in.
            </p>
            <p className="font-serif italic text-[20px] text-[#704238] pt-4">
              Thank you for carrying these stories forward.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
