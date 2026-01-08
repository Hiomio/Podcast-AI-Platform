import { logger } from '../utils/debug-utils/logger';
import { AudioGenerationResult } from './audioGenerator';

export const mergeAudioBuffers = async (
  audioResults: AudioGenerationResult[],
  requestId: string
): Promise<Buffer> => {
  try {
    logger.info(`[${requestId}] Starting audio merge for ${audioResults.length} files`);
    
    // Sort by index to maintain conversation order
    const sortedResults = audioResults.sort((a, b) => a.messageIndex - b.messageIndex);
    
    // Calculate total length
    const totalLength = sortedResults.reduce((sum, result) => sum + result.audioBuffer.length, 0);
    
    // Create concatenated buffer (simple concatenation, no FFmpeg needed)
    const result = Buffer.alloc(totalLength);
    let offset = 0;
    
    for (const audioResult of sortedResults) {
      audioResult.audioBuffer.copy(result, offset);
      offset += audioResult.audioBuffer.length;
      
      logger.debug(`[${requestId}] Merged message ${audioResult.messageIndex} (${audioResult.role})`);
    }
    
    logger.info(`[${requestId}] Audio merge completed successfully`, {
      totalSize: result.length,
      messageCount: sortedResults.length
    });
    
    return result;
  } catch (error) {
    logger.error(`[${requestId}] Audio merge failed`, error);
    throw error;
  }
};

