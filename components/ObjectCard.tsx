'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ArtifactSVG from './ArtifactSVG';

interface ObjectData {
  id: number;
  catalogueId: string;
  name: string;
  commonName: string;
  material: string;
  massKg: number;
  dimensions: string;
  estimatedProductionYear: string;
  degradationHalfLife: string;
  recoveryContext: string;
  artifactSVG: string;
  shortDescription: string;
  archaeologicalMisreading: string;
  theoreticalConnection: string;
  systemicContext: string;
  colorCode: string;
}

interface ObjectCardProps {
  object: ObjectData;
  index: number;
}

export default function ObjectCard({ object, index }: ObjectCardProps) {
  const [panelHovered, setPanelHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-10%' });

  const metadataRows = [
    { label: 'Material', value: object.material },
    { label: 'Mass', value: `${object.massKg}kg` },
    { label: 'Dimensions', value: object.dimensions },
    { label: 'Production era', value: object.estimatedProductionYear },
    { label: 'Degradation half-life', value: object.degradationHalfLife },
    { label: 'Recovery context', value: object.recoveryContext },
  ];

  return (
    <motion.div
      ref={cardRef}
      className="object-card relative flex flex-col lg:flex-row overflow-hidden"
      style={{ minHeight: '100vh' }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      id={`object-${object.id}`}
    >
      {/* Left: Visual artifact panel */}
      <div className="lg:w-1/2 relative bg-gradient-to-br from-[#F8FBFF] to-[#EDF4FB] border-r border-[#E0EAF4] flex items-center justify-center"
        style={{ minHeight: '50vh' }}
      >
        {/* Index number - large background */}
        <div
          className="absolute top-8 right-8 font-ibm-mono text-[6rem] font-light leading-none select-none pointer-events-none"
          style={{ color: '#1E3A5F', opacity: 0.04 }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Artifact visualization */}
        <div className="w-full h-full flex items-center justify-center p-12 lg:p-16" style={{ minHeight: '400px' }}>
          <ArtifactSVG
            type={object.artifactSVG}
            name={object.commonName}
            colorCode={object.colorCode}
            catalogueId={object.catalogueId}
          />
        </div>

        {/* Bottom left: scan data */}
        <div className="absolute bottom-6 left-6 space-y-1">
          <div className="catalogue-id opacity-60">{object.catalogueId}</div>
          <div className="archive-label opacity-40">
            Specimen {String(index + 1).padStart(2, '0')} of 12
          </div>
        </div>
      </div>

      {/* Right: Metadata panel */}
      <motion.div
        className="lg:w-1/2 flex flex-col justify-center cursor-default"
        onMouseEnter={() => setPanelHovered(true)}
        onMouseLeave={() => setPanelHovered(false)}
        onFocus={() => setPanelHovered(true)}
        onBlur={() => setPanelHovered(false)}
        tabIndex={0}
        role="region"
        aria-label={`Metadata panel for ${object.commonName}. Hover or focus to expand full interpretation.`}
        style={{ minHeight: '50vh' }}
      >
        <div className="p-8 lg:p-14 xl:p-16 h-full flex flex-col justify-center">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="catalogue-id mb-3 opacity-60">{object.catalogueId}</div>
            <h2 className="object-title text-2xl lg:text-3xl xl:text-4xl text-[#1E3A5F] mb-1">
              {object.commonName}
            </h2>
            <p className="archive-label text-[0.65rem] text-[#8FACC8] mb-6">{object.name}</p>
          </motion.div>

          {/* Divider */}
          <div className="section-divider mb-6" />

          {/* Short description - always visible */}
          <motion.p
            className="body-text text-[#2A3A4A] mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {object.shortDescription}
          </motion.p>

          {/* Metadata table - always visible */}
          <motion.div
            className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {metadataRows.map((row) => (
              <div key={row.label} className="col-span-2 sm:col-span-1">
                <div className="archive-label mb-0.5">{row.label}</div>
                <div className="font-ibm text-[0.78rem] text-[#1E3A5F] font-medium leading-snug">
                  {row.value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="section-divider mb-6" />

          {/* Expanded panel - hover/focus to reveal */}
          <div
            className="overflow-hidden"
            style={{ transition: 'max-height 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease' }}
          >
            <motion.div
              animate={{
                height: panelHovered ? 'auto' : 0,
                opacity: panelHovered ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
              aria-hidden={!panelHovered}
            >
              <div className="space-y-5 pb-2">
                {/* Archaeological misreading */}
                <div>
                  <div className="archive-label mb-1.5 text-[#1E3A5F]">
                    Archaeological Misreading (c.2126)
                  </div>
                  <p className="body-text text-[#2A3A4A] text-[0.83rem]">
                    {object.archaeologicalMisreading}
                  </p>
                </div>

                {/* Theoretical connection */}
                <div>
                  <div className="archive-label mb-1.5 text-[#1E3A5F]">
                    Theoretical Framework
                  </div>
                  <p className="body-text text-[#2A3A4A] text-[0.83rem]">
                    {object.theoreticalConnection}
                  </p>
                </div>

                {/* Systemic context */}
                <div>
                  <div className="archive-label mb-1.5 text-[#1E3A5F]">
                    Systemic Context
                  </div>
                  <p className="body-text text-[#2A3A4A] text-[0.83rem]">
                    {object.systemicContext}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hover instruction */}
          <motion.div
            animate={{ opacity: panelHovered ? 0 : 0.5 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            <span className="archive-label text-[0.6rem] italic">
              Hover or focus to expand full curatorial interpretation →
            </span>
          </motion.div>

          <motion.div
            animate={{ opacity: panelHovered ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            <span className="archive-label text-[0.6rem] italic">
              ← Minimise panel
            </span>
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
}
