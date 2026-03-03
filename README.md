# Plastic Centuries: An Archaeological Archive (2126)

A virtual exhibition website presenting twelve polymer objects as future archaeological specimens. The interface functions as a digital natural history museum — clinical, archival, and analytical.

## Overview

This exhibition narrates familiar plastic objects from the perspective of archaeologists in 2126. Twelve specimens are presented with formal catalogue entries, misreadings, and theoretical frameworks drawn from material culture studies, political economy, and environmental humanities.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Typography**: IBM Plex Sans, IBM Plex Mono, IBM Plex Serif (Google Fonts)
- **Language**: TypeScript

## Project Structure

```
plastic-centuries/
├── app/
│   ├── globals.css          # Base styles, typography, animations
│   ├── layout.tsx           # Root layout with Navigation + PlasticBackground
│   ├── page.tsx             # Landing page (Introduction)
│   ├── archive/
│   │   └── page.tsx         # Object Gallery (12 specimens)
│   ├── sensory/
│   │   └── page.tsx         # Sensory Archive (audio/visual/models)
│   └── ethics/
│       └── page.tsx         # Curatorial Ethics
├── components/
│   ├── Navigation.tsx       # Sticky minimal navigation bar
│   ├── PlasticBackground.tsx # Scrolling plastic silhouette accumulation
│   ├── ObjectCard.tsx       # Core exhibition unit (hover interactions)
│   ├── ArtifactSVG.tsx      # Technical drawing SVGs per object
│   └── ReducedMotionProvider.tsx # Accessibility motion toggle
├── data/
│   └── objects.json         # Full metadata for all 12 specimens
├── public/
│   └── assets/              # Images, audio (add your own)
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Local Development

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/plastic-centuries.git
cd plastic-centuries

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deployment on Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration (Recommended)

1. Push your repository to GitHub
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click **"New Project"**
4. Import your GitHub repository
5. Vercel auto-detects Next.js — no configuration needed
6. Click **"Deploy"**

Your site will be live at `https://plastic-centuries.vercel.app` (or custom domain).

### Environment Variables

No environment variables are required for the base installation.

## Exhibition Pages

| Page | Route | Description |
|------|-------|-------------|
| Introduction | `/` | Full-screen hero with project context |
| Object Archive | `/archive` | 12 specimens with hover interactions |
| Sensory Archive | `/sensory` | Ambient audio, visual environments, degradation models |
| Curatorial Ethics | `/ethics` | Methodological and ethical framing |

## Interaction Design

### Object Cards (Archive)
- **Image panel hover**: Technical drawing transitions to contextual usage view
- **Text panel hover/focus**: Expands from brief metadata to full curatorial interpretation
- Each object includes: material data, archaeological misreading, theoretical framework, systemic context

### Plastic Background
- Faint polymer silhouettes (bags, bottles, caps, straws) accumulate as user scrolls
- Opacity and density increase with scroll depth
- Disabled when reduced motion is active

### Accessibility Features
- **Reduced motion toggle** in navigation (also respects `prefers-reduced-motion` OS setting)
- **Keyboard navigation** fully supported — hover states triggered by focus
- **ARIA labels** on all interactive elements and complex visuals
- **High contrast** text throughout (WCAG AA compliant)
- **Skip links** via semantic heading structure

## Customisation

### Adding Objects
Edit `data/objects.json`. Required fields:
```json
{
  "id": 13,
  "catalogueId": "PC-2126-013",
  "name": "Full scientific name",
  "commonName": "Common name",
  "material": "Polymer type",
  "massKg": 0.05,
  "dimensions": "measurement",
  "estimatedProductionYear": "year range",
  "degradationHalfLife": "X years",
  "recoveryContext": "where found",
  "artifactSVG": "key matching ArtifactSVG.tsx",
  "shortDescription": "3–4 sentence summary",
  "archaeologicalMisreading": "Future misinterpretation",
  "theoreticalConnection": "Academic theory application",
  "systemicContext": "Production/waste context",
  "colorCode": "#HEX"
}
```

### Adding Artifact SVGs
In `components/ArtifactSVG.tsx`, add entries to the `ARTIFACTS` object with:
- `viewBox`: SVG coordinate space
- `artifact`: SVG path strings for the decontextualised specimen
- `context`: SVG path strings for the contextual reveal on hover
- `contextLabel`: Descriptive text for screen readers

### Colour Scheme
Edit CSS variables in `app/globals.css` or Tailwind config in `tailwind.config.js`:
```css
--color-clinical-white: #F8FBFF;
--color-archival-blue: #DCEEFF;
--color-research-blue: #1E3A5F;
--color-deep-slate: #1A1A1A;
```

## Performance Notes

- Plastic background uses SVG (not canvas) for accessibility and performance
- Framer Motion is used for entrance animations and hover states only
- No video assets required — all visuals are procedural/SVG
- Audio uses Web Audio API (synthesised, no audio file downloads)
- Lazy loading via Framer Motion's `whileInView` with `once: true`

## Browser Support

- Chrome / Edge 90+
- Firefox 88+
- Safari 15+
- Mobile: iOS Safari 15+, Chrome Android 90+

Web Audio API is available in all modern browsers. A graceful fallback message is shown if unavailable.

## Credits & Theoretical Framework

This exhibition draws on:
- Bill Brown — Thing Theory
- Bruno Latour — Actor-Network Theory  
- Tony Bennett — The Birth of the Museum
- Sharon Macdonald — Theorising Museums
- Rob Nixon — Slow Violence
- Donna Haraway — Staying with the Trouble
- Tim Ingold — Materials against materiality
- Roland Barthes — Mythologies
- Zygmunt Bauman — Liquid Modernity

## Licence

MIT — free for educational, curatorial, and research use. 
Please retain attribution if adapting for exhibition use.
