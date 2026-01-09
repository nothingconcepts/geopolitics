
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getIntelligenceBriefing = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Provide a high-level geopolitical intelligence briefing on: ${topic}. 
      Focus on strategic implications for the Middle East, potential risks, and "bold" predictions. 
      Format as professional executive summary with bullet points.`,
      config: {
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Briefing Error:", error);
    return "Intelligence briefing unavailable at this time. Please check back later.";
  }
};
