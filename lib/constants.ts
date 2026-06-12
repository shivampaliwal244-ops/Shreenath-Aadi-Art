export const BRAND = {
  name: "Shreenath Aadi Art",
  owner: "Sandeep Paliwal",
  phone: "+91 9782715560",
  phoneRaw: "919782715560",
  email: "Sandeeppaliwal79745@gmail.com",
  tagline: "Crafting Sacred Memories in Premium Wood",
  description:
    "Premium handcrafted wooden art — 3D, 4D & 5D frames, Shreenathji art, Jain religious frames, and bespoke custom designs with royal gold finishing.",
} as const;

export const WHATSAPP_URL = `https://wa.me/${BRAND.phoneRaw}`;
export const WHATSAPP_INQUIRY = `${WHATSAPP_URL}?text=${encodeURIComponent(
  "Hello! I'm interested in Shreenath Aadi Art custom frames."
)}`;

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Products", href: "#products" },
  { name: "Gallery", href: "#gallery" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com/aadi_arts_5560",
    icon: "instagram",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/",
    icon: "facebook",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/",
    icon: "youtube",
  },
  {
    name: "WhatsApp",
    href: WHATSAPP_URL,
    icon: "whatsapp",
  },
] as const;

export const BUSINESS_HOURS = [
  { day: "Mon – Sat", hours: "10:00 AM – 8:00 PM" },
  { day: "Sunday", hours: "By Appointment" },
] as const;

export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.1025!3d28.7041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQyJzE0LjgiTiA3N8KwMDYnMDkuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

export type GalleryCategory =
  | "all"
  | "3d"
  | "4d"
  | "5d"
  | "shreenathji"
  | "jain"
  | "custom";

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "3d", label: "3D Frames" },
  { id: "4d", label: "4D Frames" },
  { id: "5d", label: "5D Frames" },
  { id: "shreenathji", label: "Shreenathji" },
  { id: "jain", label: "Jain Art" },
  { id: "custom", label: "Custom" },
];

const categoryCycle: GalleryCategory[] = [
  "3d",
  "4d",
  "5d",
  "shreenathji",
  "jain",
  "custom",
];

export const GALLERY_IMAGES = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  src: `/images/${i + 1}.jpg`,
  alt: `Premium Wooden Frame ${i + 1} — Shreenath Aadi Art`,
  category: categoryCycle[i % categoryCycle.length],
}));

export const PRODUCTS = [
  {
    id: "3d-frames",
    title: "3D Frames",
    description:
      "Multi-layered depth with hand-carved wooden relief. Perfect for portraits and devotional art with stunning dimensional presence.",
    icon: "layers",
    category: "3d",
  },
  {
    id: "4d-frames",
    title: "4D Frames",
    description:
      "Advanced layered craftsmanship with glass integration and gold emboss detailing for a museum-quality finish.",
    icon: "box",
    category: "4d",
  },
  {
    id: "5d-frames",
    title: "5D Frames",
    description:
      "Our flagship ultra-premium frames featuring intricate multi-dimensional artistry and royal gold accents.",
    icon: "sparkles",
    category: "5d",
  },
  {
    id: "shreenathji",
    title: "Shreenathji Art",
    description:
      "Sacred Shreenathji artwork in premium wooden and glass frames — crafted with devotion and masterful precision.",
    icon: "crown",
    category: "shreenathji",
  },
  {
    id: "jain-art",
    title: "Jain Religious Art",
    description:
      "Exquisite Jain religious frames with gold emboss work, traditional motifs, and timeless spiritual elegance.",
    icon: "gem",
    category: "jain",
  },
  {
    id: "photo-frames",
    title: "Wooden Photo Frames",
    description:
      "Elegant wooden photo frames with premium polish, custom sizing, and personalized design options.",
    icon: "image",
    category: "custom",
  },
  {
    id: "custom-orders",
    title: "Custom Orders",
    description:
      "Your vision, our craftsmanship. Bespoke frames designed exactly to your specifications and preferences.",
    icon: "palette",
    category: "custom",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Mehta",
    location: "Jaipur",
    rating: 5,
    text: "The Shreenathji frame we ordered is absolutely breathtaking. The gold emboss work and 5D depth exceeded our expectations. True master craftsmanship.",
  },
  {
    id: 2,
    name: "Priya Shah",
    location: "Mumbai",
    rating: 5,
    text: "Sandeep ji created a custom Jain religious frame for our home temple. The quality is unmatched — every guest asks where we got it from.",
  },
  {
    id: 3,
    name: "Amit Jain",
    location: "Delhi",
    rating: 5,
    text: "20+ years of experience truly shows. Our 4D wooden frame arrived with flawless finishing. Professional service and timely delivery.",
  },
  {
    id: 4,
    name: "Neha Parekh",
    location: "Ahmedabad",
    rating: 5,
    text: "From consultation to delivery, the experience was premium. The custom photo frame is a heirloom piece our family will cherish forever.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Udaipur",
    rating: 5,
    text: "Ordered multiple 3D frames for our boutique hotel. Each piece is unique and luxurious. Shreenath Aadi Art is our go-to for premium art.",
  },
] as const;

export const ABOUT_FEATURES = [
  {
    title: "Master Craftsmanship",
    description:
      "Every frame is handcrafted by Sandeep Paliwal with 20+ years of expertise in wooden art.",
    icon: "hammer",
  },
  {
    title: "Premium Materials",
    description:
      "Finest quality wood, glass, and gold emboss materials for lasting durability and elegance.",
    icon: "gem",
  },
  {
    title: "Custom Design",
    description:
      "From concept to creation — any design, any size, tailored to your vision and space.",
    icon: "palette",
  },
  {
    title: "Sacred Artistry",
    description:
      "Specialized in Shreenathji and Jain religious art with deep cultural authenticity.",
    icon: "heart",
  },
] as const;

export const STATS = [
  { value: "20+", label: "Years Experience" },
  { value: "20K+", label: "Happy Customers" },
  { value: "100%", label: "Handcrafted" },
  { value: "∞", label: "Custom Designs" },
] as const;
