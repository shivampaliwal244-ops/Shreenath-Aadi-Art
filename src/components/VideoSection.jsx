import React, { useState, useRef, useEffect } from 'react'
import './VideoSection.css'

// ✅ Import local videos from assets
import video1 from '../assets/videos/frame1.mp4'
import video2 from '../assets/videos/frame2.mp4'
import video3 from '../assets/videos/frame3.mp4'

const VideoSection = () => {
  // State for currently playing video in modal
  const [activeVideo, setActiveVideo] = useState(null)
  
  // State to track which videos are loaded/ready
  const [loadedVideos, setLoadedVideos] = useState({})
  
  // State to track video loading progress
  const [loadingProgress, setLoadingProgress] = useState({})
  
  // Ref for modal video element
  const modalVideoRef = useRef(null)
  
  // Refs for thumbnail preview videos
  const previewRefs = useRef({})

  // ✅ Video data array with local video sources
  const videos = [
    {
      id: 1,
      title: 'Wood Carving Process',
      description: 'Watch how we carefully carve each frame by hand',
      thumbnail: '[picsum.photos](https://picsum.photos/600/400?random=101)',
      video: video1,
      // Optional: Add poster image for faster initial load
      poster: '[picsum.photos](https://picsum.photos/600/400?random=101)'
    },
    {
      id: 2,
      title: 'Frame Assembly',
      description: 'The art of putting together a perfect frame',
      thumbnail: '[picsum.photos](https://picsum.photos/600/400?random=102)',
      video: video2,
      poster: '[picsum.photos](https://picsum.photos/600/400?random=102)'
    },
    {
      id: 3,
      title: 'Finishing Touches',
      description: 'Final polishing and detailing of our masterpieces',
      thumbnail: '[picsum.photos](https://picsum.photos/600/400?random=103)',
      video: video3,
      poster: '[picsum.photos](https://picsum.photos/600/400?random=103)'
    }
  ]

  // ✅ Preload videos on component mount for smooth playback
  useEffect(() => {
    videos.forEach((video) => {
      // Create hidden video elements to preload
      const videoElement = document.createElement('video')
      videoElement.preload = 'auto'
      videoElement.src = video.video
      
      // Track loading progress
      videoElement.addEventListener('progress', () => {
        if (videoElement.buffered.length > 0) {
          const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1)
          const duration = videoElement.duration
          if (duration > 0) {
            setLoadingProgress(prev => ({
              ...prev,
              [video.id]: (bufferedEnd / duration) * 100
            }))
          }
        }
      })
      
      // Mark as loaded when ready
      videoElement.addEventListener('canplaythrough', () => {
        setLoadedVideos(prev => ({ ...prev, [video.id]: true }))
      })
      
      // Start loading
      videoElement.load()
    })
  }, [])

  // ✅ Open video modal with smooth transition
  const openVideo = (video) => {
    setActiveVideo(video)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  // ✅ Close video modal and cleanup
  const closeVideo = () => {
    // Pause video before closing
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
      modalVideoRef.current.currentTime = 0
    }
    setActiveVideo(null)
    // Restore body scroll
    document.body.style.overflow = 'auto'
  }

  // ✅ Handle keyboard events (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeVideo) {
        closeVideo()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeVideo])

  // ✅ Play preview on hover (optional - shows video preview on card hover)
  const handleMouseEnter = (videoId) => {
    const previewVideo = previewRefs.current[videoId]
    if (previewVideo && loadedVideos[videoId]) {
      previewVideo.play().catch(() => {
        // Autoplay might be blocked, ignore error
      })
    }
  }

  // ✅ Pause preview on mouse leave
  const handleMouseLeave = (videoId) => {
    const previewVideo = previewRefs.current[videoId]
    if (previewVideo) {
      previewVideo.pause()
      previewVideo.currentTime = 0
    }
  }

  return (
    <section id="videos" className="video-section">
      <div className="container">

        {/* Section Title */}
        <h2 className="section-title neon-text">
          Our Process
        </h2>

        <p className="video-intro">
          Discover the artistry behind every frame we create
        </p>

        {/* Video Grid */}
        <div className="video-grid">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`video-card glass-card ${loadedVideos[video.id] ? 'loaded' : 'loading'}`}
              onClick={() => openVideo(video)}
              onMouseEnter={() => handleMouseEnter(video.id)}
              onMouseLeave={() => handleMouseLeave(video.id)}
              style={{ animationDelay: `${index * 0.15}s` }} 
            >
              {/* Thumbnail Container */}
              <div className="video-thumbnail">
                {/* Static thumbnail image (shows initially) */}
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  loading="lazy"
                />
                
                {/* ✅ Preview video (plays on hover) */}
                <video
                  ref={(el) => previewRefs.current[video.id] = el}
                  className="preview-video"
                  src={video.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={video.poster}
                />

                {/* Play button overlay */}
                <div className="play-button">
                  <div className="play-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  {/* Ripple animations */}
                  <div className="play-ripple"></div>
                  <div className="play-ripple delay-1"></div>
                  <div className="play-ripple delay-2"></div>
                </div>

                {/* Gradient overlay */}
                <div className="thumbnail-overlay"></div>
                
                {/* ✅ Loading indicator (shows while video is loading) */}
                {!loadedVideos[video.id] && (
                  <div className="video-loading-indicator">
                    <div 
                      className="loading-bar"
                      style={{ width: `${loadingProgress[video.id] || 0}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Video info */}
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-description">{video.description}</p>
              </div>

              {/* Bottom glow effect */}
              <div className="video-card-glow"></div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Video Modal - Full screen player */}
      {activeVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Close button */}
            <button 
              className="modal-close" 
              onClick={closeVideo}
              aria-label="Close video"
            >
              <span>×</span>
            </button>

            {/* ✅ Video player wrapper */}
            <div className="video-wrapper">
              <video
                ref={modalVideoRef}
                src={activeVideo.video}
                controls
                autoPlay
                playsInline
                poster={activeVideo.poster}
                preload="auto"
                // ✅ Smooth loading attributes
                controlsList="nodownload"
                disablePictureInPicture={false}
              >
                {/* Fallback message */}
                Your browser does not support the video tag.
              </video>
              
              {/* ✅ Loading spinner (shows while video is buffering) */}
              <div className="video-loader">
                <div className="loader-spinner"></div>
              </div>
            </div>

            {/* Video info in modal */}
            <div className="modal-info">
              <h3>{activeVideo.title}</h3>
              <p>{activeVideo.description}</p>
            </div>

          </div>
        </div>
      )}

      {/* Background decorative elements */}
      <div className="video-bg-elements">
        <div className="bg-brush brush-1"></div>
        <div className="bg-brush brush-2"></div>
      </div>
    </section>
  )
}

export default VideoSection
