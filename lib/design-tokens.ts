/**
 * Design Tokens
 *
 * Centralized design values for Harmonic OS.
 */

export const COLORS = {
  background: {
    dark: '#030006',
    deeper: '#1a1a2e',
    purple: '#2d1b3d',
  },
  primary: {
    purple: '#8b5cf6',
    purpleBright: '#a78bfa',
    purpleNeon: '#d946ef',
    lavender: '#e9d5ff',
  },
  accents: {
    silver: '#e5e7eb',
    glow: '#c084fc',
  },
  worlds: {
    melodic: '#8b5cf6',
    harmonic: '#ec4899',
    friedem: '#f97316',
    schmackinn: '#06b6d4',
  },
};

export const TIMING = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
};

export const EASING = {
  smooth: [0.4, 0, 0.6, 1],
  easeInOut: 'easeInOut',
  easeOut: 'easeOut',
};

export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: TIMING.normal },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: TIMING.normal },
    },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: TIMING.normal },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: TIMING.normal },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: TIMING.normal },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: TIMING.normal },
    },
  },
};
