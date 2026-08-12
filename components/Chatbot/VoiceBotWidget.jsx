"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  X,
  MessageCircle,
  Settings2,
  Loader2,
  Send,
} from "lucide-react";

const chat12 = "/chatbot.svg";
const HTTP_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "/chatbot-proxy";

export default function VoiceBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, listening, processing, speaking, error
  const [messages, setMessages] = useState([]);
  const [hint, setHint] = useState("Hold button to speak or type below");
  const [inputText, setInputText] = useState("");

  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    // Check for Speech API support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
      setHint("Voice not supported. Please type.");
    } else {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setStatus("listening");
        setHint("Listening...");
      };

      recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          sendMessage(finalTranscript);
        } else if (interimTranscript) {
          setHint(`Heard: "${interimTranscript}"`);
        }
      };

      recognition.onerror = (event) => {
        setStatus("error");
        if (event.error === 'no-speech') {
          setHint("No speech detected.");
        } else {
          setHint(`⚠️ Audio error: ${event.error}`);
        }
        setTimeout(() => {
          setStatus("idle");
          setHint("Hold button to speak or type below");
        }, 3000);
      };

      recognition.onend = () => {
        if (status === "listening") {
          setStatus("idle");
          setHint("Hold button to speak or type below");
        }
      };

      recognitionRef.current = recognition;
    }
  }, [status]);

  useEffect(() => {
    if (isOpen && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      setMessages([{ role: "ai", text: "Hello! How can I help you today?" }]);
    }
  }, [isOpen]);

  async function sendMessage(text) {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setStatus("processing");
    setHint("Processing...");

    try {
      const res = await fetch(`${HTTP_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.response }]);
      setStatus("idle");
      setHint(isSpeechSupported ? "Hold button to speak or type below" : "Please type your message.");
    } catch (err) {
      console.error("VoiceBot API Error:", err);
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, I'm having trouble connecting right now." }]);
      setStatus("error");
      setHint("⚠️ Connection failed.");
      setTimeout(() => {
        setStatus("idle");
        setHint(isSpeechSupported ? "Hold button to speak or type below" : "Please type your message.");
      }, 3000);
    }
  }

  function handleTextInputSubmit(e) {
    e.preventDefault();
    sendMessage(inputText);
    setInputText("");
  }

  function startRecording() {
    if (!isSpeechSupported || status === "processing" || status === "listening") return;
    try {
      recognitionRef.current?.start();
    } catch (err) { }
  }

  function stopRecording() {
    if (status !== "listening") return;
    try {
      recognitionRef.current?.stop();
    } catch (err) { }
  }

  function clearHistory() {
    setMessages([]);
    hasOpenedRef.current = false;
    if (isOpen) {
      hasOpenedRef.current = true;
      setMessages([{ role: "ai", text: "Hello! How can I help you today?" }]);
    }
  }

  return (
    <div className="relative flex flex-col items-end z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="voice-panel"
            initial={{ opacity: 0, scale: 0.6, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{ transformOrigin: "bottom right", height: "500px", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            className="mb-4 w-80 sm:w-[360px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border"
            aria-label="Voice Assistant"
          >
            <div className="bg-[#6c63ff] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full bg-white/15 flex items-center justify-center ring-2 ring-white/30`}
                >
                  <Mic size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">
                    Voice Assistant
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`w-2 h-2 rounded-full inline-block ${status === "idle" || status === "listening" ? "bg-orange-400" : status === "error" ? "bg-red-500" : "bg-orange-400"}`}
                    />
                    <span className="text-white/80 text-xs capitalize">
                      {status === "idle" ? "Ready" : status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearHistory}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  title="Clear Conversation"
                >
                  <Settings2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar" style={{ backgroundColor: "var(--bg-primary)" }}>
              {messages.length === 0 && status === "idle" && (
                <div className="flex justify-center items-center h-full text-neutral-400 text-sm text-center">
                  Press and hold the microphone to start speaking, or type below.
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "ai" && (
                    <div className="w-6 h-6 rounded-full bg-[#6c63ff] flex items-center justify-center shrink-0 mr-2 mt-1">
                      <Mic size={12} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                        ? "bg-[#010032] text-white rounded-br-sm"
                        : "shadow-sm rounded-bl-sm border"
                      }`}
                    style={m.role === "user" ? {} : { backgroundColor: "var(--bg-card)", color: "var(--text-primary)", borderColor: "var(--border)" }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {status === "processing" && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-[#6c63ff] flex items-center justify-center shrink-0 mr-2 mt-1">
                    <Loader2 size={12} className="text-white animate-spin" />
                  </div>
                  <div className="border shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "160ms" }} />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "320ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4 flex flex-col items-center gap-2 shrink-0" style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border)" }}>
              <p className="text-xs min-h-[16px] text-center" style={{ color: "var(--text-muted)" }}>
                {hint}
              </p>

              <div className="relative flex items-center justify-center my-2 w-full gap-2">
                {status === "listening" && (
                  <>
                    <span className="absolute w-16 h-16 rounded-full border-2 border-orange-400 opacity-0 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    <span className="absolute w-20 h-20 rounded-full border-2 border-orange-400 opacity-0 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_0.3s_infinite]" />
                  </>
                )}
                <button
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  onMouseLeave={stopRecording}
                  onTouchStart={(e) => { e.preventDefault(); startRecording(); }}
                  onTouchEnd={(e) => { e.preventDefault(); stopRecording(); }}
                  onContextMenu={(e) => e.preventDefault()}
                  disabled={status === "processing" || !isSpeechSupported}
                  className={`relative z-10 w-14 h-14 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 select-none ${status === "listening"
                      ? "bg-orange-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] scale-110"
                      : status === "processing" || !isSpeechSupported
                        ? "bg-amber-500 opacity-50 cursor-not-allowed"
                        : "bg-[#6c63ff] hover:bg-[#5a52d5] hover:scale-105 shadow-lg"
                    }`}
                  aria-label="Hold to speak"
                >
                  <Mic size={24} className="text-white pointer-events-none" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
        className="relative flex items-center justify-center group"
        aria-label={isOpen ? "Close voice assistant" : "Open voice assistant"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-14 h-14 rounded-full bg-[#6c63ff] shadow-xl flex items-center justify-center text-white"
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="mic"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Image
                src={chat12}
                alt="Voice Chat"
                priority={true}
                className="w-24 h-24 object-contain drop-shadow-lg group-hover:scale-110 transition-transform"
                width={800} height={800} />
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isOpen && (
            <motion.span
              key="dot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 w-3.5 h-3.5"
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
