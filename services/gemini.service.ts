import { GoogleGenAI } from "@google/genai";
import { podcastPrompt } from "@/prompts/podcastPrompt";
import { logger } from "@/utils/debug-utils/logger";
import { withTiming } from "@/utils/debug-utils/performance";
import { AppError } from "@/utils/debug-utils/errorHandler";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({apiKey});

export const generateScript = async (articleContent: string, articleTitle?: string) => {
    const requestId = Math.random().toString(36).substr(2, 9);
    
    return withTiming(async () => {
        try {
            logger.debug(`[${requestId}] Starting Gemini API call`);
            logger.debug(`[${requestId}] Article content length: ${articleContent.length}`);
            logger.debug(`[${requestId}] Article title: ${articleTitle || 'No title'}`);
            
            const prompt = podcastPrompt(articleContent, articleTitle);
            logger.debug(`[${requestId}] Generated prompt, calling Gemini API`);
            
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                }
            });
            
            const rawResponse = response.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!rawResponse) {
                throw new AppError('No response content received from Gemini', 'EMPTY_RESPONSE', 500);
            }
            
            logger.debug(`[${requestId}] Raw Gemini response received`, { 
                responseLength: rawResponse.length 
            });
            
            // Clean the response - remove markdown code blocks
            const cleanedResponse = rawResponse
                .replace(/```json\s*/g, '')  
                .replace(/```\s*/g, '')      
                .trim();
            
            logger.debug(`[${requestId}] Response cleaned, attempting JSON parse`);
            const answer = JSON.parse(cleanedResponse);
            
            logger.info(`[${requestId}] Script generated successfully`, {
                conversationLength: answer.length,
                firstMessage: answer[0]?.role,
                totalMessages: answer.length
            });
            
            return answer;
            
        } catch (error) {
            logger.error(`[${requestId}] Gemini API error`, {
                error: error instanceof Error ? error.message : 'Unknown error',
                articleLength: articleContent.length,
                stack: error instanceof Error ? error.stack : undefined
            });
            
            if (error instanceof SyntaxError) {
                throw new AppError('Failed to parse Gemini response as JSON', 'JSON_PARSE_ERROR', 500, {
                    originalError: error.message
                });
            }
            
            throw new AppError(`Failed to generate script: ${error instanceof Error ? error.message : 'Unknown error'}`, 'GEMINI_API_ERROR', 500);
        }
    }, `generateScript-${requestId}`);
}

export default ai;
