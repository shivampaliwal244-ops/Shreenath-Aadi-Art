// App.jsx
// FIXED: Footer bottom layout issue solved

import React, { useState, useEffect } from 'react'

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Gallery from './components/Gallery'
import VideoSection from './components/VideoSection'
import Contact from './components/Contact'
import Footer from './components/Footer'

import './App.css'
import './index.css'

const App = () => {

  const [showIntro, setShowIntro] = useState(true)
  const [introFading, setIntroFading] = useState(false)

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIntroFading(true)
    }, 2500)

    const removeTimer = setTimeout(() => {
      setShowIntro(false)
    }, 3500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  useEffect(() => {
    document.body.classList.remove('light-mode', 'dark-mode', 'reading-mode')

    if (theme === 'light') {
      document.body.classList.add('light-mode')
    } else if (theme === 'dark') {
      document.body.classList.add('dark-mode')
    } else if (theme === 'reading') {
      document.body.classList.add('reading-mode')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
      {/* INTRO */}
      {showIntro && (
        <div className={`intro-screen ${introFading ? 'fading' : ''}`}>
          <div className="intro-particles">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="intro-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          <div className="intro-content">
            <h1 className="intro-logo">
              {"Sandeep Art".split("").map((char, i) => (
                <span
                  key={i}
                  className={`intro-letter ${char === ' ' ? 'intro-space' : ''}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {char}
                </span>
              ))}
            </h1>

            <div className="intro-tagline">
              Crafting Memories in Wood
            </div>

            <div className="intro-loader">
              <div className="loader-bar"></div>
            </div>
          </div>

          <div className="intro-rings">
            <div className="intro-ring ring-1"></div>
            <div className="intro-ring ring-2"></div>
            <div className="intro-ring ring-3"></div>
          </div>
        </div>
      )}

      {/* MAIN WEBSITE */}
      <div className={`main-content ${showIntro ? 'hidden' : 'visible'}`}>

        {/* 🔥 ADD THIS WRAPPER */}
        <div className="app-container">

          <Navbar theme={theme} setTheme={setTheme} />

          <Home />
          <About />
          <Gallery />
          <VideoSection />
          <Contact />

          {/* Footer always bottom */}
          <Footer />

        </div>

      </div>
    </>
  )
}

export default App