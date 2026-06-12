import { BRAND } from "./constants";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const GREETING_PATTERNS = /^(hi|hello|hey|namaste|good\s)/i;

export function getAIResponse(input: string): string {
  const msg = input.toLowerCase().trim();

  if (GREETING_PATTERNS.test(msg)) {
    return `Welcome to ${BRAND.name}! I'm your Art Assistant. I can help with product guidance, custom frame suggestions, materials, and pricing inquiries. What would you like to know?`;
  }

  if (/price|cost|rate|how much|pricing|budget/.test(msg)) {
    return "Pricing depends on frame type, size, and customization level. 3D frames start from affordable ranges, while 5D and gold emboss pieces are premium. Share your requirements on WhatsApp for an exact quote — Sandeep ji responds personally!";
  }

  if (/3d|three d/.test(msg)) {
    return "Our 3D Frames feature multi-layered wooden depth with hand-carved relief. Ideal for portraits and devotional art. Would you like to see examples in our gallery or inquire via WhatsApp?";
  }

  if (/4d|four d/.test(msg)) {
    return "4D Frames combine layered wood craftsmanship with glass integration and gold emboss detailing — a step above standard frames with museum-quality presence.";
  }

  if (/5d|five d/.test(msg)) {
    return "5D Frames are our flagship ultra-premium collection — intricate multi-dimensional artistry with royal gold accents. Perfect for statement pieces and temple installations.";
  }

  if (/shreenath|shrinath|nathji/.test(msg)) {
    return "We specialize in sacred Shreenathji artwork in premium wooden and glass frames. Each piece is crafted with devotion, gold emboss work, and meticulous attention to detail.";
  }

  if (/jain|religious|temple|puja/.test(msg)) {
    return "Our Jain Religious Art collection includes gold emboss paintings, traditional motif frames, and custom temple pieces. We understand the sacred significance of every design.";
  }

  if (/custom|bespoke|personal|design my|order/.test(msg)) {
    return "Custom orders are our specialty! Share your vision — size, design, religious theme, or photo — and we'll create a bespoke masterpiece. Tap WhatsApp below to start your custom frame journey.";
  }

  if (/material|wood|glass|gold|quality/.test(msg)) {
    return "We use premium quality wood, tempered glass, and genuine gold emboss materials. Every frame undergoes multi-stage finishing for durability, shine, and a luxury feel that lasts generations.";
  }

  if (/time|delivery|how long|days|week/.test(msg)) {
    return "Delivery time varies by complexity — standard frames typically take 1–2 weeks, while intricate 5D or custom gold emboss pieces may take 3–4 weeks. Contact us for your specific timeline.";
  }

  if (/contact|call|phone|whatsapp|reach/.test(msg)) {
    return `Reach ${BRAND.owner} directly at ${BRAND.phone}. Tap the WhatsApp button below for instant connection — we respond quickly to all inquiries!`;
  }

  if (/gallery|see|photo|example|sample/.test(msg)) {
    return "Browse our Gallery section for 40+ handcrafted masterpieces — filter by 3D, 4D, 5D, Shreenathji, Jain Art, or Custom designs. Each image showcases our premium craftsmanship.";
  }

  if (/thank|thanks|dhanyavad/.test(msg)) {
    return "You're welcome! Feel free to ask anything else, or connect with us on WhatsApp for personalized assistance. 🙏";
  }

  return "I'd love to help! Ask me about our 3D/4D/5D frames, Shreenathji art, Jain religious frames, custom orders, materials, or pricing. For detailed quotes, connect with Sandeep ji on WhatsApp below.";
}

export function shouldOfferWhatsApp(input: string): boolean {
  const msg = input.toLowerCase();
  return /price|custom|order|quote|buy|purchase|contact|whatsapp|call/.test(msg);
}
