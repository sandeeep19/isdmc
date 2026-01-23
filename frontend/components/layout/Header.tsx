'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchBar from '../search/SearchBar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Explore', href: '/explore' },
    { name: 'Hidden Gems', href: '/gems' },
    { name: 'Stories', href: '/stories' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Plan Your Path', href: '/plan' },
    { name: 'Events', href: '/events' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-md shadow-lg py-2'
        : 'bg-white shadow-md py-4'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative flex items-center justify-center w-14 h-14 bg-accent rounded-2xl transition-all duration-500 group-hover:bg-primary shadow-xl group-hover:shadow-primary/30 group-hover:-rotate-3">
              {/* Banarasi Shiva Type Icon: Stylized Trishul with Crescent Moon */}
              <svg
                className="w-10 h-10 text-primary group-hover:text-accent transition-all duration-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Central Spear */}
                <path d="M12 2v20" />
                {/* Outer Curves (Trishul) */}
                <path d="M7 6c0 0 1 2 5 2s5-2 5-2" />
                <path d="M5 4c0 0 2 4 7 4s7-4 7-4" />
                {/* Crescent Moon element at base of spearhead */}
                <path d="M10 5a4 4 0 0 1 4 0" fill="currentColor" className="opacity-40" />
              </svg>
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="flex flex-col -space-y-2">
              <span className="text-2xl font-heading font-black tracking-tighter text-primary group-hover:text-accent transition-colors duration-300">
                INDIAN STUDIO
              </span>
              <span className="text-base font-heading font-black tracking-[0.5em] text-accent group-hover:text-primary transition-all duration-500">
                DMC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-neutral-ink font-medium hover:text-primary transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Search & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block w-64 transition-all duration-300 focus-within:w-80">
              <SearchBar />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-neutral-ink hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100 py-4 border-t' : 'max-h-0 opacity-0'
          }`}>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-neutral-ink hover:text-primary font-medium px-2 py-1 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 px-2">
              <SearchBar />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
