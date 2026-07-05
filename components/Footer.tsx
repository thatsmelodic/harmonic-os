'use client';

import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS } from '@/lib/design-tokens';
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={ANIMATION_VARIANTS.slideUp}
      className="w-full bg-harmonic-deep border-t border-harmonic-purple/10 py-12 sm:py-16 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <motion.div
            variants={ANIMATION_VARIANTS.slideUp}
            className="flex flex-col gap-4"
          >
            <h3 className="text-lg sm:text-xl font-bold text-harmonic-silver">
              Harmonic OS
            </h3>
            <p className="text-harmonic-silver/60 text-sm leading-relaxed">
              One Frequency. Many Worlds.
            </p>
            <p className="text-harmonic-silver/50 text-xs">
              A premium creative operating system by Melodic.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={ANIMATION_VARIANTS.slideUp}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <h4 className="text-sm font-semibold text-harmonic-silver uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: 'Home', href: '#' },
                { label: 'Harmonic Bible', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Contact', href: '#' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-harmonic-silver/70 hover:text-harmonic-purple-bright transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            variants={ANIMATION_VARIANTS.slideUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h4 className="text-sm font-semibold text-harmonic-silver uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-harmonic-silver/60 text-sm">
              Join da Symphony and be part of the universe.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-harmonic-purple/20 to-transparent mb-8" />

        {/* Bottom Footer */}
        <motion.div
          variants={ANIMATION_VARIANTS.slideUp}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-harmonic-silver/50"
        >
          <p>
            © {currentYear} Harmonic OS. All frequencies reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Built with</span>
            <span className="text-harmonic-purple">♥</span>
            <span>and purple energy</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
