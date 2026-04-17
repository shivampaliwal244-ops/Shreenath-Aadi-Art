// Contact.jsx
// Updated: Full mobile responsive + chatbot fixes
// Theme: Violet Blue Polish

import React, { useState, useRef, useEffect } from 'react'
import { 
  FaPhone, 
  FaWhatsapp, 
  FaEnvelope, 
  FaInstagram, 
  FaFacebookF, 
  FaYoutube,
  FaPaperPlane,
  FaRobot,
  FaTimes
} from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  
  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hello! 👋 Welcome to Sandeep Art. How can I help you today?' }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  // Ref for auto-scrolling chat messages
  const chatMessagesRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [chatMessages])

  // Form handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const whatsappMessage = `Hi! I'm ${formData.name}. ${formData.message}`
    window.open(`https://wa.me/919782715560?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
  }

  // Chatbot functions
  const toggleChat = () => setIsChatOpen(!isChatOpen)
  
  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    
    // Add user message
    setChatMessages(prev => [...prev, { type: 'user', text: chatInput }])
    setIsTyping(true)
    
    // Simulate bot response with typing delay
    setTimeout(() => {
      const responses = [
        "Thank you for your message! Our team will get back to you soon. 😊",
        "For custom frames, please call us at 97827 15560 or WhatsApp us!",
        "You can also check our gallery for design inspiration!",
        "We offer free consultations for bulk orders. Interested?",
        "Our frames are handcrafted with premium materials. What style are you looking for?"
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setChatMessages(prev => [...prev, { type: 'bot', text: randomResponse }])
      setIsTyping(false)
    }, 1200)
    
    setChatInput('')
  }

  // Contact info data
  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'Call Us',
      value: '97827 15560',
      link: 'tel:+919782715560',
      color: '#0ea5e9'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      value: '97827 15560',
      link: 'https://wa.me/919782715560',
      color: '#25D366'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'Sandeeppaliwal79745@gmail.com',
      link: 'mailto:sandeeppaliwal79745@gmail.com?subject=Custom Frame Inquiry',
      color: '#22d3ee'
    }
  ]

  // Social media links
  
  const socialLinks = [
  { 
    icon: <FaInstagram />, 
    link: 'https://instagram.com/aadi_arts_5560',  // ✅ FIXED
    color: '#E1306C', 
    name: 'Instagram' 
  },
  { 
    icon: <FaFacebookF />, 
    link: 'https://facebook.com/', 
    color: '#1877F2', 
    name: 'Facebook' 
  },
  { 
    icon: <FaYoutube />, 
    link: 'https://youtube.com/', 
    color: '#FF0000', 
    name: 'YouTube' 
  },
  { 
    icon: <FaWhatsapp />, 
    link: 'https://wa.me/919782715560',  // ✅ FIXED
    color: '#25D366', 
    name: 'WhatsApp' 
  }
]

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Section Title */}
        <h2 className="section-title neon-text">
          Get In Touch
        </h2>

        {/* Contact Header */}
        <div className="contact-header">
          <h3 className="contact-tagline">Want a custom frame?</h3>
          <p className="contact-subtitle">
            Contact us today and turn your memories into art.
          </p>
        </div>

        <div className="contact-wrapper">
          {/* Left Side - Contact Info & Social */}
          <div className="contact-left">
            {/* Contact Info Cards */}
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <a 
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-card glass-card"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    '--icon-color': info.color,
                    '--glow-color': info.color 
                  }}
                >
                  <div className="info-icon">
                    {info.icon}
                    <div className="icon-ring"></div>
                  </div>
                  <div className="info-content">
                    <span className="info-title">{info.title}</span>
                    <span className="info-value">{info.value}</span>
                  </div>
                  <div className="card-arrow">→</div>
                  <div className="info-card-glow"></div>
                </a>
              ))}
            </div>

            {/* Social Media Icons */}
            <div className="social-section">
              <h4 className="social-title">Follow Us</h4>
              <div className="social-icons-grid">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn"
                    style={{ '--social-color': social.color }}
                    title={social.name}
                  >
                    {social.icon}
                    <span className="social-tooltip">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <h3 className="form-title">Send us a message</h3>
            
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <span className="input-focus-line"></span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <span className="input-focus-line"></span>
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <span className="input-focus-line"></span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <textarea
                  name="message"
                  placeholder="Tell us about your custom frame idea..."
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <span className="input-focus-line"></span>
              </div>
            </div>

            <button type="submit" className="btn-primary submit-btn">
              <FaWhatsapp />
              <span>Send via WhatsApp</span>
              <div className="btn-shine"></div>
            </button>
          </form>
        </div>
      </div>

      {/* Chatbot - Floating Widget */}
      <div className={`chatbot-container ${isChatOpen ? 'open' : ''}`}>
        {/* Chat Toggle Button */}
        <button 
          className="chatbot-toggle" 
          onClick={toggleChat}
          aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
        >
          {isChatOpen ? <FaTimes /> : <FaRobot />}
          {!isChatOpen && <span className="chat-pulse"></span>}
        </button>

        {/* Chat Window */}
        {isChatOpen && (
          <div className="chatbot-window glass-card">
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-avatar">
                <FaRobot />
              </div>
              <div className="chat-header-info">
                <h4>Sandeep Art Bot</h4>
                <span className="chat-status">
                  {isTyping ? 'Typing...' : 'Online'}
                </span>
              </div>
              <button 
                className="chat-close" 
                onClick={toggleChat}
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages" ref={chatMessagesRef}>
              {chatMessages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
              {/* Typing indicator */}
              {isTyping && (
                <div className="chat-message bot typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form className="chat-input-form" onSubmit={handleChatSubmit}>
              <input
                type="text"
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                aria-label="Type your message"
              />
              <button type="submit" aria-label="Send message">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Background Decoration */}
      <div className="contact-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>
    </section>
  )
}

export default Contact
