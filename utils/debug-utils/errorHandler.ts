import { logger } from './logger';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown, context: string) => {
  if (error instanceof AppError) {
    return {
      error: error.message,
      code: error.code,
      ...(process.env.NODE_ENV === 'development' && { details: error.details })
    };
  }
  
  logger.error(`Unexpected error in ${context}`, error);
  return {
    error: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR'
  };
};
