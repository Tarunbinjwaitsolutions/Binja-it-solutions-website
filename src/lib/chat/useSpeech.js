"use client";

/**
 * Browser speech in / speech out for the assistant widget.
 *
 * Both hooks degrade to `isSupported: false` rather than throwing, because the
 * Web Speech API is still unevenly implemented (Firefox ships no recognition at
 * all, and iOS Safari only exposes the webkit-prefixed constructor).
 *
 * All listener state is kept in refs: the recognition object fires `onend` /
 * `onresult` outside React's render cycle, so closing over state values there
 * captures a stale snapshot -- the bug that used to leave the old voice widget
 * stuck on "Listening..." after the browser auto-stopped the mic.
 */

import { useCallback, useEffect, useRef, useState } from "react";

// The backend answers in English and Hinglish; en-IN recognises both far better
// than en-US, which mangles Hinglish into nonsense words.
const LANG = "en-IN";

/**
 * Chromium's recognition is a *cloud* service: audio goes to Google's servers.
 * Brave blocks that endpoint by default and Chromium forks often ship without an
 * API key, both of which surface as a bare "network" error -- which reads like the
 * user's internet is down when it is really the browser refusing the service.
 */
const RECOGNITION_ERRORS = {
  "no-speech": "No speech detected — try again.",
  "not-allowed": "Microphone access blocked. Allow it in your browser settings.",
  "service-not-allowed": "This browser blocks voice input. Try Chrome or Edge, or type below.",
  network: "Voice service unavailable in this browser. Try Chrome or Edge, or type below.",
  "audio-capture": "No microphone found.",
};

const getRecognitionCtor = () =>
  typeof window === "undefined"
    ? null
    : window.SpeechRecognition || window.webkitSpeechRecognition || null;

export function useSpeechInput({ onFinalTranscript, onInterimTranscript } = {}) {
  // Detected during the initial render rather than in an effect: the assistant is
  // mounted client-side only, so `window` is already there and we avoid the extra
  // render pass that would briefly hide the mic button.
  const [isSupported] = useState(() => Boolean(getRecognitionCtor()));
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);
  const listeningRef = useRef(false);
  const finalRef = useRef(onFinalTranscript);
  const interimRef = useRef(onInterimTranscript);

  useEffect(() => {
    finalRef.current = onFinalTranscript;
    interimRef.current = onInterimTranscript;
  }, [onFinalTranscript, onInterimTranscript]);

  useEffect(() => {
    const SpeechRecognition = getRecognitionCtor();
    if (!SpeechRecognition) return undefined;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = LANG;

    recognition.onstart = () => {
      listeningRef.current = true;
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      let final = "";
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const chunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) final += chunk;
        else interim += chunk;
      }
      if (final) finalRef.current?.(final.trim());
      else if (interim) interimRef.current?.(interim);
    };

    recognition.onerror = (event) => {
      // "aborted" is what we get from our own stop() call -- not worth surfacing.
      if (event.error === "aborted") return;
      setError(RECOGNITION_ERRORS[event.error] || `Audio error: ${event.error}`);
    };

    recognition.onend = () => {
      listeningRef.current = false;
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      try {
        recognition.abort();
      } catch {
        /* already stopped */
      }
      recognitionRef.current = null;
    };
  }, []);

  const start = useCallback(() => {
    if (!recognitionRef.current || listeningRef.current) return;
    setError(null);
    try {
      recognitionRef.current.start();
    } catch {
      /* start() throws if the engine has not fully released yet */
    }
  }, []);

  const stop = useCallback(() => {
    if (!recognitionRef.current || !listeningRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch {
      /* nothing to stop */
    }
  }, []);

  const toggle = useCallback(() => {
    if (listeningRef.current) stop();
    else start();
  }, [start, stop]);

  return { isSupported, isListening, error, start, stop, toggle };
}

/**
 * Browsers expose a mix of voice engines, and `getVoices()` order is meaningless.
 * Windows in particular lists the old SAPI5 voices (David, Zira, Heera, Ravi)
 * first -- these are the flat, robotic ones. The neural voices ("... Online
 * (Natural)") and Chrome's bundled Google voices sound dramatically better, so
 * score every candidate and take the winner instead of the first en-IN match.
 */
function scoreVoice(voice) {
  const name = voice.name || "";
  let score = 0;

  if (/natural|neural/i.test(name)) score += 100;
  else if (/^google/i.test(name)) score += 80;
  else if (/\b(aria|jenny|guy|libby|sonia|neerja|prabhat|emma|brian)\b/i.test(name)) score += 40;

  // Legacy desktop synthesisers: usable, but only as a last resort.
  if (/\b(david|zira|mark|hazel|heera|ravi|microsoft server)\b/i.test(name)) score -= 60;

  // Cloud-backed voices are almost always the better-sounding ones.
  if (voice.localService === false) score += 15;

  const lang = voice.lang || "";
  if (lang === LANG) score += 30;
  else if (/^en[-_](GB|US|AU)/i.test(lang)) score += 20;
  else if (/^en/i.test(lang)) score += 10;
  else score -= 40; // a non-English voice reading English is the worst outcome

  return score;
}

// Chrome silently truncates a long utterance after roughly fifteen seconds, so a
// full paragraph answer gets cut off mid-sentence. Queueing sentence-sized pieces
// avoids that and gives the engine natural places to breathe.
const MAX_CHUNK_CHARS = 180;

function splitForSpeech(text) {
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
  const chunks = [];
  let current = "";

  for (const sentence of sentences) {
    if (current && current.length + sentence.length > MAX_CHUNK_CHARS) {
      chunks.push(current.trim());
      current = "";
    }
    // A single sentence longer than the limit still has to go out in one piece;
    // breaking mid-clause sounds worse than a slightly long chunk.
    current += sentence;
  }
  if (current.trim()) chunks.push(current.trim());

  return chunks.filter(Boolean);
}

export function useSpeechOutput() {
  const [isSupported] = useState(
    () => typeof window !== "undefined" && Boolean(window.speechSynthesis),
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const voiceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return undefined;

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      voiceRef.current = voices.reduce((best, voice) =>
        scoreVoice(voice) > scoreVoice(best) ? voice : best,
      );
    };

    pickVoice();
    // Chrome populates the voice list asynchronously.
    window.speechSynthesis.addEventListener("voiceschanged", pickVoice);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
      window.speechSynthesis.cancel();
    };
  }, []);

  const cancel = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (text) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      if (!text) return;

      window.speechSynthesis.cancel();

      const chunks = splitForSpeech(text);
      if (!chunks.length) return;

      setIsSpeaking(true);

      chunks.forEach((chunk, i) => {
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = voiceRef.current?.lang || LANG;
        if (voiceRef.current) utterance.voice = voiceRef.current;
        // A touch under full speed reads as measured rather than rushed; the
        // default 1.0 on most engines sounds clipped.
        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.volume = 1;

        // Only the final chunk clears the speaking flag -- the queue is still
        // running until then.
        if (i === chunks.length - 1) {
          utterance.onend = () => setIsSpeaking(false);
          utterance.onerror = () => setIsSpeaking(false);
        } else {
          utterance.onerror = () => setIsSpeaking(false);
        }

        window.speechSynthesis.speak(utterance);
      });
    },
    [],
  );

  return { isSupported, isSpeaking, speak, cancel };
}
