'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ObjectCard from '@/components/ObjectCard';
import objects from '@/data/objects.json';

export default function ArchivePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8FBFF]">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-40 bg-[#E0EAF4]" aria-hidden="true">
        <motion.div
          className="h-full bg-[#1E3A5F]"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Archive header */}
      <section className="pt-28 pb-16 px-8 border-b border-[#E0EAF4]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="catalogue-id mb-4">
              Archive — Repository PC-2126 — 12 Specimens — Ordered by Descending Mass
            </div>
            <h1 className="object-title text-4xl md:text-5xl text-[#1E3A5F] mb-4">
              Object Archive
            </h1>
            <div className="section-divider mb-6 max-w-md" />
            <p className="body-text text-[#4A5A6A] max-w-2xl text-sm">
              Twelve polymer objects recovered from the stratigraphic record of late industrial 
              civilisation (c.1950–2060). Each specimen is presented as excavated artefact. 
              Hover over the image panel to reveal contextual usage. Hover over the text panel 
              to expand the full curatorial interpretation.
            </p>
          </motion.div>

          {/* Quick nav */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {objects.map((obj, i) => (
              <a
                key={obj.id}
                href={`#object-${obj.id}`}
                className="font-ibm-mono text-[0.6rem] tracking-wider px-3 py-1.5 border border-[#E0EAF4] text-[#8FACC8] hover:text-[#1E3A5F] hover:border-[#1E3A5F] transition-all duration-200 uppercase"
              >
                {String(i + 1).padStart(2, '0')} {obj.commonName}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Object cards */}
      <div>
        {objects.map((object, index) => (
          <ObjectCard key={object.id} object={object as any} index={index} />
        ))}
      </div>

      {/* Post-gallery transition */}
      <section className="py-32 px-8 bg-gradient-to-b from-[#F8FBFF] to-[#EDF4FB] border-t border-[#E0EAF4]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="catalogue-id mb-6 opacity-60">
              Archive complete — 12 of 12 specimens catalogued
            </div>

            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C4D9EE] to-transparent mx-auto mb-8" />

            <h2 className="object-title text-3xl md:text-4xl text-[#1E3A5F] mb-6">
              The Sensory Record
            </h2>

            <p className="body-text text-[#4A5A6A] mb-10 max-w-lg mx-auto">
              Beyond the object catalogue lies the atmospheric evidence: ambient recordings, 
              environmental visuals, and computational models of plastic degradation across 
              geological time. Proceed to the Sensory Archive.
            </p>

            <Link
              href="/sensory"
              className="inline-flex items-center gap-3 bg-[#1E3A5F] text-[#F8FBFF] px-10 py-4 font-ibm-mono text-[0.7rem] tracking-[0.15em] uppercase hover:bg-[#2A4E7C] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E3A5F]"
            >
              <span>Enter the Sensory Archive</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >→</motion.span>
            </Link>

            <div className="mt-8 flex gap-6 justify-center">
              <Link
                href="/ethics"
                className="archive-label text-[0.65rem] text-[#8FACC8] hover:text-[#1E3A5F] transition-colors"
              >
                Curatorial Ethics →
              </Link>
              <Link
                href="/"
                className="archive-label text-[0.65rem] text-[#8FACC8] hover:text-[#1E3A5F] transition-colors"
              >
                ← Return to Introduction
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
