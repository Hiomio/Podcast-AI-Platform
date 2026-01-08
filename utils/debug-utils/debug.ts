export const DEBUG_CONFIG = {
  ENABLE_LOGGING: process.env.NODE_ENV === 'development',
  LOG_API_CALLS: process.env.DEBUG_API_CALLS === 'true',
  LOG_PERFORMANCE: process.env.DEBUG_PERFORMANCE === 'true',
  LOG_DETAILED_ERRORS: process.env.NODE_ENV === 'development'
};

export const debugLog = (category: string, message: string, data?: any) => {
  if (DEBUG_CONFIG.ENABLE_LOGGING) {
    console.log(`[DEBUG:${category}] ${message}`, data || '');
  }
};
