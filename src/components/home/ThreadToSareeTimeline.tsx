"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  technicalNote: string;
  image: string;
}

const steps: Step[] = [
  {
    id: "yarn",
    stepNumber: "01",
    title: "YARN",
    subtitle: "The Raw Filament",
    description:
      "We source indigenous short-staple cotton and natural mulberry silk cocoons. Fibers are hand-reeled on traditional takli spindles to maintain natural elasticity and thermal porosity.",
    technicalNote: "Count calibrated between 80s and 120s for maximum air circulation without structural weakness.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "colour",
    stepNumber: "02",
    title: "COLOUR",
    subtitle: "Natural Dyes & Mineral Baths",
    description:
      "Yarn hanks are fermented in natural indigo vats, pomegranate rind extracts, and madder root baths. Organic dyeing penetrates deep into the fiber core, allowing colors to age gracefully with sunlight and washes.",
    technicalNote: "Zero heavy-metal mordants or petroleum-based chemical bleaches.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "loom",
    stepNumber: "03",
    title: "LOOM",
    subtitle: "Setting the Warp Tension",
    description:
      "Setting up the loom takes between four to eight days. Over 3,600 individual warp threads are passed through reed teeth and heddle eyes by hand, establishing the exact breathing space of the weave.",
    technicalNote: "Open-reed spacing calibrated to allow cross-ventilation while maintaining drape weight.",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "weave",
    stepNumber: "04",
    title: "WEAVE",
    subtitle: "The Manual Rhythm",
    description:
      "The shuttle glides across the shed at the tempo of the weaver's breath. Complex motifs—whether Jamdani needle inlays or Kanjeevaram Korvai borders—are inserted without automated mechanical punch cards.",
    technicalNote: "Requires two artisans on twin shuttles for synchronized selvedge tension.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "finish",
    stepNumber: "05",
    title: "FINISH",
    subtitle: "Washing, Sun-Drying & Softening",
    description:
      "Unlike factory sarees coated in chemical resin to create artificial stiffness, our pieces undergo clean water well-washes and air drying in open breezes. The saree is soft and supple from the moment you drape it.",
    technicalNote: "Selvedge edges hand-twisted or rolled; zero synthetic heat-glued margins.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function ThreadToSareeTimeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = steps[activeStepIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#F6F1E8] border-b border-[#D8CDBD]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#666158] block mb-2 font-medium">
            Textile Process
          </span>
          <h2 className="font-serif text-[38px] sm:text-[48px] text-[#1F1E1A] leading-tight">
            From Thread to Saree
          </h2>
          <p className="text-[14px] text-[#666158] mt-2 font-light">
            An interactive journey through the five essential rituals of human handloom making.
          </p>
        </div>

        {/* Step Navigation Rail */}
        <div
          role="tablist"
          aria-label="Textile process stages"
          className="flex overflow-x-auto pb-4 mb-12 scrollbar-none border-b border-[#D8CDBD]"
        >
          <div className="flex gap-4 sm:gap-8 min-w-max">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                id={`tab-${step.id}`}
                role="tab"
                aria-selected={idx === activeStepIndex}
                aria-controls={`panel-${step.id}`}
                onClick={() => setActiveStepIndex(idx)}
                className={`text-left pb-4 relative transition-all group ${
                  idx === activeStepIndex ? "text-[#1F1E1A]" : "text-[#666158] hover:text-[#1F1E1A]"
                }`}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-[11px] font-mono text-[#9B5E49]">{step.stepNumber}</span>
                  <span className="font-serif text-[18px] sm:text-[22px] tracking-wide font-medium">
                    {step.title}
                  </span>
                </div>
                {/* Active Indicator Line */}
                {idx === activeStepIndex && (
                  <motion.div
                    layoutId="activeTimelineStep"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-[#1F1E1A]"
                    transition={{ duration: 0.25 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <div
          id={`panel-${currentStep.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentStep.id}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Left: Step Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#D8CDBD]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentStep.image}
                    alt={`${currentStep.title} - ${currentStep.subtitle}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Step Description */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#9B5E49] font-medium">
                  Stage {currentStep.stepNumber} · {currentStep.subtitle}
                </div>

                <h3 className="font-serif text-[32px] sm:text-[38px] text-[#1F1E1A] leading-tight">
                  {currentStep.title}
                </h3>

                <p className="text-[15px] text-[#666158] leading-relaxed font-light">
                  {currentStep.description}
                </p>

                <div className="p-4 bg-[#FBF9F5] border-l-2 border-[#9B5E49] text-[12px] text-[#1F1E1A] leading-relaxed">
                  <span className="font-semibold block uppercase tracking-wider text-[10px] text-[#666158] mb-0.5">
                    Weaver’s Calibrated Standard
                  </span>
                  {currentStep.technicalNote}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
