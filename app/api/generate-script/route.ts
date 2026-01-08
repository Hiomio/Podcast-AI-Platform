import { NextRequest, NextResponse } from 'next/server'
import { generateScript } from '@/services/gemini.service'
import { scrapedContent } from '@/services/contentScraping'
import { logger } from '@/utils/debug-utils/logger'
import { handleApiError } from '@/utils/debug-utils/errorHandler'

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substr(2, 9);
  
  try {
    logger.info(`[${requestId}] Script generation request started`);
    
    const { url } = await request.json();
    logger.debug(`[${requestId}] Processing URL: ${url}`);

    if (!url) {
      logger.warn(`[${requestId}] Missing URL in request`);
      return NextResponse.json(
        { error: 'URL is required', requestId },
        { status: 400 }
      );
    }

    // Scrape content
    logger.debug(`[${requestId}] Starting content scraping`);
    const scrapedData = await scrapedContent(url);
    logger.debug(`[${requestId}] Content scraped`, {
      contentLength: scrapedData.content.length,
      title: scrapedData.title
    });
    
    // Generate conversation
    logger.debug(`[${requestId}] Starting script generation`);
    const conversation = await generateScript(scrapedData.content, scrapedData.title);
    logger.info(`[${requestId}] Script generated successfully`, {
      messageCount: conversation.length,
      sourceUrl: url,
      articleTitle: scrapedData.title
    });

    return NextResponse.json({
      success: true,
      conversation: conversation,
      metadata: {
        requestId,
        sourceUrl: url,
        articleTitle: scrapedData.title,
        generatedAt: new Date().toISOString(),
        messageCount: conversation.length
      }
    });

  } catch (error) {
    const errorResponse = handleApiError(error, 'generate-script');
    logger.error(`[${requestId}] Script generation failed`, {
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