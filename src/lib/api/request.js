import toast from "react-hot-toast";
import { SERVER_FETCH_TIMEOUT_MS } from "../config/api";

const isBrowser = typeof window !== "undefined";

/**
 * react-hot-toast only exists in the browser. Calling it while a page is being
 * rendered on the server throws ("toast.error is not a function") and masks the
 * real network error, so every user-facing toast goes through this guard.
 */
export const notifyError = (message) => {
    if (isBrowser) toast.error(message);
};

/**
 * fetch with a hard timeout when running on the server, so an unreachable or
 * slow backend can never stall static generation past Next's 60s page budget.
 */
export const apiFetch = (url, options = {}) => {
    if (isBrowser || options.signal) return fetch(url, options);

    return fetch(url, {
        ...options,
        signal: AbortSignal.timeout(SERVER_FETCH_TIMEOUT_MS),
    });
};
