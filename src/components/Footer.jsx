import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-glow"></div>

      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} <span>Sandeep Paliwal</span>. All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer