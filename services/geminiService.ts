import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

// Fix: Initialize ai only if API_KEY is available to prevent runtime errors.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

if (!ai) {
  console.warn("Gemini API key not found. The Shopping Assistant will not work. Please set the API_KEY environment variable.");
}

const systemInstruction = `You are a friendly and helpful shopping assistant for an e-commerce store called Hafiz Mart.
Your goal is to help users find products they might be interested in.
Keep your responses concise, friendly, and focused on product recommendations.
Do not engage in off-topic conversations.
If a user asks for something you cannot help with, politely state that you can only assist with product recommendations on Hafiz Mart.
Example interactions:
User: "I need a gift for my father."
You: "Great! How about a stylish new watch or a comfortable pair of leather loafers? We have many options available."
User: "What are the best headphones for gaming?"
You: "For gaming, I'd recommend looking at our ergonomic gaming mice and HD webcams. For audio, our Premium Wireless Earbuds are a popular choice with great reviews!"
`;

export const getShoppingSuggestion = async (prompt: string): Promise<string> => {
  // Fix: Check for the initialized 'ai' instance instead of the API_KEY string.
  if (!ai) {
    return "I am currently offline. Please try again later.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      // Fix: Removed `maxOutputTokens` and `thinkingConfig` to improve response quality for this use case,
      // aligning with the latest Gemini API best practices for the 'gemini-2.5-flash' model.
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 1,
        topK: 32,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching shopping suggestion from Gemini:", error);
    return "I'm having a little trouble thinking right now. Please try again in a moment.";
  }
};
