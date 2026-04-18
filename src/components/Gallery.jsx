// Gallery.jsx - Updated with enhanced watermark visibility
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './Gallery.css'

const Gallery = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [loadedImages, setLoadedImages] = useState({})

  // Memoize images array to prevent re-creation on every render
  // Creates 40 images with rotating categories
  const images = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      src: `/images/${i + 1}.jpg`,
      alt: `Handmade Frame ${i + 1}`,
      category: ['classic', 'modern', 'ornate', 'rustic'][i % 4],
    })), []
  )

  // Track loaded images for smooth fade-in effect
  const handleImageLoad = useCallback((id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }))
  }, [])

  // Open gallery and lock body scroll to prevent background scrolling
  const openGallery = useCallback(() => {
    setIsGalleryOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  // Close gallery and restore normal scroll behavior
  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false)
    document.body.style.overflow = 'auto'
  }, [])

  // Keyboard accessibility - close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isGalleryOpen) closeGallery()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isGalleryOpen, closeGallery])

  // Preload first 6 images for faster initial gallery load
  useEffect(() => {
    const preloadCount = 6
    images.slice(0, preloadCount).forEach(img => {
      const image = new Image()
      image.src = img.src
    })
  }, [images])

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        {/* Section heading with neon glow effect */}
        <h2 className="section-title neon-text">
          Aadi Art Gallery
        </h2>

        {/* CTA button to open gallery popup */}
        <div className="view-gallery-container">
          <button className="view-gallery-btn" onClick={openGallery}>
            <span>View Gallery</span>
            {/* Arrow icon SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Gallery Popup Modal - Conditionally rendered for performance */}
      {isGalleryOpen && (
        <div className="gallery-popup" onClick={closeGallery}>
          {/* Fixed position close button - always visible while scrolling */}
          <button 
            className="popup-close-btn" 
            onClick={(e) => {
              e.stopPropagation() // Prevent closing when clicking the button itself
              closeGallery()
            }}
            aria-label="Close gallery"
          >
            {/* X icon SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Main content area - stopPropagation prevents accidental close */}
          <div className="gallery-popup-content" onClick={(e) => e.stopPropagation()}>
            {/* Responsive grid layout for images */}
            <div className="gallery-grid">
              {images.map((image) => (
                <div 
                  key={image.id} 
                  className={`gallery-item ${loadedImages[image.id] ? 'loaded' : ''}`}
                >
                  <div className="image-wrapper">
                    {/* Main product image with lazy loading for performance */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      onLoad={() => handleImageLoad(image.id)}
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.target.src = `[picsum.photos](https://picsum.photos/400/500?random=${image.id})`
                      }}
                    />
                    
                    {/* 
                      WATERMARK - Aadi Art Logo
                      Positioned top-right with dark glow for visibility
                      on both light and dark images
                    */}
                    <div className="watermark-container">
                      <img 
                        src="/logo.png" 
                        alt="Aadi Art" 
                        className="watermark"
                        loading="lazy"
                        draggable="false"
                      />
                    </div>
                    
                    {/* Hover overlay showing image details */}
                    <div className="image-overlay">
                      <span className="overlay-title">Frame #{image.id}</span>
                      <span className="overlay-category">{image.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
