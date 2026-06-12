# Shreenath Aadi Art | Premium Digital Portfolio

An immersive, high-performance web experience for a luxury wooden art brand. This project was engineered to showcase high-fidelity 3D/4D art products with a focus on deep aesthetic appeal and rapid performance.

## 🚀 The Migration Story
This project was recently migrated from a **Vite + React** setup to a modern **Next.js 15 (App Router)** architecture to leverage server-side rendering, better SEO, and optimized build performance.

## 🛠 Tech Stack
| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion |
| **Icons/Assets** | Lucide React |

## ✨ Key Features
* **Design System:** Dark luxury theme (deep black, purple glow, royal gold) utilizing Glassmorphism.
* **Performance:** Static prerendering, optimized image delivery, and lightning-fast load times (~171 kB first load).
* **Immersive UI:** Smooth scroll reveals, 3D gallery room, and interactive loading screen.
* **Conversion Focused:** Direct WhatsApp CTAs integrated throughout the user journey (Products, Chat, Contact).
* **AI Integration:** Custom-built AI Assistant for product guidance and price inquiries.
* **SEO Optimized:** Open Graph/Twitter meta tags + JSON-LD structured data for Local Business visibility.

## 📊 Sections Overview
| Section | Features |
| :--- | :--- |
| **Navbar** | Sticky glass blur, Mobile slide menu |
| **Hero** | Particle effects, Gradient orbs, Stats |
| **Products** | 3D/4D/5D, Custom Order inquiry forms |
| **Gallery** | 3D rotating room, Masonry grid, Lightbox |
| **AI Assistant** | Real-time chat guidance |

## 🏗 Project Structure
```text
app/          # Main App Router (Layouts & Pages)
components/   # Modular UI & Sections
  layout/     # Global Navbar/Footer
  sections/   # Page segments
  chat/       # AI Assistant logic
  ui/         # Reusable components (GlassCard, Particles)
lib/          # Constants, AI logic, & Utilities
