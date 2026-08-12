import { API_BASE_URL } from '../config/api';

export const submitContactForm = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
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
        toast.error(error.message || "Failed to submit contact form.");
        throw error;
    }
};
