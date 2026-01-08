import pLimit from 'p-limit';
import { logger } from '../utils/debug-utils/logger';
import { generateSingleMessageAudio, AudioGenerationResult } from './audioGenerator';


export const processConversationAudio = async (
  conversation: Array<{ role: 'host' | 'guest'; content: string }>,
  requestId: string
): Promise<AudioGenerationResult[]> => {
  try {
    logger.info(`[${requestId}] Starting parallel audio processing for ${conversation.length} messages`);
    
 //   const voiceAssignment = getVoiceAssignment();
    const limit = pLimit(3); // Max 3 concurrent requests
    
    // Generate all audio in parallel (order preserved by Promise.all)
    const audioResults = await Promise.all(
      conversation.map((message, index) => 
        limit(() => generateSingleMessageAudio(message, index,requestId))
      )
    );

    logger.info(`[${requestId}] All audio generated successfully`);
    return audioResults;
  } catch (error) {
    logger.error(`[${requestId}] Audio processing failed`, error);
    throw error;
  }
};
