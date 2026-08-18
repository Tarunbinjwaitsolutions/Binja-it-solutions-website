"use client";

/**
 * Keeps a chat transcript pinned to the newest message *unless* the visitor has
 * scrolled up to read history -- in which case jumping them back to the bottom
 * every time the bot replies makes older messages impossible to read.
 */

import { useCallback, useEffect, useRef } from "react";

// How close to the bottom still counts as "following the conversation".
const PIN_THRESHOLD_PX = 64;

export function useTranscriptScroll(isOpen, messages, isSending) {
  const containerRef = useRef(null);
  const endRef = useRef(null);
  const pinnedRef = useRef(true);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    pinnedRef.current = distanceFromBottom <= PIN_THRESHOLD_PX;
  }, []);

  // Re-opening the panel should always land on the latest message.
  useEffect(() => {
    if (!isOpen) return;
    pinnedRef.current = true;
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !pinnedRef.current) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isOpen, messages, isSending]);

  return { containerRef, endRef, handleScroll };
}
