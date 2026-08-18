"use client";

/**
 * Transport + conversation state for the Binjwa assistant.
 *
 * The Flask backend (Websitebot/app.py) is stateful: it stores the lead-qualification
 * state machine (NEW -> CHATTING -> AWAITING_NAME -> ...) in MongoDB keyed by
 * `session_id`, which the client must echo back on every request. Without it the
 * server mints a fresh session per message, so every reply is prefixed with the
 * welcome text and the lead flow can never advance past its first step.
 *
 * The id lives in sessionStorage so a visitor keeps one conversation while browsing
 * the site, and both the typed and the spoken path share it.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { CHATBOT_API_URL } from "@/lib/config/api";

const SESSION_KEY = "binjwa.chat.session_id";

function readStoredSession() {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null; // private mode / storage disabled
  }
}

function writeStoredSession(id) {
  if (typeof window === "undefined") return;
  try {
    if (id) window.sessionStorage.setItem(SESSION_KEY, id);
    else window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* non-fatal: the id still lives in the ref for this page view */
  }
}

const CONNECTION_ERROR =
  "Sorry, I'm having trouble connecting right now. Please try again in a moment.";

export function useAssistantChat({ onBotReply } = {}) {
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [hasError, setHasError] = useState(false);

  const sessionIdRef = useRef(null);
  const inFlightRef = useRef(false);
  // Kept in a ref so `send` stays referentially stable while still calling the
  // caller's latest handler. Assigned after commit rather than during render.
  const replyHandlerRef = useRef(onBotReply);
  useEffect(() => {
    replyHandlerRef.current = onBotReply;
  }, [onBotReply]);

  const send = useCallback(async (raw) => {
    const message = (raw || "").trim();
    if (!message || inFlightRef.current) return;

    inFlightRef.current = true;
    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setIsSending(true);
    setHasError(false);

    if (sessionIdRef.current === null) sessionIdRef.current = readStoredSession();

    try {
      const res = await fetch(`${CHATBOT_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          ...(sessionIdRef.current ? { session_id: sessionIdRef.current } : {}),
        }),
      });

      if (!res.ok) throw new Error(`Server returned status ${res.status}`);

      const data = await res.json();

      if (data.session_id && data.session_id !== sessionIdRef.current) {
        sessionIdRef.current = data.session_id;
        writeStoredSession(data.session_id);
      }

      const text = data.response || "Sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { role: "bot", text }]);
      replyHandlerRef.current?.(text);
    } catch (error) {
      console.error("Assistant API error:", error);
      setMessages((prev) => [...prev, { role: "bot", text: CONNECTION_ERROR }]);
      setHasError(true);
    } finally {
      inFlightRef.current = false;
      setIsSending(false);
    }
  }, []);

  /** Drops the local transcript and starts a brand new server-side session. */
  const reset = useCallback(() => {
    sessionIdRef.current = null;
    writeStoredSession(null);
    setMessages([]);
    setHasError(false);
  }, []);

  return { messages, isSending, hasError, send, reset };
}
