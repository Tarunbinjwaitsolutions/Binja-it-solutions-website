const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const rawChatbotApiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "";

const getAbsoluteUrl = (url) => {
  if (typeof window === "undefined" && url.startsWith("/")) {
    const host = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : `http://localhost:${process.env.PORT || 3000}`;
    return `${host}${url}`;
  }
  return url;
};

export const API_BASE_URL = getAbsoluteUrl(rawApiBaseUrl);
export const CHATBOT_API_URL = getAbsoluteUrl(rawChatbotApiUrl);
