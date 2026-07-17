"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  X,
  Loader2,
  Volume2,
  Settings2,
} from "lucide-react";

const chat12 = "/chatbot.svg";

const HTTP_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "https://chatbot-latest-b683.onrender.com";
const WS_URL = HTTP_API_URL.replace(/^http/, "ws") + "/web-agent/ws";

interface Message {
  role: "ai" | "user";
  text: string;
}

export default function VoiceBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<string>("idle"); // idle, listening, processing, speaking
  const [messages, setMessages] = useState<Message[]>([]);
  const [language] = useState("hi");
  const [hint, setHint] = useState("Hold button to speak");

  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // Handle WebSocket Connection
  useEffect(() => {
    if (isOpen && !wsRef.current) {
      connectWS();
    } else if (
      isOpen &&
      wsRef.current?.readyState === WebSocket.OPEN &&
      !hasOpenedRef.current
    ) {
      triggerGreeting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  function connectWS() {
    setStatus("processing");
    setHint("Connecting to AI...");

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("idle");
      setHint("Hold button to speak");
      triggerGreeting();
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      handleWSMessage(msg);
    };

    ws.onclose = () => {
      setStatus("processing");
      setHint("Reconnecting...");
      setTimeout(() => {
        if (wsRef.current === ws) wsRef.current = null;
        if (isOpen) connectWS();
      }, 3000);
    };

    ws.onerror = () => {};
  }

  function triggerGreeting() {
    if (hasOpenedRef.current || !wsRef.current) return;
    hasOpenedRef.current = true;
    
    const context = {
      url: typeof window !== "undefined" ? window.location.href : "",
      title: typeof document !== "undefined" ? document.title : "",
      description: typeof document !== "undefined" ? document.querySelector('meta[name="description"]')?.getAttribute("content") || "" : "",
      bodyText: typeof document !== "undefined" && document.body ? document.body.innerText.substring(0, 3000) : "",
    };

    wsRef.current.send(
      JSON.stringify({ type: "open", lang: language, context })
    );
  }

  function handleWSMessage(msg: any) {
    switch (msg.type) {
      case "status":
        setStatus(msg.state);
        const hints: Record<string, string> = {
          idle: "Hold button to speak",
          listening: "Recording - release to send",
          processing: "Processing...",
          speaking: "AI is speaking",
        };
        setHint(msg.message || hints[msg.state] || "");
        break;

      case "reply":
        setMessages((prev) => [...prev, { role: "ai", text: msg.text }]);
        break;

      case "transcript":
        setMessages((prev) => [...prev, { role: "user", text: msg.text }]);
        break;

      case "audio":
        playAudio(msg.data, msg.format || "wav");
        break;

      case "error":
        setHint("⚠️ " + msg.message);
        setStatus("idle");
        break;

      default:
        break;
    }
  }

  async function startRecording() {
    if (
      status === "processing" ||
      status === "listening" ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    )
      return;
    stopAudio();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";
      const mediaRec = new MediaRecorder(stream, { mimeType: mime });
      mediaRecRef.current = mediaRec;

      mediaRec.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result instanceof ArrayBuffer) {
              const arr = new Uint8Array(reader.result);
              let bin = "";
              arr.forEach((b) => (bin += String.fromCharCode(b)));
              wsRef.current?.send(
                JSON.stringify({ type: "audio", data: btoa(bin) })
              );
            }
          };
          reader.readAsArrayBuffer(e.data);
        }
      };

      wsRef.current.send(JSON.stringify({ type: "start", lang: language }));
      mediaRec.start(200);
      setStatus("listening");

      mediaRec.onstop = () => stream.getTracks().forEach((t) => t.stop());
    } catch (err) {
      setHint("⚠️ Mic access denied");
    }
  }

  function stopRecording() {
    if (status !== "listening" || !mediaRecRef.current) return;
    mediaRecRef.current.stop();
    mediaRecRef.current = null;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "stop" }));
    }
  }

  function playAudio(b64: string, format: string) {
    stopAudio();
    const mime = format === "wav" ? "audio/wav" : "audio/mpeg";
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const blob = new Blob([bytes], { type: mime });
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    audioRef.current = audio;

    audio.onended = () => {
      URL.revokeObjectURL(url);
      setStatus("idle");
      setHint("Hold button to speak");
      audioRef.current = null;
    };
    audio.play().catch(() => {});
  }

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }

  function clearHistory() {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "clear" }));
    }
    setMessages([]);
    stopAudio();
  }

  return (
    <div className="relative flex flex-col items-end z-50">
      {/* Chat Panel */}
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
            {/* Header */}
            <div className="bg-[#6c63ff] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full bg-white/15 flex items-center justify-center ring-2 ring-white/30 ${status === "speaking" ? "animate-pulse ring-white/60 shadow-[0_0_15px_rgba(255,255,255,0.5)]" : ""}`}
                >
                  <Mic size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">
                    Voice Assistant
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full inline-block bg-orange-400" />
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

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar" style={{ backgroundColor: "var(--bg-primary)" }}>
              {messages.length === 0 && status === "idle" && (
                <div className="flex justify-center items-center h-full text-neutral-400 text-sm">
                  Press and hold the microphone to start speaking.
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

              {/* Typing/Processing Indicator */}
              {status === "processing" && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-[#6c63ff] flex items-center justify-center shrink-0 mr-2 mt-1">
                    <Loader2 size={12} className="text-white animate-spin" />
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

              {/* Speaking Indicator */}
              {status === "speaking" && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-[#6c63ff] flex items-center justify-center shrink-0 mr-2 mt-1">
                    <Volume2 size={12} className="text-white animate-pulse" />
                  </div>
                  <div className="text-[#6c63ff] text-xs font-medium border shadow-sm px-3 py-2 rounded-2xl rounded-bl-sm flex items-center gap-2" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 bg-[#6c63ff] animate-[pulse_0.8s_ease-in-out_infinite] h-[30%]" />
                      <span className="w-0.5 bg-[#6c63ff] animate-[pulse_0.8s_ease-in-out_0.2s_infinite] h-[70%]" />
                      <span className="w-0.5 bg-[#6c63ff] animate-[pulse_0.8s_ease-in-out_0.4s_infinite] h-[100%]" />
                      <span className="w-0.5 bg-[#6c63ff] animate-[pulse_0.8s_ease-in-out_0.6s_infinite] h-[60%]" />
                      <span className="w-0.5 bg-[#6c63ff] animate-[pulse_0.8s_ease-in-out_0.8s_infinite] h-[40%]" />
                    </div>
                    Speaking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input (Mic Area) */}
            <div className="border-t p-4 flex flex-col items-center gap-2 shrink-0" style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border)" }}>
              <p className="text-xs min-h-[16px] text-center" style={{ color: "var(--text-muted)" }}>
                {hint}
              </p>

              <div className="relative flex items-center justify-center my-2">
                {/* Ping rings when listening */}
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
                  onTouchStart={(e) => {
                    e.preventDefault();
                    startRecording();
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    stopRecording();
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                  disabled={status === "processing"}
                  className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 select-none ${
                    status === "listening"
                      ? "bg-orange-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] scale-110"
                      : status === "processing"
                        ? "bg-amber-500 opacity-50 cursor-not-allowed"
                        : status === "speaking"
                          ? "bg-orange-500"
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={chat12}
                alt="Voice Chat"
                className="w-24 h-24 object-contain drop-shadow-lg group-hover:scale-110 transition-transform"
              />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification dot — only when closed */}
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
