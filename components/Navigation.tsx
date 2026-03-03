'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from './ReducedMotionProvider';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Archive', href: '/archive' },
  { label: 'Sensory Archive', href: '/sensory' },
  { label: 'Curatorial Ethics', href: '/ethics' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { reducedMotion, toggleReducedMotion } = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#F8FBFF]/95 backdrop-blur-sm border-b border-[#E0EAF4]' 
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <Link href="/" className="group">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border border-[#C4D9EE] relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-[#1E3A5F]"
                animate={{ scaleY: scrolled ? 1 : 0 }}
                style={{ originY: 'bottom' }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="font-ibm-mono text-[0.65rem] tracking-[0.2em] uppercase text-[#8FACC8] group-hover:text-[#1E3A5F] transition-colors duration-300">
              Plastic Centuries
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link transition-colors duration-300 ${
                pathname === item.href ? 'active text-[#1E3A5F]' : ''
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="h-px bg-[#1E3A5F] mt-0.5"
                />
              )}
            </Link>
          ))}

          {/* Reduced motion toggle */}
          <button
            onClick={toggleReducedMotion}
            className="nav-link flex items-center gap-1.5 text-[0.65rem]"
            aria-label={`${reducedMotion ? 'Enable' : 'Disable'} animations`}
            title="Toggle reduced motion"
          >
            <div className={`w-3 h-3 rounded-full border border-current transition-colors ${reducedMotion ? 'bg-current' : ''}`} />
            <span className="hidden lg:inline">{reducedMotion ? 'Motion: Off' : 'Motion: On'}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#8FACC8] hover:text-[#1E3A5F] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#F8FBFF]/98 border-t border-[#E0EAF4]"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`nav-link ${pathname === item.href ? 'text-[#1E3A5F]' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={toggleReducedMotion}
                className="nav-link text-left"
              >
                {reducedMotion ? 'Animations: Disabled' : 'Animations: Enabled'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
