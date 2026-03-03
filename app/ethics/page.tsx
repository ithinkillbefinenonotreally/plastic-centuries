'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const sections = [
  {
    id: 'method',
    number: 'I',
    title: 'Archaeological Fiction as Method',
    subsections: [
      {
        heading: 'Theoretical Basis',
        body: `Archaeological fiction — narrating present-day objects as if recovered by future archaeologists — is a defamiliarisation strategy borrowed from speculative fiction and applied to critical material culture studies. It draws on the methodological traditions of Michael Shanks and Christopher Tilley's post-processual archaeology, which insists that interpretation is never neutral and that the meanings attributed to objects are produced by the interpretive frameworks of the analysts, not inherent in the objects themselves.

By adopting the posture of a future archaeological institution, this exhibition makes explicit what is always implicitly true of museum practice: that the museum is a meaning-making apparatus, not a neutral repository. The choice of what to collect, how to classify, and what narrative to construct around an object is an institutional act with political consequences.`,
      },
      {
        heading: 'The Productive Incomprehension of the Future Archaeologist',
        body: `The misreadings presented in this archive — in which a car bumper becomes a threshold marker, a grocery bag becomes a votive offering — are deliberately implausible. Their implausibility is the point. They function as an estrangement device: by presenting clearly incorrect interpretations, they make visible the interpretive machinery that contemporary viewers apply automatically and unconsciously to the same objects.

We understand what a plastic straw is without thinking. The future archaeologist's incomprehension asks us to pause at that automatic understanding — to notice what assumptions it contains about convenience, consumption, single-use culture, and the subordination of ecological duration to momentary function.`,
      },
      {
        heading: 'Relationship to Museum Studies',
        body: `This approach is informed by Sharon Macdonald's analysis of how museums produce authoritative knowledge (Theorising Museums, 1996), and Tony Bennett's genealogy of the museum as a technology of civic normalisation (The Birth of the Museum, 1995). Both scholars identify the museum as a site where social values are naturalised through the organisation and display of objects. This exhibition attempts to make that process reflexively visible — to be a museum that comments on what museums do.`,
      },
    ],
  },
  {
    id: 'aesthetics',
    number: 'II',
    title: 'The Risk of Aestheticising Environmental Harm',
    subsections: [
      {
        heading: 'The Problem of Beauty',
        body: `Any exhibition that presents objects associated with environmental harm risks aestheticising that harm — making it beautiful, interesting, or pleasurable to contemplate. This risk is amplified when the exhibition employs formal design strategies: clean typography, elegant layouts, clinical restraint. The aesthetic quality of the presentation can produce a form of critical distance that functions not as an analytical tool but as an emotional insulation.

The clinical visual register of this archive was chosen deliberately and with awareness of this risk. The intent is to resist the sentimentalisation of environmental harm (which can produce paralysis or despair) without inadvertently producing its opposite: an aestheticised contemplation that transforms harm into spectacle.`,
      },
      {
        heading: 'Precedents and Cautions',
        body: `The Australian artist Chris Jordan's large-scale photographs of ocean plastic — while visually striking and politically motivated — have been criticised for producing what critics term 'eco-porn': imagery so aesthetically powerful that it substitutes emotional response for political analysis. The viewer feels something, but that feeling may be a substitute for action rather than a catalyst for it.

This archive attempts a different register: analytical rather than affective, systemic rather than spectacular. The objects are presented as specimens rather than images; the language is taxonomic rather than lyrical. Whether this strategy succeeds in avoiding aestheticisation while retaining critical force is a question the exhibition cannot answer for itself.`,
      },
      {
        heading: 'Rob Nixon and Slow Violence',
        body: `Rob Nixon's Slow Violence and the Environmentalism of the Poor (2011) argues that environmental harm is disproportionately characterised by gradual, spatially dispersed, temporally extended processes that resist the spectacular representation on which contemporary political attention depends. The half-millennium degradation timescales catalogued in this archive are a case in point: they operate far below the threshold of human attention and political response.

Any exhibition attempting to represent slow violence risks compressing it into a moment of aesthetic encounter that falsifies its temporal character. We acknowledge this falsification as structurally unavoidable, and attempt to mitigate it through explicitness about temporal scale in every object entry.`,
      },
    ],
  },
  {
    id: 'utility',
    number: 'III',
    title: 'Acknowledgement of Plastic\'s Legitimate Utility',
    subsections: [
      {
        heading: 'Medical Infrastructure',
        body: `Polymer materials are foundational to contemporary medical infrastructure. Single-use sterile medical equipment — syringes, IV bags, catheters, surgical gloves, implantable devices — has prevented enormous quantities of cross-infection and iatrogenic harm. The shift from reusable glass syringes to single-use polymer syringes in the latter half of the 20th century is directly associated with reductions in hepatitis B and HIV transmission in clinical settings.

An exhibition focused on the harms of single-use plastic must acknowledge that the single-use principle, in medical contexts, represents a genuine public health advance. The problem is not single-use as such; it is the application of the single-use principle to contexts where its ecological costs are not offset by equivalent social benefits.`,
      },
      {
        heading: 'Food Preservation and Food Security',
        body: `Polymer packaging has dramatically extended the shelf life of perishable food, reducing food waste and enabling global food distribution systems that have contributed to reductions in food insecurity in parts of the world without refrigeration infrastructure. PET bottles have made clean water accessible in regions with compromised municipal water systems.

These are not trivial benefits. An exhibition that presents plastic purely as environmental harm without acknowledging the food security, water access, and public health infrastructure it enables is engaged in a form of selective representation that distorts the complexity of the material world. Complexity is not an argument against environmental regulation; it is an argument for nuanced regulation that distinguishes between use cases.`,
      },
      {
        heading: 'Accessibility and Disability Infrastructure',
        body: `Polymer materials are integral to a range of assistive technologies and accessibility infrastructure: prosthetic limbs, wheelchair components, hearing aid casings, mobility aids, medical tubing. Single-use plastic straws, the object that became the symbolic centre of early plastic regulation campaigns, are an essential accessibility tool for people with certain physical disabilities for whom reusable alternatives are not functional.

The plastic straw bans implemented in numerous jurisdictions between 2018 and 2023 demonstrated that environmental policy conducted through the register of individual consumer choice can produce accessibility harms when it does not adequately consult affected communities. The politics of plastic are not simple, and this archive does not pretend otherwise.`,
      },
    ],
  },
  {
    id: 'institutional',
    number: 'IV',
    title: 'Institutional Framing',
    subsections: [
      {
        heading: 'Bennett\'s Exhibitionary Complex',
        body: `Tony Bennett's 'The Exhibitionary Complex' (1988) argues that the museum, as an institution, functions to produce citizen-subjects who have internalised the norms of civic order through exposure to organised, classified, and narrativised objects. The exhibition produces not only knowledge about the world but also a disposition toward the world: a way of seeing, categorising, and valuing.

This archive is aware of its own exhibitionary function. By adopting the formal vocabulary of natural history museum display — specimen labelling, systematic ordering, taxonomic classification — it participates in the very apparatus it attempts to analyse. This is not a paradox to be resolved; it is a condition of all critical museum practice.`,
      },
      {
        heading: 'Macdonald and the Museum as Knowledge Technology',
        body: `Sharon Macdonald's work on the science museum examines how exhibitions produce authoritative accounts of contested knowledge. Museums, she argues, naturalise particular understandings of the relationship between science, technology, and society by presenting them as objective, neutral, and inevitable.

This archive applies that analysis to environmental knowledge: the claim that plastic is ecologically harmful is not contested in the scientific literature, but the political and economic frameworks within which that harm should be understood and addressed are deeply contested. The exhibition takes positions on those frameworks through its theoretical apparatus — citing Marx, Latour, Nixon, Haraway — and acknowledges that those positions are positions, not neutral analytical descriptions.`,
      },
      {
        heading: 'On the Limits of the Digital Exhibition',
        body: `This exhibition is a digital interface. It is accessed through networked computing infrastructure that has its own significant environmental footprint. The rare earth minerals in the devices through which it is viewed, the energy consumption of the data centres through which it is served, the polymer components of keyboards, screens, and cables — these are not absent from the material world this exhibition discusses.

The digital exhibition cannot escape the material conditions of its own existence. What it can do is acknowledge them. This acknowledgement is itself insufficient. But insufficiency is not the same as meaninglessness, and partial analysis — analysis that knows its own limits — may be more honest than analysis that claims comprehensiveness.`,
      },
    ],
  },
];

export default function EthicsPage() {
  return (
    <div className="min-h-screen bg-[#F8FBFF]">
      {/* Header */}
      <section className="pt-28 pb-16 px-8 border-b border-[#E0EAF4]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="catalogue-id mb-4">
              Curatorial Ethics — Wall Text Archive — PC-2126-CRE
            </div>
            <h1 className="object-title text-4xl md:text-5xl text-[#1E3A5F] mb-4">
              Curatorial Ethics
            </h1>
            <div className="section-divider mb-6 max-w-md" />
            <p className="body-text text-[#4A5A6A] max-w-2xl text-sm">
              An account of the methodological and ethical commitments that underpin this exhibition. 
              Curatorial transparency is not optional in an exhibition that concerns itself with 
              the relationship between representation and power. These texts are intended to be read, 
              not to decorate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Table of contents */}
      <section className="py-10 px-8 border-b border-[#E0EAF4] bg-[#F0F7FF]">
        <div className="max-w-4xl mx-auto">
          <div className="archive-label mb-4 text-[#1E3A5F]">Contents</div>
          <div className="grid sm:grid-cols-2 gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-3 group"
              >
                <span className="font-ibm-mono text-[0.65rem] text-[#8FACC8] w-6">{s.number}.</span>
                <span className="body-text text-[0.85rem] text-[#2A3A4A] group-hover:text-[#1E3A5F] transition-colors border-b border-transparent group-hover:border-[#1E3A5F]">
                  {s.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <div className="py-8">
        {sections.map((section, si) => (
          <motion.section
            key={section.id}
            id={section.id}
            className="py-14 px-8 border-b border-[#E0EAF4]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="max-w-4xl mx-auto">
              {/* Section header */}
              <div className="flex items-start gap-6 mb-10">
                <div
                  className="font-ibm-mono text-[3rem] font-light leading-none text-[#1E3A5F] opacity-10 select-none"
                  aria-hidden="true"
                >
                  {section.number}
                </div>
                <div>
                  <div className="archive-label mb-1 opacity-60">Section {section.number}</div>
                  <h2 className="object-title text-2xl md:text-3xl text-[#1E3A5F]">
                    {section.title}
                  </h2>
                </div>
              </div>

              <div className="section-divider mb-10" />

              {/* Subsections */}
              <div className="space-y-10">
                {section.subsections.map((sub, i) => (
                  <div key={i} className="grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-3">
                      <div className="archive-label text-[#1E3A5F] mb-2 leading-relaxed">
                        {sub.heading}
                      </div>
                      <div className="w-6 h-px bg-[#C4D9EE]" />
                    </div>
                    <div className="md:col-span-9">
                      {sub.body.split('\n\n').map((para, j) => (
                        <p key={j} className="ethics-body text-[#2A3A4A] mb-5 last:mb-0">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* References */}
      <section className="py-14 px-8 border-b border-[#E0EAF4] bg-[#F0F7FF]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="archive-label mb-4 text-[#1E3A5F]">Key References</div>
            <div className="section-divider mb-6 max-w-xs" />
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Bennett, T. (1995). The Birth of the Museum. Routledge.',
                'Bennett, T. (1988). The Exhibitionary Complex. New Formations, 4, 73–102.',
                'Brown, B. (2001). Thing Theory. Critical Inquiry, 28(1), 1–22.',
                'Geyer, R., Jambeck, J.R., Law, K.L. (2017). Production, use, and fate of all plastics ever made. Science Advances, 3(7).',
                'Haraway, D. (2016). Staying with the Trouble. Duke University Press.',
                'Ingold, T. (2007). Materials against materiality. Archaeological Dialogues, 14(1), 1–16.',
                'Latour, B. (2005). Reassembling the Social. Oxford University Press.',
                'Macdonald, S. (Ed.) (1996). Theorising Museums. Blackwell.',
                'Marx, K. (1867). Capital, Vol. I. Lawrence & Wishart [trans. 1976].',
                'Nixon, R. (2011). Slow Violence and the Environmentalism of the Poor. Harvard University Press.',
                'Shanks, M. & Tilley, C. (1987). Social Theory and Archaeology. Polity.',
                'Strasser, S. (1999). Waste and Want: A Social History of Trash. Metropolitan Books.',
              ].map((ref) => (
                <p key={ref} className="font-ibm-mono text-[0.65rem] text-[#4A5A6A] leading-relaxed">
                  {ref}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer nav */}
      <section className="py-14 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="catalogue-id mb-1">Plastic Centuries — Archaeological Archive (2126)</div>
              <div className="archive-label text-[0.6rem] text-[#8FACC8]">
                Exhibition Catalogue — Repository PC-2126 — Curatorial Ethics Section
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/archive" className="archive-label text-[0.65rem] hover:text-[#1E3A5F] transition-colors">
                ← Object Archive
              </Link>
              <Link href="/sensory" className="archive-label text-[0.65rem] hover:text-[#1E3A5F] transition-colors">
                Sensory Archive →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
