"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Agar lucide-react install nahi hai toh isko hata sakte hain

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll hone par background thoda dark/blur karne ke liye
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-black-deep/90 backdrop-blur-md border-b border-white/10 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            {/* SA Box */}
            <div className="flex shrink-0 h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-lg border border-gold/40 bg-black-deep text-gold font-bold text-sm md:text-lg shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              Shreenath Aadi Art
            </div>
            
            {/* Pura Naam - Ab Mobile aur Desktop dono par Dikhayi Dega */}
            <div className="flex flex-col justify-center">
              <span className="text-[15px] sm:text-lg md:text-xl font-bold text-white tracking-wide font-display whitespace-nowrap">
                Shreenath Aadi Art
              </span>
              <span className="text-[8px] md:text-[10px] text-gold tracking-[0.1em] md:tracking-[0.3em] uppercase font-medium">
                Premium Art
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#home" className="text-sm font-medium text-white/80 hover:text-gold transition-colors">Home</Link>
            <Link href="#about" className="text-sm font-medium text-white/80 hover:text-gold transition-colors">About</Link>
            <Link href="#gallery" className="text-sm font-medium text-white/80 hover:text-gold transition-colors">Gallery</Link>
            <Link href="#contact" className="text-sm font-medium text-white/80 hover:text-gold transition-colors">Contact</Link>
          </nav>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-white hover:text-gold p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" /> // Cross icon
              ) : (
                <Menu className="h-6 w-6" /> // Menu icon
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black-deep border-b border-white/10 shadow-xl">
          <div className="px-4 py-4 flex flex-col space-y-4">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="#home" className="text-base font-medium text-white hover:text-gold">Home</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="#about" className="text-base font-medium text-white hover:text-gold">About</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="#gallery" className="text-base font-medium text-white hover:text-gold">Gallery</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="#contact" className="text-base font-medium text-white hover:text-gold">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}