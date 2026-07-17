"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const chat12 = "/chat.svg";

const CHATBOT_API = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "https://chatbot-latest-b683.onrender.com";

interface Message {
  role: "bot" | "user";
  text: string;
}

const WELCOME_MESSAGE: Message = {
  role: "bot",
  text: "Hi! I'm Binjwa's AI assistant. Ask me anything about our services — web development, AI solutions, digital marketing, compliance, and more!",
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch(`${CHATBOT_API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.response || "Sorry, I couldn't process that.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Connection error. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="relative flex flex-col items-end z-50">
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, scale: 0.6, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{ transformOrigin: "bottom right", height: "500px", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            className="mb-4 w-80 sm:w-[360px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border"
            aria-label="Chatbot"
          >
            {/* Header */}
            <div className="bg-[#010032] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center ring-2 ring-white/30">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">
                    Binjwa Assistant
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                    <span className="text-white/65 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar" style={{ backgroundColor: "var(--bg-primary)" }}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-[#010032] flex items-center justify-center shrink-0 mr-2 mt-1">
                      <MessageCircle size={12} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#010032] text-white rounded-br-sm"
                        : "shadow-sm rounded-bl-sm border"
                    }`}
                    style={m.role === "user" ? {} : { backgroundColor: "var(--bg-card)", color: "var(--text-primary)", borderColor: "var(--border)" }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-[#010032] flex items-center justify-center shrink-0 mr-2 mt-1">
                    <MessageCircle size={12} className="text-white" />
                  </div>
                  <div className="border shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                    <span
                      className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"
                      style={{ animationDelay: "160ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"
                      style={{ animationDelay: "320ms" }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t px-3 py-3 flex items-center gap-2 shrink-0" style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border)" }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                disabled={loading}
                className="flex-1 text-sm outline-none rounded-full px-4 py-2 border transition-colors disabled:opacity-60" style={{ color: "var(--text-primary)", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-full bg-[#010032] flex items-center justify-center text-white hover:bg-[#374f67] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        animate={isOpen ? {} : { y: [0, -5, 0, -3, 0] }}
        transition={
          isOpen
            ? {}
            : {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                repeatDelay: 1,
              }
        }
        className="relative flex items-center justify-center"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-14 h-14 rounded-full bg-[#010032] shadow-xl flex items-center justify-center text-white"
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={chat12}
                alt="Chat"
                className="w-24 h-24 object-contain drop-shadow-lg"
              />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Red notification dot — only when closed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.span
              key="dot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0.5 right-0.5 w-3.5 h-3.5"
            >
              <span className="absolute inset-0 rounded-full bg-orange-500" />
              <span className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-75" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
