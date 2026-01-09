
import { GoogleGenAI } from "@google/genai";

export const getIntelligenceBriefing = async (topic: string) => {
  // Always create a new instance right before the call to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Provide a high-level geopolitical intelligence briefing on: ${topic}. 
      Focus on strategic implications for the Middle East, potential risks, and "bold" predictions. 
      Format as professional executive summary with bullet points.`,
      config: {
        // Letting the model decide the thinking budget is recommended for general tasks
        // unless specific constraints are required.
      }
    });

    // response.text is a property, not a method.
    return response.text;
  } catch (error) {
    console.error("Gemini Briefing Error:", error);
    if (error instanceof Error && error.message.includes("entity was not found")) {
      // This is a hint to the UI that a key reset might be needed if this were a user-provided key context,
      // but here we just return a user-friendly error.
      return "Strategic analysis failed. The intelligence node reported an invalid authorization state.";
    }
    return "Intelligence briefing unavailable at this time. Our secure uplink is currently unstable.";
  }
};
