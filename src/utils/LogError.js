export const logError = (message, error) => {
    // Send to external service here (e.g., Sentry or your custom server)
    // For now, it's a silent fallback to avoid console logs in production
    if (import.meta.env.NODE_ENV !== "production") {
      console.error(message, error); // Keep visible in development only
    }
  };