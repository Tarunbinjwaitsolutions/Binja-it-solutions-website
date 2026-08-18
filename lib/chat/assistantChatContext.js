"use client";

/**
 * The context object and its reader, kept apart from the provider component so
 * that file exports a component and nothing else (React Fast Refresh only
 * re-renders modules whose exports are all components).
 */

import { createContext, useContext } from "react";

export const AssistantChatContext = createContext(null);

export function useAssistantContext() {
  const context = useContext(AssistantChatContext);
  if (!context) {
    throw new Error("useAssistantContext must be used inside <AssistantChatProvider>");
  }
  return context;
}
