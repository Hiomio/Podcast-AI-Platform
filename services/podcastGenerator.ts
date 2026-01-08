import { logger } from '../utils/debug-utils/logger';
import { processConversationAudio } from './audioProcessor';
import { mergeAudioBuffers } from './audioMerger';

export const generateCompletePodcast = async (
  conversation: Array<{ role: 'host' | 'guest'; content: string }>
): Promise<Buffer> => {
  const requestId = Math.random().toString(36).substr(2, 9);
  
  try {
    logger.info(`[${requestId}] Starting complete podcast generation for ${conversation.length} messages`);
    
    // Step 1: Generate all audio in parallel with role-based voices
    const audioResults = await processConversationAudio(conversation, requestId);
    
    // Step 2: Merge audio buffers in order
    const finalAudio = await mergeAudioBuffers(audioResults, requestId);
    
    logger.info(`[${requestId}] Podcast generation completed successfully`, {
      finalSize: finalAudio.length,
      messageCount: conversation.length
    });
    
    return finalAudio;
  } catch (error) {
    logger.error(`[${requestId}] Podcast generation failed`, error);
    throw error;
  }
};
