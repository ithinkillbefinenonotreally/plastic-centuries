'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ArtifactSVGProps {
  type: string;
  name: string;
  colorCode: string;
  catalogueId: string;
}

// SVG paths for each artifact type - clinical, rendered as technical drawings
const ARTIFACTS: Record<string, {
  viewBox: string;
  artifact: string;
  context: string;
  contextLabel: string;
}> = {
  bumper: {
    viewBox: '0 0 300 200',
    artifact: `
      <g>
        <rect x="30" y="75" width="240" height="50" rx="25" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="60" y="82" width="180" height="36" rx="18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <line x1="30" y1="100" x2="270" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <circle cx="60" cy="100" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="240" cy="100" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="100" y1="78" x2="100" y2="122" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="150" y1="78" x2="150" y2="122" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="200" y1="78" x2="200" y2="122" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      </g>`,
    context: `
      <g opacity="0.6">
        <ellipse cx="150" cy="130" rx="100" ry="15" fill="none" stroke="currentColor" strokeWidth="1"/>
        <line x1="50" y1="75" x2="50" y2="20" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="250" y1="75" x2="250" y2="20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M50,20 Q150,5 250,20" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="60" cy="130" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="240" cy="130" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="60" cy="130" r="12" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="240" cy="130" r="12" fill="none" stroke="currentColor" strokeWidth="1"/>
      </g>`,
    contextLabel: 'Automobile, frontal view'
  },
  chair: {
    viewBox: '0 0 200 260',
    artifact: `
      <g>
        <rect x="40" y="30" width="120" height="90" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="43" y="120" width="114" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="50" y1="132" x2="45" y2="220" stroke="currentColor" strokeWidth="2"/>
        <line x1="150" y1="132" x2="155" y2="220" stroke="currentColor" strokeWidth="2"/>
        <line x1="65" y1="132" x2="60" y2="220" stroke="currentColor" strokeWidth="2"/>
        <line x1="135" y1="132" x2="140" y2="220" stroke="currentColor" strokeWidth="2"/>
        <line x1="40" y1="60" x2="160" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="40" y1="90" x2="160" y2="90" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <path d="M40,30 L40,10 L160,10 L160,30" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      </g>`,
    context: `
      <g opacity="0.5">
        <ellipse cx="100" cy="215" rx="70" ry="8" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <path d="M30,150 Q30,135 40,132" fill="none" stroke="currentColor" strokeWidth="1"/>
        <path d="M170,150 Q170,135 160,132" fill="none" stroke="currentColor" strokeWidth="1"/>
        <rect x="25" y="150" width="12" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
        <rect x="163" y="150" width="12" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
      </g>`,
    contextLabel: 'Outdoor gathering, mass use context'
  },
  bottle: {
    viewBox: '0 0 120 280',
    artifact: `
      <g>
        <rect x="45" y="10" width="30" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M45,30 Q35,45 32,65 L32,240 Q32,260 60,260 Q88,260 88,240 L88,65 Q85,45 75,30" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="32" y1="80" x2="88" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="32" y1="120" x2="88" y2="120" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="32" y1="160" x2="88" y2="160" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="32" y1="200" x2="88" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <rect x="48" y="10" width="24" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1"/>
      </g>`,
    context: `
      <g opacity="0.45">
        <path d="M60,260 L60,290" stroke="currentColor" strokeWidth="1"/>
        <rect x="20" y="290" width="80" height="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <path d="M25,80 Q10,90 8,100 Q6,110 12,115 Q18,120 25,118" fill="none" stroke="currentColor" strokeWidth="1"/>
      </g>`,
    contextLabel: 'Retail distribution, consumer context'
  },
  'phone-case': {
    viewBox: '0 0 140 240',
    artifact: `
      <g>
        <rect x="20" y="15" width="100" height="210" rx="18" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="28" y="25" width="84" height="190" rx="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <circle cx="70" cy="210" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="20" y1="60" x2="14" y2="60" stroke="currentColor" strokeWidth="2"/>
        <line x1="20" y1="80" x2="14" y2="80" stroke="currentColor" strokeWidth="2"/>
        <line x1="120" y1="70" x2="126" y2="70" stroke="currentColor" strokeWidth="2"/>
        <rect x="45" y="28" width="50" height="6" rx="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      </g>`,
    context: `
      <g opacity="0.45">
        <path d="M28,90 L30,88 L32,90 L34,88 L36,90" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="32" y="120" width="76" height="55" rx="4" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <line x1="40" y1="133" x2="100" y2="133" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="40" y1="143" x2="90" y2="143" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="40" y1="153" x2="95" y2="153" stroke="currentColor" strokeWidth="0.5"/>
      </g>`,
    contextLabel: 'Digital device, active use context'
  },
  bin: {
    viewBox: '0 0 160 220',
    artifact: `
      <g>
        <path d="M30,40 L130,40 L120,200 Q118,210 80,210 Q42,210 40,200 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="20" y="30" width="120" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="30" y1="40" x2="130" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="35" y1="80" x2="125" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="38" y1="120" x2="122" y2="120" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="40" y1="160" x2="120" y2="160" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <path d="M55,18 L65,30" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M80,15 L80,30" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M105,18 L95,30" stroke="currentColor" strokeWidth="1.5"/>
      </g>`,
    context: `
      <g opacity="0.4">
        <ellipse cx="80" cy="208" rx="45" ry="6" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <path d="M60,80 Q55,75 52,80" stroke="currentColor" strokeWidth="0.8" fill="none"/>
        <path d="M90,90 Q92,85 96,90" stroke="currentColor" strokeWidth="0.8" fill="none"/>
        <path d="M70,110 Q68,106 72,110" stroke="currentColor" strokeWidth="0.8" fill="none"/>
      </g>`,
    contextLabel: 'Domestic interior, waste management'
  },
  pipe: {
    viewBox: '0 0 300 100',
    artifact: `
      <g>
        <ellipse cx="30" cy="50" rx="20" ry="28" fill="none" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="270" cy="50" rx="20" ry="28" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="30" y1="22" x2="270" y2="22" stroke="currentColor" strokeWidth="2"/>
        <line x1="30" y1="78" x2="270" y2="78" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="30" cy="50" rx="12" ry="18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <line x1="70" y1="22" x2="70" y2="78" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="130" y1="22" x2="130" y2="78" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="190" y1="22" x2="190" y2="78" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="230" y1="22" x2="230" y2="78" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      </g>`,
    context: `
      <g opacity="0.45">
        <path d="M270,50 L290,50 L290,10 L270,10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M30,50 L10,50 L10,90 L30,90" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <text x="85" y="95" fontSize="8" fill="currentColor" opacity="0.6" fontFamily="monospace">SUB-FLOOR INFRASTRUCTURE LAYER</text>
      </g>`,
    contextLabel: 'Subterranean distribution network'
  },
  diaper: {
    viewBox: '0 0 220 200',
    artifact: `
      <g>
        <path d="M30,60 Q30,30 110,30 Q190,30 190,60 L190,140 Q190,170 110,170 Q30,170 30,140 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M60,60 Q60,50 110,50 Q160,50 160,60 L160,140 Q160,150 110,150 Q60,150 60,140 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <circle cx="48" cy="78" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="172" cy="78" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="48" cy="122" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="172" cy="122" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="60" y1="100" x2="160" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
      </g>`,
    context: `
      <g opacity="0.35">
        <ellipse cx="110" cy="100" rx="35" ry="25" fill="none" stroke="currentColor" strokeWidth="1"/>
        <path d="M60,55 Q40,40 45,30 Q50,20 65,25" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <path d="M160,55 Q180,40 175,30 Q170,20 155,25" fill="none" stroke="currentColor" strokeWidth="0.8"/>
      </g>`,
    contextLabel: 'Neonatal hygiene, domestic context'
  },
  cup: {
    viewBox: '0 0 120 160',
    artifact: `
      <g>
        <path d="M25,20 L95,20 L85,140 Q83,152 60,152 Q37,152 35,140 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="60" cy="20" rx="35" ry="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="28" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="32" y1="80" x2="88" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="35" y1="110" x2="85" y2="110" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <ellipse cx="60" cy="18" rx="28" ry="5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <line x1="40" y1="12" x2="40" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
        <line x1="80" y1="12" x2="80" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
      </g>`,
    context: `
      <g opacity="0.4">
        <path d="M5,20 L22,20" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5,30 L22,30" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5,25 Q0,25 0,30" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <text x="8" y="50" fontSize="7" fill="currentColor" opacity="0.5" fontFamily="monospace">FOIL SEAL</text>
      </g>`,
    contextLabel: 'Retail dairy product, sealed unit'
  },
  bag: {
    viewBox: '0 0 140 180',
    artifact: `
      <g>
        <path d="M40,60 Q40,40 70,40 Q100,40 100,60 L105,155 Q105,165 70,165 Q35,165 35,155 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M50,60 Q50,48 70,48 Q90,48 90,60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <path d="M40,60 Q30,20 28,8 M100,60 Q110,20 112,8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M28,8 Q28,2 35,2 Q42,2 42,8 Q42,14 35,14 Q28,14 28,8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M98,8 Q98,2 105,2 Q112,2 112,8 Q112,14 105,14 Q98,14 98,8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="35" y1="80" x2="105" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="35" y1="110" x2="105" y2="110" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="35" y1="140" x2="105" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      </g>`,
    context: `
      <g opacity="0.4">
        <rect x="48" y="75" width="44" height="35" rx="2" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <line x1="52" y1="85" x2="88" y2="85" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="52" y1="92" x2="80" y2="92" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="52" y1="99" x2="84" y2="99" stroke="currentColor" strokeWidth="0.5"/>
      </g>`,
    contextLabel: 'Retail checkout, single-use carrier'
  },
  toothbrush: {
    viewBox: '0 0 80 260',
    artifact: `
      <g>
        <rect x="28" y="170" width="24" height="80" rx="12" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="32" y="10" width="16" height="165" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="32" y1="30" x2="48" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="32" y1="40" x2="48" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="32" y1="50" x2="48" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="32" y1="60" x2="48" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="32" y1="70" x2="48" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="32" y1="80" x2="48" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="32" y1="90" x2="48" y2="90" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <rect x="34" y="162" width="12" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      </g>`,
    context: `
      <g opacity="0.4">
        <path d="M18,40 Q8,50 8,65 Q8,80 18,85" fill="none" stroke="currentColor" strokeWidth="1"/>
        <path d="M62,40 Q72,50 72,65 Q72,80 62,85" fill="none" stroke="currentColor" strokeWidth="1"/>
        <text x="5" y="100" fontSize="6" fill="currentColor" fontFamily="monospace" opacity="0.5">BRISTLE</text>
        <text x="5" y="108" fontSize="6" fill="currentColor" fontFamily="monospace" opacity="0.5">ARRAY</text>
      </g>`,
    contextLabel: 'Bathroom hygiene, daily use ritual'
  },
  straw: {
    viewBox: '0 0 60 280',
    artifact: `
      <g>
        <rect x="20" y="10" width="20" height="260" rx="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="30" cy="10" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="30" cy="270" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="20" y1="60" x2="40" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="20" y1="110" x2="40" y2="110" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="20" y1="160" x2="40" y2="160" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="20" y1="210" x2="40" y2="210" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
      </g>`,
    context: `
      <g opacity="0.4">
        <path d="M30,10 Q30,0 30,0" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="30" cy="5" rx="12" ry="6" fill="none" stroke="currentColor" strokeWidth="1"/>
        <path d="M18,3 Q10,0 6,5 Q2,10 5,15" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <text x="2" y="25" fontSize="5.5" fill="currentColor" fontFamily="monospace" opacity="0.6">BEVERAGE</text>
        <text x="2" y="32" fontSize="5.5" fill="currentColor" fontFamily="monospace" opacity="0.6">VESSEL</text>
      </g>`,
    contextLabel: 'Fast food service, liquid conveyance'
  },
  cap: {
    viewBox: '0 0 120 80',
    artifact: `
      <g>
        <ellipse cx="60" cy="30" rx="45" ry="25" fill="none" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="60" cy="55" rx="45" ry="8" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="15" y1="30" x2="15" y2="55" stroke="currentColor" strokeWidth="2"/>
        <line x1="105" y1="30" x2="105" y2="55" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="60" cy="30" rx="38" ry="18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <line x1="30" y1="22" x2="25" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="50" y1="12" x2="48" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="70" y1="12" x2="72" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <line x1="90" y1="22" x2="95" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      </g>`,
    context: `
      <g opacity="0.45">
        <path d="M60,55 L60,65" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="60" cy="66" rx="32" ry="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M28,66 L28,75" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M92,66 L92,75" stroke="currentColor" strokeWidth="1.5"/>
        <text x="30" y="72" fontSize="7" fill="currentColor" fontFamily="monospace" opacity="0.5">PET VESSEL</text>
      </g>`,
    contextLabel: 'Beverage closure, sealing mechanism'
  },
};

export default function ArtifactSVG({ type, name, colorCode, catalogueId }: ArtifactSVGProps) {
  const [hovered, setHovered] = useState(false);
  const artifact = ARTIFACTS[type] || ARTIFACTS['cap'];

  return (
    <div
      className="relative w-full h-full flex items-center justify-center group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Technical drawing of ${name}. ${hovered ? artifact.contextLabel : 'Hover to view contextual usage.'}`}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30,58,95,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,58,95,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Crosshair registration marks */}
      <div className="absolute top-4 left-4 w-6 h-6 opacity-20">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#1E3A5F]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1E3A5F]" />
      </div>
      <div className="absolute top-4 right-4 w-6 h-6 opacity-20">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#1E3A5F]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1E3A5F]" />
      </div>
      <div className="absolute bottom-4 left-4 w-6 h-6 opacity-20">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#1E3A5F]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1E3A5F]" />
      </div>
      <div className="absolute bottom-4 right-4 w-6 h-6 opacity-20">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#1E3A5F]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1E3A5F]" />
      </div>

      {/* Catalogue ID overlay */}
      <div className="absolute top-4 left-8 catalogue-id opacity-40 text-[0.55rem]">
        {catalogueId}
      </div>

      {/* Main SVG */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: hovered ? 1.03 : 1,
          filter: hovered
            ? 'drop-shadow(0 4px 20px rgba(30,58,95,0.15))'
            : 'drop-shadow(0 0 0 rgba(0,0,0,0))',
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <svg
          viewBox={artifact.viewBox}
          className="w-full h-full max-w-[280px] max-h-[280px]"
          style={{ color: '#1E3A5F' }}
          aria-hidden="true"
        >
          {/* Artifact layer - always visible */}
          <g
            dangerouslySetInnerHTML={{ __html: artifact.artifact }}
            style={{
              opacity: hovered ? 0.35 : 1,
              transition: 'opacity 0.6s ease',
            }}
          />
          {/* Context layer - revealed on hover */}
          <g
            dangerouslySetInnerHTML={{ __html: artifact.context }}
            style={{
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          />
        </svg>
      </motion.div>

      {/* Hover label */}
      <motion.div
        className="absolute bottom-4 left-0 right-0 text-center"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.3 }}
      >
        <span className="catalogue-id text-[0.55rem] text-[#1E3A5F]">
          {artifact.contextLabel}
        </span>
      </motion.div>

      {/* Hover instruction */}
      <motion.div
        className="absolute bottom-4 left-0 right-0 text-center"
        animate={{ opacity: hovered ? 0 : 0.5, y: hovered ? 4 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="catalogue-id text-[0.5rem]">
          Hover: reveal context →
        </span>
      </motion.div>
    </div>
  );
}
