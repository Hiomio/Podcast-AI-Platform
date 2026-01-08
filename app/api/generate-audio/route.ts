import { NextRequest, NextResponse } from 'next/server'
import { generateCompletePodcast } from '@/services/podcastGenerator'
import { logger } from '@/utils/debug-utils/logger'
import { handleApiError } from '@/utils/debug-utils/errorHandler'

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substr(2, 9);
  
  try {
    logger.info(`[${requestId}] Multi-voice audio generation request started`);
    
    const { conversation } = await request.json();
    logger.debug(`[${requestId}] Processing conversation`, {
      messageCount: conversation?.length || 0,
      hasConversation: !!conversation
    });

    if (!conversation || !Array.isArray(conversation)) {
      logger.warn(`[${requestId}] Invalid conversation data`, {
        hasConversation: !!conversation,
        isArray: Array.isArray(conversation)
      });
      return NextResponse.json(
        { error: 'Conversation data is required', requestId },
        { status: 400 }
      );
    }

    logger.info(`[${requestId}] Generating multi-voice podcast for ${conversation.length} messages`);

    // Generate complete podcast using new modular system
    const audioBuffer = await generateCompletePodcast(conversation);
    
    logger.info(`[${requestId}] Multi-voice podcast generated successfully`, {
      audioSize: audioBuffer.length,
      messageCount: conversation.length
    });

    return new NextResponse(audioBuffer as any, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="podcast.mp3"',
        'Content-Length': audioBuffer.length.toString(),
        'X-Request-ID': requestId
      },
    });

  } catch (error) {
    const errorResponse = handleApiError(error, 'generate-audio');
    logger.error(`[${requestId}] Multi-voice audio generation failed`, {
      error: errorResponse,
      requestId
    });
    
    return NextResponse.json(
      { 
        ...errorResponse,
        requestId
      },
      { status: errorResponse.code === 'INVALID_CONVERSATION' ? 400 : 500 }
    );
  }
}