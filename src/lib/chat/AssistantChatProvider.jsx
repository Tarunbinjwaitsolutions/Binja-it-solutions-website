"use client";

/**
 * Shares one conversation between the chat widget and the voice widget.
 *
 * The two launchers are separate on purpose, but the Flask backend keys its
 * lead-qualification state machine to a single `session_id`. Giving each widget
 * its own hook instance would mean the server thinks it is mid-way through
 * collecting a phone number while the panel the visitor just opened shows an
 * empty transcript -- so the bot would ask for details out of nowhere. Holding
 * the conversation here keeps both panels showing the same exchange.
 */

import React, { useCallback, useMemo, useRef } from "react";
import { useAssistantChat } from "./useAssistantChat";
import { AssistantChatContext } from "./assistantChatContext";

export function AssistantChatProvider({ children }) {
  // Reply listeners, so the voice widget can read answers aloud without the chat
  // widget needing to know speech exists.
  const listenersRef = useRef(new Set());

  const handleBotReply = useCallback((text) => {
    listenersRef.current.forEach((listener) => listener(text));
  }, []);

  const { messages, isSending, hasError, send, reset } = useAssistantChat({
    onBotReply: handleBotReply,
  });

  const subscribeToReplies = useCallback((listener) => {
    listenersRef.current.add(listener);
    return () => listenersRef.current.delete(listener);
  }, []);

  const value = useMemo(
    () => ({ messages, isSending, hasError, send, reset, subscribeToReplies }),
    [messages, isSending, hasError, send, reset, subscribeToReplies],
  );

  return (
    <AssistantChatContext.Provider value={value}>
      {children}
    </AssistantChatContext.Provider>
  );
}
