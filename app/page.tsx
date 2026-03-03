'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToArchive = () => {
    document.getElementById('archive-intro')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FBFF]">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity }}
      >
        {/* Scan line */}
        <div className="scan-line" aria-hidden="true" />

        {/* Corner marks */}
        {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map((pos) => (
          <div key={pos} className={`absolute ${pos} w-8 h-8 opacity-20`} aria-hidden="true">
            <div className="absolute top-0 left-0 w-full h-px bg-[#1E3A5F]" />
            <div className="absolute top-0 left-0 h-full w-px bg-[#1E3A5F]" />
          </div>
        ))}

        <motion.div
          className="max-w-3xl mx-auto px-8 text-center"
          style={{ y: titleY }}
        >
          {/* Archive identifier */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <span className="catalogue-id">
              Archaeological Archive — Catalogue No. PC-2126 — Repository of the Anthropocene
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="object-title text-5xl md:text-6xl lg:text-7xl text-[#1E3A5F] mb-4 leading-none"
          >
            Plastic Centuries
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-8"
          >
            <span className="font-ibm-mono text-[0.75rem] tracking-[0.2em] text-[#8FACC8] uppercase">
              1950 – 2060
            </span>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="section-divider mb-10"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="font-ibm-serif text-lg md:text-xl font-light text-[#2A3A4A] leading-relaxed mb-10 italic"
          >
            A future archaeological examination of plastic as ritual infrastructure,
            recovered from the sedimentary record of late industrial civilisation.
          </motion.p>

          {/* Body paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="space-y-4 mb-14 text-left"
          >
            <div className="bg-[#F0F7FF] border border-[#DCEEFF] p-6">
              <div className="archive-label mb-3 text-[#1E3A5F]">Archaeological Framing</div>
              <p className="body-text text-[#2A3A4A] text-sm">
                This archive is narrated from the perspective of future archaeologists (c.2126) 
                who have excavated the stratigraphic record of early 21st-century material culture. 
                Twelve polymer artefacts are presented as specimens within a formal exhibition catalogue. 
                Each object is interpreted through the lens of ritual practice, institutional infrastructure, 
                and systemic consumption — methodologies applied to civilisations whose belief systems 
                are no longer directly accessible.
              </p>
            </div>

            <div className="bg-[#F0F7FF] border border-[#DCEEFF] p-6">
              <div className="archive-label mb-3 text-[#1E3A5F]">Ritualised Consumption</div>
              <p className="body-text text-[#2A3A4A] text-sm">
                The objects in this collection were produced, distributed, and discarded according to 
                patterns indistinguishable from ritual behaviour: daily repetition, ceremonial packaging, 
                standardised form, and hierarchical distribution. Future analysts, lacking access 
                to living participants, will read these objects as evidence of a global devotional 
                infrastructure centred on consumption as cosmological practice.
              </p>
            </div>

            <div className="bg-[#F0F7FF] border border-[#DCEEFF] p-6">
              <div className="archive-label mb-3 text-[#1E3A5F]">Interface as Archive</div>
              <p className="body-text text-[#2A3A4A] text-sm">
                This digital interface functions as a museum catalogue, excavation report, and speculative 
                fiction simultaneously. It is an exercise in what Sharon Macdonald terms 
                the &apos;museum effect&apos; — the transformation of objects into specimens, and specimens 
                into evidence. The archive does not argue; it classifies, describes, and invites 
                the visitor to examine what classification reveals and conceals.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/archive"
              className="group inline-flex items-center gap-3 bg-[#1E3A5F] text-[#F8FBFF] px-8 py-3.5 font-ibm-mono text-[0.7rem] tracking-[0.15em] uppercase hover:bg-[#2A4E7C] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A5F]"
            >
              <span>Begin the Archive</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </Link>
            <button
              onClick={scrollToArchive}
              className="inline-flex items-center gap-2 border border-[#C4D9EE] text-[#8FACC8] px-8 py-3.5 font-ibm-mono text-[0.7rem] tracking-[0.15em] uppercase hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-colors duration-300"
            >
              View Context
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 flex flex-col items-center gap-2"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="archive-label text-[0.55rem]">Scroll to continue</div>
            <div className="w-px h-8 bg-gradient-to-b from-[#8FACC8] to-transparent" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Archive intro section */}
      <section id="archive-intro" className="py-24 px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="archive-label mb-6 text-[#1E3A5F]">About This Exhibition</div>
          <h2 className="object-title text-3xl md:text-4xl text-[#1E3A5F] mb-8 leading-tight">
            The Archaeological Fiction of <br />the Present Tense
          </h2>

          <div className="section-divider mb-8" />

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                heading: 'Twelve Specimens',
                body: 'The archive presents twelve polymer objects ordered by descending mass — from a 10kg car bumper to a 2g bottle cap. Each specimen is accompanied by a formal catalogue entry, a future archaeological misreading, and a theoretical framework drawn from material culture studies, political economy, and environmental humanities.'
              },
              {
                heading: 'Critical Method',
                body: 'Archaeological fiction as method defamiliarises the everyday. By narrating familiar objects from an assumed future position of incomprehension, the archive makes visible the assumptions embedded in contemporary material culture: assumptions about value, waste, duration, and the relationship between objects and bodies.'
              },
              {
                heading: 'Theoretical Grounding',
                body: 'The archive draws on Thing Theory (Bill Brown), Actor-Network Theory (Bruno Latour), commodity fetishism (Karl Marx), slow violence (Rob Nixon), trans-corporeality (Stacy Alaimo), and the sociology of museums (Tony Bennett, Sharon Macdonald).'
              },
              {
                heading: 'Ethical Position',
                body: 'This exhibition does not celebrate plastic. It does not present environmental harm as aesthetic spectacle. It acknowledges the genuine utility of polymer materials in medicine, food preservation, and accessibility infrastructure, while refusing to allow that utility to function as a defence of systemic overproduction.'
              },
            ].map((card) => (
              <div key={card.heading} className="border border-[#E0EAF4] p-6">
                <div className="archive-label mb-2 text-[#1E3A5F]">{card.heading}</div>
                <p className="body-text text-[#2A3A4A] text-sm">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="section-divider my-10" />

          <div className="flex justify-center">
            <Link
              href="/archive"
              className="inline-flex items-center gap-3 bg-[#1E3A5F] text-[#F8FBFF] px-10 py-4 font-ibm-mono text-[0.7rem] tracking-[0.15em] uppercase hover:bg-[#2A4E7C] transition-colors duration-300"
            >
              <span>Enter the Object Archive</span>
              <span>→</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="border-t border-[#E0EAF4] py-10 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '12', label: 'Catalogued specimens' },
            { value: '1950–2060', label: 'Temporal range' },
            { value: '450 yrs', label: 'Avg. degradation half-life' },
            { value: '9%', label: 'Total plastic ever recycled' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-ibm-mono text-2xl font-light text-[#1E3A5F] mb-1">{stat.value}</div>
              <div className="archive-label text-[0.6rem]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
