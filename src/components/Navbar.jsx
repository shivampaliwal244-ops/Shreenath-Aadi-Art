// Navbar.jsx
// Theme: Violet Blue Polish
// Changes:
// - Removed logo animation effects
// - Added CSS-only hover shine/glow on logo
// - Theme toggle: White (light) → Dark → Reading mode (3-state toggle)

import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaSun, FaMoon, FaBook } from 'react-icons/fa'
import './Navbar.css'

const Navbar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Theme cycle: light → dark → reading → light
  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('reading')
    } else {
      setTheme('light')
    }
  }

  // Get theme icon based on current theme
  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <FaMoon />
      case 'reading':
        return <FaBook />
      default:
        return <FaSun />
    }
  }

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Process', href: '#videos' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        {/* Logo with CSS-only hover shine/glow - NO animation */}
        <a href="#home" className="navbar-logo">
          <span className="logo-text">Shreenath Aadi Art</span>
          {/* Shine effect element - appears on hover only */}
          <span className="logo-shine"></span>
        </a>

        {/* Desktop Navigation */}
        <ul className="nav-menu">
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <a href={link.href} className="nav-link">
                <span>{link.name}</span>
                <span className="nav-link-glow"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side - Theme Toggle & Hamburger */}
        <div className="navbar-right">
          {/* Theme Toggle Button - 3 states: light/dark/reading */}
          <button 
            className="theme-toggle" 
            onClick={cycleTheme} 
            aria-label="Toggle theme"
            title={`Current: ${theme} mode`}
          >
            <div className="toggle-icon">
              {getThemeIcon()}
            </div>
            <span className="toggle-glow"></span>
          </button>

          {/* Hamburger Menu for Mobile */}
          <button 
            className="hamburger" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
          >
            <div className={`hamburger-lines ${isOpen ? 'open' : ''}`}>
              <span className="line line-1"></span>
              <span className="line line-2"></span>
              <span className="line line-3"></span>
            </div>
            <span className="hamburger-glow"></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="mobile-nav-link"
                onClick={closeMenu}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span>{link.name}</span>
                <span className="mobile-link-glow"></span>
              </a>
            ))}
            
            {/* Theme indicator in mobile menu */}
            <div className="mobile-theme-indicator">
              <span>Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
