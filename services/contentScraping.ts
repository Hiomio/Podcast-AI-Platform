import {extract} from "@extractus/article-extractor";
// @ts-ignore
import * as htmlToText from "html-to-text";
import { logger } from "../utils/debug-utils/logger";
import { withTiming } from "../utils/debug-utils/performance";
import { AppError } from "../utils/debug-utils/errorHandler";

export const scrapedContent = async(url: string) => {
    const requestId = Math.random().toString(36).substr(2, 9);
    
    return withTiming(async () => {
        try {
            logger.debug(`[${requestId}] Starting content scraping for URL: ${url}`);
            
            const article = await extract(url);
            logger.debug(`[${requestId}] Article extraction completed`, {
                hasContent: !!article?.content,
                contentLength: article?.content?.length || 0,
                title: article?.title || 'No title'
            });
            
            if (!article || !article.content) {
                throw new AppError("Failed to extract article content", 'CONTENT_EXTRACTION_FAILED', 400, {
                    url,
                    hasArticle: !!article,
                    hasContent: !!article?.content
                });
            }
            
            const cleanText = htmlToText.convert(article.content);
            logger.debug(`[${requestId}] HTML to text conversion completed`, {
                originalLength: article.content.length,
                cleanLength: cleanText.length
            });
            
            const limitedText = cleanText.slice(0, 8000);
            logger.info(`[${requestId}] Content scraping successful`, {
                finalLength: limitedText.length,
                wasTruncated: cleanText.length > 8000,
                url,
                title: article.title
            });
            
            // Return both content and title
            return {
                content: limitedText,
                title: article.title || 'Untitled Article'
            };
        } catch (error) {
            logger.error(`[${requestId}] Content scraping failed`, {
                error: error instanceof Error ? error.message : 'Unknown error',
                url,
                stack: error instanceof Error ? error.stack : undefined
            });
            
            if (error instanceof AppError) {
                throw error;
            }
            
            throw new AppError(`Failed to scrape content: ${error instanceof Error ? error.message : 'Unknown error'}`, 'SCRAPING_ERROR', 500, {
                url,
                originalError: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }, `scrapedContent-${requestId}`);
};