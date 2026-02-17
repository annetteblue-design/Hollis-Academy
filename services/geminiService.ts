
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Fixed: Always use a named parameter for apiKey and obtain it exclusively from process.env.API_KEY.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateResponse(systemInstruction: string, prompt: string, history: {role: string, content: string}[] = []) {
    // Fixed: Use ai.models.generateContent directly with model and prompt parameters.
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // Fixed: Accessed .text as a property (not a method).
    return response.text || "I'm having trouble connecting to the network, Agent.";
  }

  async analyzeBias(text: string) {
    // Fixed: Configured responseSchema and responseMimeType for robust JSON output.
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following text for potential biases or stereotypes. \n\nText: "${text}"`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: 'Bias score from 0 to 10',
            },
            biasesFound: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of specific biases or stereotypes found',
            },
            suggestion: {
              type: Type.STRING,
              description: 'A constructive suggestion for making the text more objective',
            },
          },
          required: ['score', 'biasesFound', 'suggestion'],
        },
      }
    });
    // Fixed: Accessed .text as a property.
    return JSON.parse(response.text || '{}');
  }
}

export const gemini = new GeminiService();
