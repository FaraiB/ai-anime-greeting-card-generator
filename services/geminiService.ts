import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Occasion } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateImage = async (occasion: Occasion): Promise<string> => {
    // --- Mock Image Mode for Development ---
    if (process.env.USE_MOCK_IMAGES === 'true') {
        console.warn("--- MOCK IMAGE MODE: Returning placeholder image. ---");
        const placeholderText = `${occasion.name.replace("'", "")} Card\\n(Mock Image)`;
        return `https://placehold.co/600x800/E879F9/FFFFFF/png?text=${encodeURIComponent(placeholderText)}&font=pacifico`;
    }
    // --- End Mock Image Mode ---

    const prompt = `Generate a cute, high-quality anime-style illustration for a ${occasion.name} greeting card. Featuring ${occasion.imagePromptSubject}. The style should be clean, with vibrant pastel colors, soft lighting, and a heartwarming feel. Focus on a single, clear subject with a simple, elegant background.`;
    
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });

    const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;

    if (base64ImageBytes) {
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
        console.error("Image generation failed. Full response:", response);
        // Provide a more specific error for the known billing issue.
        if (JSON.stringify(response).includes("billed users")) {
             throw new Error("Imagen API requires a billing-enabled Google Cloud project. You can enable 'Mock Image Mode' in your .env.local for development.");
        }
        throw new Error("Image generation failed, no valid image data returned.");
    }
};

const generateMessage = async (occasion: Occasion): Promise<string> => {
    const prompt = `Write a single, short, cute, and heartfelt greeting card message for ${occasion.name}. The message should be warm, cheerful, and unique. Keep it under 40 words. Only return the single message text, without any additional options, numbering, or introductory phrases.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
        config: { 
            temperature: 0.85, // Slightly reduced for more focused, single-option output
            topP: 1,
            topK: 32,
        },
    });

    const messageText = response.text;

    if (!messageText) {
        console.error("Message generation failed. No text returned. Full response:", response);
        throw new Error("Message generation failed, no text content returned from the API.");
    }

    const message = messageText.trim();
    // Defensive coding: if the model still returns a list, take the first item.
    // This handles numbered lists, bulleted lists, etc.
    const firstLine = message.split('\n')[0].replace(/^[\s-]*\*?_?\d*\.?\s*/, '').trim();

    // Remove surrounding quotes which the model sometimes adds
    return firstLine.replace(/^"(.*)"$/, '$1');
};

export const geminiService = {
    generateImage,
    generateMessage,
};