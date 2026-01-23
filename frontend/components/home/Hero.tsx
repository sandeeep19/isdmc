'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const heroSlides = [
  {
    image: '/images/hero-ghats.jpg',
    tagline: 'EVERY GHAT. EVERY KACHORI. EVERY SECRET.',
    sub: 'Banaras, Seen From Inside.'
  },
  {
    image: '/images/hero-temples.jpg',
    tagline: 'ANCIENT TRADITION, MODERN REVELATIONS.',
    sub: 'No one knows Kashi better than us.'
  },
  {
    image: '/images/hero-food.jpg',
    tagline: 'THE CITY THAT NEVER STOPS PRAYING.',
    sub: 'Taste the immortal flavors of Banaras.'
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentIndex].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary/90" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Decorative Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-5xl"
        >
          <span className="text-secondary font-bold tracking-[0.4em] uppercase text-sm mb-6 block drop-shadow-lg">
            A Banaras Studio Collective
          </span>
          <h1 className="font-heading text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] drop-shadow-2xl">
            {heroSlides[currentIndex].tagline.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 0 ? 'text-white' : 'text-accent'}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-light tracking-wide border-l-4 border-accent pl-6 bg-white/5 py-3 backdrop-blur-sm rounded-r-xl italic">
            {heroSlides[currentIndex].sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/plan" className="btn-primary group">
              Plan Your Path
              <svg className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/explore" className="text-white font-black uppercase tracking-widest text-sm hover:text-accent transition-colors flex items-center gap-2">
              <span className="w-12 h-px bg-white/30" />
              Explore Secrets
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-12 right-12 flex flex-col gap-4 z-20">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1 transition-all duration-500 ${idx === currentIndex ? 'h-12 bg-accent' : 'h-4 bg-white/30'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
