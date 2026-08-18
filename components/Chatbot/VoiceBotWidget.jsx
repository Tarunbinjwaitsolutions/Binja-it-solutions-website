"use client";

/**
 * Voice launcher (purple). The spoken entry point to the same conversation the
 * text widget uses -- see AssistantChatProvider.
 *
 * Replies are only read aloud while this panel is open and unmuted, so a question
 * typed into the chat widget never starts talking at the visitor unexpectedly.
 */

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Volume2, VolumeX, RotateCcw, Send, Loader2 } from "lucide-react";

import { renderBotMessage, toSpeakableText } from "@/lib/chat/botMessage";
import { useAssistantContext } from "@/lib/chat/assistantChatContext";
import { useSpeechInput, useSpeechOutput } from "@/lib/chat/useSpeech";
import { useTranscriptScroll } from "@/lib/chat/useTranscriptScroll";

const launcherIcon = "/chatbot.svg";

export default function VoiceBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [interim, setInterim] = useState("");
  const [speakReplies, setSpeakReplies] = useState(true);

  const { messages, isSending, send, reset, subscribeToReplies } = useAssistantContext();
  const { containerRef, endRef, handleScroll } = useTranscriptScroll(
    isOpen,
    messages,
    isSending,
  );
  const {
    isSupported: canSpeak,
    isSpeaking,
    speak,
    cancel: cancelSpeech,
  } = useSpeechOutput();

  // Only listen for replies while the panel is open and unmuted.
  useEffect(() => {
    if (!isOpen || !speakReplies) return undefined;
    return subscribeToReplies((text) => speak(toSpeakableText(text)));
  }, [isOpen, speakReplies, subscribeToReplies, speak]);

  const submit = useCallback(
    (text) => {
      const value = (text ?? "").trim();
      if (!value || isSending) return;
      cancelSpeech();
      setInput("");
      setInterim("");
      send(value);
    },
    [isSending, send, cancelSpeech],
  );

  const mic = useSpeechInput({
    onFinalTranscript: submit,
    onInterimTranscript: setInterim,
  });

  function closePanel() {
    setIsOpen(false);
    mic.stop();
    cancelSpeech();
    setInterim("");
  }

  function handleMicClick() {
    if (mic.isListening) {
      mic.stop();
      return;
    }
    cancelSpeech();
    mic.start();
  }

  function handleReset() {
    mic.stop();
    cancelSpeech();
    setInput("");
    setInterim("");
    reset();
  }

  const status = mic.isListening
    ? "Listening…"
    : isSending
      ? "Processing…"
      : isSpeaking
        ? "Speaking…"
        : "Ready";

  const hint =
    mic.error ||
    (mic.isListening
      ? "Listening — tap the mic to stop."
      : mic.isSupported
        ? "Tap the mic to speak, or type below."
        : "Voice input isn't supported in this browser — please type.");

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
            style={{
              transformOrigin: "bottom right",
              height: "500px",
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
            className="mb-4 w-80 sm:w-[360px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border"
            aria-label="Voice assistant"
          >
            {/* Header */}
            <div className="bg-[#6c63ff] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center ring-2 ring-white/30 shrink-0">
                  <Mic size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight truncate">
                    Voice Assistant
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`w-2 h-2 rounded-full inline-block ${
                        mic.isListening
                          ? "bg-red-400 animate-pulse"
                          : mic.error
                            ? "bg-red-500"
                            : "bg-orange-400"
                      }`}
                    />
                    <span className="text-white/80 text-xs">{status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {canSpeak && (
                  <button
                    onClick={() => {
                      if (speakReplies) cancelSpeech();
                      setSpeakReplies((on) => !on);
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label={speakReplies ? "Mute spoken replies" : "Hear replies aloud"}
                    title={speakReplies ? "Mute spoken replies" : "Hear replies aloud"}
                    aria-pressed={speakReplies}
                  >
                    {speakReplies ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>
                )}
                {messages.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Start a new conversation"
                    title="Start a new conversation"
                  >
                    <RotateCcw size={15} />
                  </button>
                )}
                <button
                  onClick={closePanel}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close voice assistant"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={containerRef}
              onScroll={handleScroll}
              className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 chat-scroll"
              style={{ backgroundColor: "var(--bg-primary)" }}
              aria-live="polite"
            >
              {messages.length === 0 && (
                <div
                  className="flex justify-center items-center h-full text-sm text-center px-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  Tap the microphone and ask about our services — I&apos;ll answer out loud.
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-[#6c63ff] flex items-center justify-center shrink-0 mr-2 mt-1">
                      <Mic size={12} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap wrap-break-word ${
                      m.role === "user"
                        ? "bg-[#010032] text-white rounded-br-sm"
                        : "shadow-sm rounded-bl-sm border"
                    }`}
                    style={
                      m.role === "user"
                        ? {}
                        : {
                            backgroundColor: "var(--bg-card)",
                            color: "var(--text-primary)",
                            borderColor: "var(--border)",
                          }
                    }
                  >
                    {m.role === "bot" ? renderBotMessage(m.text) : m.text}
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-[#6c63ff] flex items-center justify-center shrink-0 mr-2 mt-1">
                    <Loader2 size={12} className="text-white animate-spin" />
                  </div>
                  <div
                    className="border shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1"
                    style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                  >
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
              <div ref={endRef} />
            </div>

            {/* Composer: mic first, typing always available as a fallback */}
            <div
              className="border-t px-3 pt-2 pb-3 shrink-0"
              style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border)" }}
            >
              <p
                className="text-[11px] mb-2 px-1 text-center"
                style={{ color: mic.error ? "#f97316" : "var(--text-muted)" }}
              >
                {hint}
              </p>

              <div className="relative flex items-center justify-center mb-2">
                {mic.isListening && (
                  <>
                    <span className="absolute w-16 h-16 rounded-full border-2 border-orange-400 opacity-0 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    <span className="absolute w-20 h-20 rounded-full border-2 border-orange-400 opacity-0 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_0.3s_infinite]" />
                  </>
                )}
                <button
                  onClick={handleMicClick}
                  disabled={isSending || !mic.isSupported}
                  className={`relative z-10 w-14 h-14 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 select-none disabled:cursor-not-allowed ${
                    mic.isListening
                      ? "bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)] scale-110"
                      : isSending || !mic.isSupported
                        ? "bg-amber-500 opacity-50"
                        : "bg-[#6c63ff] hover:bg-[#5a52d5] hover:scale-105 shadow-lg"
                  }`}
                  aria-label={mic.isListening ? "Stop listening" : "Start listening"}
                  aria-pressed={mic.isListening}
                >
                  <Mic size={24} className="text-white pointer-events-none" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  value={mic.isListening && interim ? interim : input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      submit(input);
                    }
                  }}
                  placeholder={mic.isListening ? "Listening…" : "Or type your question…"}
                  disabled={isSending || mic.isListening}
                  className="flex-1 min-w-0 text-sm outline-none rounded-full px-4 py-2 border transition-colors disabled:opacity-60"
                  style={{
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border)",
                  }}
                />
                <button
                  onClick={() => submit(input)}
                  disabled={isSending || !input.trim()}
                  className="w-9 h-9 rounded-full bg-[#6c63ff] flex items-center justify-center text-white hover:bg-[#5a52d5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher */}
      <motion.button
        onClick={() => (isOpen ? closePanel() : setIsOpen(true))}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        animate={isOpen ? {} : { y: [0, -5, 0, -3, 0] }}
        transition={
          isOpen
            ? {}
            : { repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 1 }
        }
        className="relative flex items-center justify-center group"
        aria-label={isOpen ? "Close voice assistant" : "Open voice assistant"}
        aria-expanded={isOpen}
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
                src={launcherIcon}
                alt="Voice chat"
                priority
                className="w-24 h-24 object-contain drop-shadow-lg group-hover:scale-110 transition-transform"
                width={800}
                height={800}
              />
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
