import React from 'react'
import './About.css'

const About = () => {
  // Features data
  const features = [
    {
      icon: '🎨',
      title: 'Handcrafted',
      description: 'Each frame is carefully crafted by hand with attention to every detail'
    },
    {
      icon: '🪵',
      title: '3D 4D 5D Premium Wood',
      description: 'We use only the finest quality wood for lasting durability'
    },
    {
      icon: '✨',
      title: 'Custom Design',
      description: 'Get any type of frame designed according to your vision'
    },
    {
      icon: '💝',
      title: 'Made with Love',
      description: 'Every piece carries our passion and dedication to the craft'
    }
  ]

  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Section Title - Sky Blue */}
        <h2 className="section-title neon-text">
          About Sandeep Art
        </h2>

        {/* Stats Row */}
        <div className="about-stats">
          <div className="about-stat glass-card">
            <span className="stat-value">20+</span>
            <span className="stat-text">Years of Experience</span>
            <div className="stat-glow"></div>
          </div>
          <div className="about-stat glass-card">
            <span className="stat-value">20K+</span>
            <span className="stat-text">Happy Customers</span>
            <div className="stat-glow"></div>
          </div>
          <div className="about-stat glass-card">
            <span className="stat-value">∞</span>
            <span className="stat-text">Creative Designs</span>
            <div className="stat-glow"></div>
          </div>
        </div>

        {/* About Content */}
        <div className="about-content">
          <div className="about-text glass-card">
            <p className="about-description">
              At <strong>Paliwal Artist</strong>, we specialize in creating premium handcrafted wooden and glass frames with stunning 3D, 4D and 5D artistic effects. With over <strong>20+ years of experience</strong>, we bring tradition, creativity and modern design together to create truly unique masterpieces.
</p>

<p>
We offer a wide range of customized artworks including <strong>gold emboss paintings, Jain religious art, Shreenathji glass frames, and personalized photo frames</strong>. Every piece is carefully designed with attention to detail, ensuring high quality, durability and a premium finish.
</p>

<p>
Whether it's a religious artwork, a memory frame, or a custom design, we transform your ideas into beautiful creations that last forever.
</p>

<p>
Our mission is to deliver <strong>high-quality artistic frames</strong> that reflect emotions, culture and craftsmanship.
</p>
            <p className="about-highlight">
              <span className="highlight-icon">🖼️</span>
              We can create any type of frame you desire - from classic to contemporary, 
              simple to ornate an type of 3D 4d wooden glass frames. Your imagination is our only limit.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card glass-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">
                <span>{feature.icon}</span>
                <div className="icon-glow"></div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-shine"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="about-decoration">
        <div className="deco-frame frame-1"></div>
        <div className="deco-frame frame-2"></div>
      </div>
    </section>
  )
}

export default About
