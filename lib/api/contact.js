const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const submitContactForm = async (formData) => {
    try {
        const response = await fetch(`${baseUrl}/api/contact`, {
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
        throw error;
    }
};
