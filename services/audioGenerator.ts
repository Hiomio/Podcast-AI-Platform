import axios from 'axios';
import { logger } from '../utils/debug-utils/logger';
import { getVoiceForRole } from '../utils/voiceAssigner';

export interface AudioGenerationResult {
  audioBuffer: Buffer;
  messageIndex: number;
  role: string;
}

export const generateSingleMessageAudio = async (
  message: { role: 'host' | 'guest'; content: string },
  messageIndex: number,
  requestId: string
): Promise<AudioGenerationResult> => {
  try {
    const voiceId = getVoiceForRole(message.role);
    
    logger.debug(`[${requestId}] Generating audio for message ${messageIndex}`, {
      role: message.role,
      voiceId,
      contentLength: message.content.length
    });

    // Correct Murf API structure following temp-murf.ts pattern
    const response = await axios.post<ArrayBuffer>(
      "https://api.murf.ai/v1/speech/stream",
      {
        text: message.content,
        voiceId: voiceId,
      },
      {
        headers: {
          "api-key": process.env.MURF_API_KEY as string,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // Critical for binary audio
      }
    );

    logger.debug(`[${requestId}] Audio generated for message ${messageIndex}`);
    
    return {
      audioBuffer: Buffer.from(response.data), // Direct binary data
      messageIndex,
      role: message.role
    };
  } catch (error) {
    logger.error(`[${requestId}] Failed to generate audio for message ${messageIndex}`, error);
    throw error;
  }
};
