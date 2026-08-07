const CHATBOT_API = process.env.NEXT_PUBLIC_CHATBOT_API || 'http://localhost:5005';
const HTTP_API_URL = process.env.NEXT_PUBLIC_HTTP_API_URL || 'http://localhost:5005';

export const sendChatMessage = async (messages) => {
    try {
        const response = await fetch(`${CHATBOT_API}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages }),
        });

        if (!response.ok) {
            throw new Error(`Chat API error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error sending chat message:", error.message);
        throw error;
    }
};

export const sendVoiceChatMessage = async (messages, config = {}) => {
    try {
        const response = await fetch(`${HTTP_API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages, config }),
        });

        if (!response.ok) {
            throw new Error(`Voice Chat API error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error sending voice chat message:", error.message);
        throw error;
    }
};
