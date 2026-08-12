import { notifyError } from './request';

// The contact endpoint is this site's own serverless function (api/index.js,
// routed by the /api/(.*) rewrite in vercel.json), not the HRMS backend, so it
// is addressed same-origin rather than through API_BASE_URL.
export const submitContactForm = async (formData) => {
    try {
        const response = await fetch(`/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            return await response.json();
        } else {
            const errorResult = await response.json().catch(() => ({ message: "An unexpected error occurred. Please try again." }));
            throw new Error(errorResult.message);
        }
    } catch (error) {
        console.error("Error submitting contact form:", error.message);
        notifyError(error.message || "Failed to submit contact form.");
        throw error;
    }
};
