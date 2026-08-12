import { CHATBOT_API_URL } from '../config/api';

export const sendChatMessage = async (messages) => {
    try {
        const response = await fetch(`${CHATBOT_API_URL}/chat`, {
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
        const response = await fetch(`${CHATBOT_API_URL}/chat`, {
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
