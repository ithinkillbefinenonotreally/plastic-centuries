'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Info } from 'lucide-react';

interface AudioTrack {
  id: string;
  title: string;
  description: string;
  frequency: number;
  waveType: OscillatorType;
  duration: string;
  location: string;
}

const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'landfill',
    title: 'Landfill Ambient, Stratum 4',
    description: 'Low-frequency industrial hum recorded at municipal solid waste facility, 2019. Continuous mechanical processing. Wind across polymer surface.',
    frequency: 60,
    waveType: 'sawtooth',
    duration: '∞ loop',
    location: 'Municipal landfill, depth 4.1m stratum',
  },
  {
    id: 'ocean',
    title: 'North Pacific Gyre Surface Recording',
    description: 'Hydrophone recording: microplastic suspension in surface waters. Wave action against accumulated polymer debris. Classification: marine environment.',
    frequency: 180,
    waveType: 'sine',
    duration: '∞ loop',
    location: 'North Pacific Gyre, surface stratum',
  },
  {
    id: 'industrial',
    title: 'Injection Moulding Facility, Production',
    description: 'Factory floor ambient: rhythmic polymer injection cycles. Cooling fans. The sound of 500 billion PET bottles being produced annually, condensed.',
    frequency: 100,
    waveType: 'square',
    duration: '∞ loop',
    location: 'Industrial production facility, classified',
  },
];

const DEGRADATION_MODELS = [
  {
    id: 'photodegradation',
    title: 'Photodegradation Model — UV Fragmentation Sequence',
    period: '0 → 450 years',
    label: 'Computational Model — Not Empirical Photography',
    description: 'UV radiation initiates polymer chain cleavage. High-density polyethylene grocery bag specimen fragmentation modelled across 450-year exposure period. Terminal state: microplastic particles <5mm, entering biological systems.',
    stages: [
      { year: 0, label: 'Intact', opacity: 1.0 },
      { year: 50, label: 'Surface crazing', opacity: 0.85 },
      { year: 150, label: 'Visible fragmentation', opacity: 0.65 },
      { year: 250, label: 'Macro-to-micro transition', opacity: 0.40 },
      { year: 450, label: 'Dispersed microplastic', opacity: 0.15 },
    ]
  },
  {
    id: 'sedimentation',
    title: 'Sedimentation Accumulation Model — Coastal Stratum',
    period: '1950 → 2060',
    label: 'Computational Model — Stratigraphic Simulation',
    description: 'Estimated polymer accumulation in coastal sediment strata, modelled across the late industrial period. Density increases correspond to peaks in global plastic production. Stratigraphic layers form a legible material archive.',
    stages: [
      { year: 1950, label: 'Pre-industrial polymer strata', opacity: 0.05 },
      { year: 1970, label: 'Initial deposition layer', opacity: 0.20 },
      { year: 1990, label: 'Visible accumulation stratum', opacity: 0.45 },
      { year: 2010, label: 'Dense deposition layer', opacity: 0.70 },
      { year: 2060, label: 'Peak accumulation estimate', opacity: 1.0 },
    ]
  },
];

// Simple SVG-based ambient visualiser (avoids canvas issues)
function AmbientVisualiser({ isPlaying, trackId }: { isPlaying: boolean; trackId: string }) {
  const bars = 32;
  
  return (
    <div className="relative h-20 flex items-end justify-center gap-0.5 overflow-hidden" aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const baseHeight = 4 + Math.sin(i * 0.4) * 10;
        return (
          <motion.div
            key={i}
            className="bg-[#1E3A5F] rounded-t-sm"
            style={{ width: '2px', minHeight: '2px' }}
            animate={isPlaying ? {
              height: [
                `${baseHeight}px`,
                `${baseHeight + Math.random() * 30 + 5}px`,
                `${baseHeight + Math.random() * 15}px`,
                `${baseHeight}px`,
              ],
            } : { height: `${baseHeight}px` }}
            transition={{
              duration: 1.5 + Math.random() * 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.04,
            }}
          />
        );
      })}
    </div>
  );
}

function DegradationModel({ model }: { model: typeof DEGRADATION_MODELS[0] }) {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  return (
    <div className="border border-[#E0EAF4] p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="archive-label mb-1 text-[#1E3A5F]">{model.title}</div>
          <div className="font-ibm-mono text-[0.6rem] text-[#8FACC8]">{model.period}</div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#FFF8E8] border border-[#E8D89A] px-2.5 py-1.5">
          <Info size={10} className="text-[#8A7020]" />
          <span className="font-ibm-mono text-[0.55rem] text-[#8A7020] uppercase tracking-wider">{model.label}</span>
        </div>
      </div>

      <p className="body-text text-[#4A5A6A] text-[0.8rem] mb-6">{model.description}</p>

      {/* Degradation stages visual */}
      <div className="space-y-3">
        {model.stages.map((stage, i) => (
          <div
            key={i}
            className="flex items-center gap-4 group cursor-default"
            onMouseEnter={() => setHoveredStage(i)}
            onMouseLeave={() => setHoveredStage(null)}
          >
            <div className="archive-label w-14 text-right text-[0.6rem]">{stage.year}</div>
            <div className="flex-1 h-3 bg-[#F0F5FA] border border-[#E0EAF4] overflow-hidden">
              <motion.div
                className="h-full bg-[#1E3A5F]"
                initial={{ width: 0 }}
                whileInView={{ width: `${stage.opacity * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            </div>
            <div className="archive-label w-40 text-[0.6rem] text-[#8FACC8] group-hover:text-[#1E3A5F] transition-colors">
              {stage.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SensoryArchivePage() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [globalMuted, setGlobalMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode } | null>(null);

  const stopAudio = () => {
    if (nodesRef.current) {
      try {
        nodesRef.current.gain.gain.setTargetAtTime(0, audioCtxRef.current!.currentTime, 0.3);
        setTimeout(() => {
          nodesRef.current?.osc.stop();
          nodesRef.current = null;
        }, 400);
      } catch (e) {}
    }
  };

  const playTrack = (track: AudioTrack) => {
    if (activeTrack === track.id) {
      stopAudio();
      setActiveTrack(null);
      return;
    }

    stopAudio();

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = track.waveType;
      osc.frequency.setValueAtTime(track.frequency, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.Q.setValueAtTime(0.5, ctx.currentTime);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();

      gainNode.gain.setTargetAtTime(globalMuted ? 0 : 0.08, ctx.currentTime, 0.5);

      nodesRef.current = { osc, gain: gainNode };
      setActiveTrack(track.id);
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  };

  const toggleMute = () => {
    setGlobalMuted(prev => {
      if (nodesRef.current && audioCtxRef.current) {
        nodesRef.current.gain.gain.setTargetAtTime(
          prev ? 0.08 : 0,
          audioCtxRef.current.currentTime,
          0.2
        );
      }
      return !prev;
    });
  };

  useEffect(() => {
    return () => { stopAudio(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FBFF]">
      {/* Header */}
      <section className="pt-28 pb-16 px-8 border-b border-[#E0EAF4] bg-gradient-to-b from-[#EDF4FB] to-[#F8FBFF]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="catalogue-id mb-4">Sensory Archive — Atmospheric Evidence — Repository PC-2126-S</div>
            <h1 className="object-title text-4xl md:text-5xl text-[#1E3A5F] mb-4">
              Sensory Archive
            </h1>
            <div className="section-divider mb-6 max-w-md" />
            <p className="body-text text-[#4A5A6A] max-w-2xl text-sm">
              Archaeological recovery extends beyond the physical specimen. This section presents 
              atmospheric evidence: ambient audio environments, environmental visual documentation, 
              and computational degradation models. All visual models are algorithmically generated 
              and clearly identified as computational simulations, not empirical documentation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ambient Audio */}
      <section className="py-16 px-8 border-b border-[#E0EAF4]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="archive-label mb-1 text-[#1E3A5F]">Section I</div>
                <h2 className="object-title text-2xl text-[#1E3A5F]">Ambient Sound Environments</h2>
              </div>
              <button
                onClick={toggleMute}
                className="flex items-center gap-2 border border-[#C4D9EE] px-4 py-2 text-[#8FACC8] hover:text-[#1E3A5F] hover:border-[#1E3A5F] transition-colors"
                aria-label={globalMuted ? 'Unmute audio' : 'Mute audio'}
              >
                {globalMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span className="archive-label text-[0.6rem]">{globalMuted ? 'Muted' : 'Active'}</span>
              </button>
            </div>

            <p className="body-text text-[#4A5A6A] text-sm mb-8 max-w-xl">
              Synthesised ambient environments derived from field recordings. Select a track to 
              activate low-volume atmospheric audio. Tracks are generative approximations; 
              not original field recordings.
            </p>

            <div className="space-y-4">
              {AUDIO_TRACKS.map((track) => {
                const isActive = activeTrack === track.id;
                return (
                  <motion.div
                    key={track.id}
                    className={`border p-6 transition-colors duration-300 ${
                      isActive
                        ? 'border-[#1E3A5F] bg-[#EDF4FB]'
                        : 'border-[#E0EAF4] hover:border-[#C4D9EE]'
                    }`}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            onClick={() => playTrack(track)}
                            className={`w-8 h-8 flex items-center justify-center border transition-colors ${
                              isActive
                                ? 'border-[#1E3A5F] bg-[#1E3A5F] text-white'
                                : 'border-[#C4D9EE] text-[#8FACC8] hover:border-[#1E3A5F] hover:text-[#1E3A5F]'
                            }`}
                            aria-label={isActive ? `Pause ${track.title}` : `Play ${track.title}`}
                          >
                            {isActive ? <Pause size={12} /> : <Play size={12} />}
                          </button>
                          <div className="archive-label text-[#1E3A5F]">{track.title}</div>
                        </div>
                        <p className="body-text text-[#4A5A6A] text-[0.8rem] mb-2">{track.description}</p>
                        <div className="catalogue-id text-[0.55rem]">{track.location} — {track.duration}</div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-[#DCEEFF]"
                        >
                          <AmbientVisualiser isPlaying={isActive && !globalMuted} trackId={track.id} />
                          <div className="archive-label text-[0.55rem] text-center mt-1 opacity-40">
                            Waveform visualisation — {track.waveType} oscillator at {track.frequency}Hz
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual environments */}
      <section className="py-16 px-8 border-b border-[#E0EAF4]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="archive-label mb-1 text-[#1E3A5F]">Section II</div>
            <h2 className="object-title text-2xl text-[#1E3A5F] mb-6">Environmental Visuals</h2>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Landfill Horizon', subtitle: 'Stratum documentation, depth 6m', hue: '210, 40%, 80%' },
                { title: 'Pacific Gyre Surface', subtitle: 'Microplastic suspension, marine stratum', hue: '200, 50%, 75%' },
                { title: 'Production Facility', subtitle: 'Industrial polymer production, 2019', hue: '220, 35%, 70%' },
              ].map((env, i) => (
                <div key={i} className="border border-[#E0EAF4] overflow-hidden">
                  {/* Procedural visual */}
                  <div
                    className="h-40 relative overflow-hidden"
                    style={{
                      background: `hsl(${env.hue})`,
                    }}
                    aria-label={`Muted environmental visualisation: ${env.title}`}
                  >
                    {/* Procedural texture */}
                    <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden="true">
                      {Array.from({ length: 30 }).map((_, j) => (
                        <circle
                          key={j}
                          cx={`${(j * 37) % 100}%`}
                          cy={`${(j * 53) % 100}%`}
                          r={`${1 + (j % 5) * 0.8}%`}
                          fill="none"
                          stroke={`hsl(210, 50%, ${30 + (j % 4) * 10}%)`}
                          strokeWidth="0.5"
                          opacity={0.3 + (j % 3) * 0.2}
                        />
                      ))}
                    </svg>
                    {/* Grayscale tint */}
                    <div className="absolute inset-0 bg-[#DCEEFF] opacity-40" />
                    <div className="absolute bottom-2 left-3">
                      <span className="font-ibm-mono text-[0.55rem] text-[#1E3A5F] opacity-60 uppercase tracking-wider">
                        Computational render
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="archive-label text-[#1E3A5F] mb-0.5">{env.title}</div>
                    <div className="font-ibm-mono text-[0.58rem] text-[#8FACC8]">{env.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border border-[#E8D89A] bg-[#FFF8E8] px-4 py-3">
              <Info size={12} className="text-[#8A7020] flex-shrink-0" />
              <p className="font-ibm-mono text-[0.62rem] text-[#8A7020] leading-relaxed">
                All visual representations in this section are procedurally generated computational 
                models. They are not photographs, archival footage, or empirical environmental documentation. 
                They function as atmospheric context within the speculative framework of this exhibition.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Degradation models */}
      <section className="py-16 px-8 border-b border-[#E0EAF4]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="archive-label mb-1 text-[#1E3A5F]">Section III</div>
            <h2 className="object-title text-2xl text-[#1E3A5F] mb-6">
              Degradation Modelling
            </h2>
            <p className="body-text text-[#4A5A6A] text-sm mb-8 max-w-xl">
              Computational simulations of polymer degradation across geological time scales. 
              Models are based on laboratory photodegradation studies and do not represent 
              direct observation. All timescales are estimates derived from current material science.
            </p>

            {DEGRADATION_MODELS.map((model) => (
              <DegradationModel key={model.id} model={model} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Navigation to next section */}
      <section className="py-20 px-8 bg-gradient-to-b from-[#F8FBFF] to-[#EDF4FB]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="catalogue-id mb-6 opacity-60">Sensory Archive complete</div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#C4D9EE] to-transparent mx-auto mb-8" />
            <h2 className="object-title text-2xl text-[#1E3A5F] mb-4">
              Curatorial Ethics
            </h2>
            <p className="body-text text-[#4A5A6A] text-sm mb-8 max-w-md mx-auto">
              An examination of the ethical responsibilities of this exhibition: archaeological fiction as method, 
              the risk of aestheticisation, and acknowledgement of plastic&apos;s legitimate utility.
            </p>
            <Link
              href="/ethics"
              className="inline-flex items-center gap-3 border border-[#1E3A5F] text-[#1E3A5F] px-8 py-3.5 font-ibm-mono text-[0.7rem] tracking-[0.15em] uppercase hover:bg-[#1E3A5F] hover:text-white transition-all duration-300"
            >
              Read Curatorial Ethics →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
