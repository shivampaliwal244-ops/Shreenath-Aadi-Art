import React, { useEffect, useRef } from 'react';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);

  // Mouse parallax effect
  useEffect(() => {
    const hero = heroRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = hero.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      hero.style.setProperty('--mouse-x', x);
      hero.style.setProperty('--mouse-y', y);
    };

    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef}>
      {/* Animated Background Elements - Sky Blue Glitter */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="glitter-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Main Content */}
      <div className="container">
        <div className="hero-content">
          {/* Floating Badge */}
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span>Premium Handcrafted Frames</span>
          </div>

          {/* Main Title with 3D Effect */}
          <h1 className="hero-title">
            <span className="title-line">
              <span className="title-word word-3d">Sandeep</span>
            </span>
            <span className="title-line">
              <span className="title-word word-3d">Paliwal</span>
            </span>
            <span className="title-line accent">
              <span className="title-word word-3d accent-text">Artist</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            We design and craft high-quality 3D, 4D and 5D wooden and glass frames with premium finishing.  
Our expertise includes gold emboss work, Jain religious frames, Shreenathji artwork and custom photo frames.
            <br />
            Bring your memories to life with elegant and artistic craftsmanship.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <a href="#gallery" className="btn-primary hero-btn">
              <span>View Gallery</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn-secondary hero-btn">
              <span>Get Custom Frame</span>
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">20K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Handcrafted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;