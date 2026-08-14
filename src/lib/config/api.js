/**
 * Resolves the API base URLs for both the browser and the server.
 *
 * In the browser we go through the Next.js rewrites declared in next.config.js
 * (`/hrms-proxy/*` and `/chatbot-proxy/*`) so requests stay same-origin.
 *
 * On the server (RSC render, static generation, ISR revalidation) those rewrites
 * do not exist yet -- the deployment is not serving traffic while it is being
 * built -- so a relative path either fails to parse or hangs until the build
 * times out. Server-side we therefore talk to the upstream origins directly.
 * These must stay in sync with the `rewrites()` targets in next.config.js.
 */

const isBrowser = typeof window !== "undefined";

const HRMS_UPSTREAM =
  process.env.LOCAL_HRMS_URL || "https://dh8ut0pnb37w5.cloudfront.net/hrms";
const CHATBOT_UPSTREAM =
  process.env.LOCAL_CHATBOT_URL || "https://chatbot-latest-b683.onrender.com";

const stripTrailingSlash = (url) => url.replace(/\/+$/, "");

const resolve = (publicPath, upstream, fallbackPath) => {
  const clientUrl = stripTrailingSlash(publicPath || fallbackPath);

  // Absolute URLs are already usable from anywhere.
  if (/^https?:\/\//i.test(clientUrl)) return clientUrl;

  return isBrowser ? clientUrl : stripTrailingSlash(upstream);
};

export const API_BASE_URL = resolve(
  process.env.NEXT_PUBLIC_API_BASE_URL,
  HRMS_UPSTREAM,
  "/hrms-proxy",
);

export const CHATBOT_API_URL = resolve(
  process.env.NEXT_PUBLIC_CHATBOT_API_URL,
  CHATBOT_UPSTREAM,
  "/chatbot-proxy",
);

/** Hard ceiling for server-side data fetches so a slow backend can never stall a build. */
export const SERVER_FETCH_TIMEOUT_MS = 10_000;
