"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { BRAND, WHATSAPP_INQUIRY } from "@/lib/constants";
import {
  getAIResponse,
  shouldOfferWhatsApp,
  type ChatMessage,
} from "@/lib/ai-assistant";

const QUICK_PROMPTS = [
  "3D Frame pricing",
  "Custom Shreenathji frame",
  "Jain religious art",
  "Delivery time",
  "Materials used",
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Namaste! I'm the ${BRAND.name} Art Assistant. Ask me about our 3D/4D/5D frames, Shreenathji art, custom orders, materials, or pricing — I'm here to help!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setShowWhatsApp(shouldOfferWhatsApp(text));

    // Fix: Math.random() hata kar fixed 1200ms delay kiya hai (Build safe)
    setTimeout(() => {
      const response = getAIResponse(text);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
      setIsTyping(false);
      if (shouldOfferWhatsApp(text)) setShowWhatsApp(true);
    }, 1200); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-white/10 bg-black-soft/90 shadow-[0_0_60px_rgba(124,58,237,0.25)] backdrop-blur-2xl sm:w-[380px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.08] bg-gradient-to-r from-purple-900/30 to-transparent px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/15">
                <Sparkles className="h-5 w-5 text-purple-300" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">Art Assistant</h4>
                <p className="text-xs text-white/40">{isTyping ? "Typing..." : "Online · AI Powered"}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="chat-scrollbar flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-4 sm:max-h-80">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "ml-auto rounded-br-sm bg-purple-600/80 text-white"
                      : "rounded-bl-sm border border-white/[0.08] bg-white/[0.05] text-white/75"
                  }`}
                >
                  {msg.content}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex max-w-[85%] gap-1.5 rounded-2xl rounded-bl-sm border border-white/[0.08] bg-white/[0.05] px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-purple-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              )}

              {showWhatsApp && !isTyping && (
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  href={WHATSAPP_INQUIRY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/30 px-4 py-2.5 text-xs font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/30"
                >
                  Chat on WhatsApp with {BRAND.owner}
                </motion.a>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            <div className="flex flex-wrap gap-1.5 border-t border-white/[0.06] px-4 py-3">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] text-white/50 transition-colors hover:border-purple-500/30 hover:text-white/80"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/[0.06] px-4 py-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about frames, pricing..."
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-purple-500/40"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white transition-colors hover:bg-purple-500 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-purple-500/30 bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-[0_0_40px_rgba(124,58,237,0.5)]"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!isOpen && <span className="absolute inset-0 animate-ping rounded-full border border-purple-400/40" />}
      </motion.button>
    </div>
  );
}