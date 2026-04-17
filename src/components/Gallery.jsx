import React, { useState, useEffect, useCallback } from 'react'
import './Gallery.css'

const Gallery = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [loadedImages, setLoadedImages] = useState({})

  // 40 demo images
  const images = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    src: `/images/${i + 1}.jpg`,
    alt: `Handmade Frame ${i + 1}`,
    category: ['classic', 'modern', 'ornate', 'rustic'][i % 4],
  }))

  const handleImageLoad = useCallback((id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }))
  }, [])

  const openGallery = () => {
    setIsGalleryOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isGalleryOpen) closeGallery()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isGalleryOpen])

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <h2 className="section-title neon-text">
          Aadi Art Gallery
        </h2>

        <div className="view-gallery-container">
          <button className="view-gallery-btn" onClick={openGallery}>
            <span>View Gallery</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Gallery Popup */}
      {isGalleryOpen && (
        <div className="gallery-popup" onClick={closeGallery}>
          {/* Fixed Close Button - Always Visible */}
          <button className="popup-close-btn" onClick={closeGallery}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <div className="gallery-popup-content" onClick={(e) => e.stopPropagation()}>
            {/* Grid Gallery */}
            <div className="gallery-grid">
              {images.map((image) => (
                <div 
                  key={image.id} 
                  className={`gallery-item ${loadedImages[image.id] ? 'loaded' : ''}`}
                >
                  <div className="image-wrapper">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      onLoad={() => handleImageLoad(image.id)}
                      onError={(e) => {
                        e.target.src = `[picsum.photos](https://picsum.photos/400/500?random=${image.id})`
                      }}
                    />
                    
                    {/* Simple Watermark */}
                    <img src="/logo.png" alt="" className="watermark" />
                    
                    {/* Hover Info */}
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
