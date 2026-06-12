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

    setTimeout(() => {
      const response = getAIResponse(text);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
      setIsTyping(false);
      if (shouldOfferWhatsApp(text)) setShowWhatsApp(true);
    }, 800 + Math.random() * 600);
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
                <h4 className="text-sm font-semibold text-white">
                  Art Assistant
                </h4>
                <p className="text-xs text-white/40">
                  {isTyping ? "Typing..." : "Online · AI Powered"}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Close chat"
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
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* WhatsApp CTA */}
              {showWhatsApp && !isTyping && (
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  href={WHATSAPP_INQUIRY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/30 px-4 py-2.5 text-xs font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/30"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
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
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 border-t border-white/[0.06] px-4 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about frames, pricing..."
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-purple-500/40"
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white transition-colors hover:bg-purple-500 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-purple-500/30 bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-[0_0_40px_rgba(124,58,237,0.5)]"
        aria-label={isOpen ? "Close Art Assistant" : "Open Art Assistant"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <span className="absolute inset-0 animate-ping rounded-full border border-purple-400/40" />
        )}
      </motion.button>
    </div>
  );
}
