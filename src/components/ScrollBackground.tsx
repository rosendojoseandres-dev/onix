'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// =========================================
// CONFIGURATION
// =========================================

const ORBS = [
  {
    id: 'orb-a',
    size: 800,
    baseX: 10,
    baseY: 15,
    color: 'rgba(139, 92, 246, 0.22)',  // violet — stronger
    driftX: 20,
    driftY: -28,
    blur: 100,
    delay: 0,
  },
  {
    id: 'orb-b',
    size: 650,
    baseX: 70,
    baseY: 35,
    color: 'rgba(59, 130, 246, 0.18)',  // blue
    driftX: -25,
    driftY: 32,
    blur: 90,
    delay: 0.1,
  },
  {
    id: 'orb-c',
    size: 500,
    baseX: 38,
    baseY: 65,
    color: 'rgba(16, 185, 129, 0.16)',  // emerald
    driftX: 18,
    driftY: -20,
    blur: 95,
    delay: 0.2,
  },
  {
    id: 'orb-d',
    size: 600,
    baseX: 82,
    baseY: 5,
    color: 'rgba(99, 102, 241, 0.15)',  // indigo
    driftX: -12,
    driftY: 22,
    blur: 110,
    delay: 0.15,
  },
];

// Particle seeds — fixed so SSR/hydration matches
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: ((i * 37 + 11) % 97),
  y: ((i * 53 + 7) % 91),
  size: 1 + (i % 3),
  opacity: 0.04 + (i % 4) * 0.015,
  duration: 18 + (i % 10) * 1.5,
  delay: (i % 8) * 0.6,
  driftY: -20 - (i % 15) * 2,
}));

// =========================================
// SUB-COMPONENTS
// =========================================

/**
 * A single gradient orb that drifts based on scroll progress.
 */
function ScrollOrb({
  orb,
  scrollProgress,
}: {
  orb: (typeof ORBS)[number];
  scrollProgress: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(
    scrollProgress,
    [0, 1],
    [`${orb.baseX}%`, `${orb.baseX + orb.driftX}%`]
  );
  const y = useTransform(
    scrollProgress,
    [0, 1],
    [`${orb.baseY}%`, `${orb.baseY + orb.driftY}%`]
  );
  const opacity = useTransform(scrollProgress, [0, 0.05, 1], [0.3, 1, 0.7]);
  const scale = useTransform(scrollProgress, [0, 1], [0.8, 1.2]);

  return (
    <motion.div
      key={orb.id}
      style={{
        position: 'absolute',
        width: orb.size,
        height: orb.size,
        left: x,
        top: y,
        opacity,
        scale,
        translateX: '-50%',
        translateY: '-50%',
        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
        filter: `blur(${orb.blur}px)`,
        borderRadius: '50%',
        willChange: 'transform, opacity',
      }}
      transition={{ delay: orb.delay }}
    />
  );
}

/**
 * Floating micro-particles — subtle star-field effect.
 */
function FloatingParticles({ scrollProgress }: { scrollProgress: ReturnType<typeof useSpring> }) {
  const opacity = useTransform(scrollProgress, [0, 1], [0.4, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, p.driftY, 0],
            opacity: [p.opacity, p.opacity * 3, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
}

/**
 * Diagonal scan lines — cinematic depth layer.
 */
function ScanLines({ scrollProgress }: { scrollProgress: ReturnType<typeof useSpring> }) {
  const opacity = useTransform(scrollProgress, [0, 0.12, 0.9, 1], [0, 0.018, 0.018, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)',
        }}
      />
    </motion.div>
  );
}

/**
 * Thin aurora streak across the top — acts as a visual "horizon" as user scrolls.
 */
function AuroraStreak({ scrollProgress }: { scrollProgress: ReturnType<typeof useSpring> }) {
  const opacity = useTransform(scrollProgress, [0, 0.1, 0.5, 1], [0, 0.6, 0.3, 0]);
  const scaleX = useTransform(scrollProgress, [0, 0.2, 1], [0.3, 1, 1.2]);

  return (
    <motion.div
      style={{ opacity, scaleX, transformOrigin: 'center' }}
      className="absolute left-0 right-0 pointer-events-none"
      // Position it at the top of the section — will drift with page
      aria-hidden="true"
    >
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(139,92,246,0.4) 20%, rgba(59,130,246,0.5) 50%, rgba(16,185,129,0.4) 80%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />
      <div
        className="h-[2px] w-full mt-0.5"
        style={{
          background:
            'linear-gradient(to right, transparent 5%, rgba(139,92,246,0.15) 25%, rgba(99,102,241,0.2) 50%, rgba(59,130,246,0.15) 75%, transparent 95%)',
          filter: 'blur(4px)',
        }}
      />
    </motion.div>
  );
}

// =========================================
// MAIN COMPONENT
// =========================================

/**
 * ScrollBackground — a fixed overlay that renders behind all page content.
 * It activates when the user scrolls into the IphoneShowcase section and
 * gently deactivates toward the end of the page.
 *
 * Usage: Place once in layout or page, no props needed.
 */
export default function ScrollBackground() {
  return null;
}
