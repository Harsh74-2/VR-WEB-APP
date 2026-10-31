// errorHandler.js

// Custom error class for API-related errors
// Extends the built-in Error class with additional 'status' property
class APIError extends Error {
    constructor(message, status) {
      super(message);
      this.name = 'APIError';
      this.status = status;
    }
  }
  
  // Higher-order function to wrap async functions with error handling
  export const asyncErrorHandler = (fn) => (
    async (...args) => {
      try {
        return await fn(...args);
      } catch (error) {
        // Log the error and re-throw it
        console.error('Async operation failed:', error);
        throw error;
      }
    }
  );
  
  // Function to handle API responses and throw custom errors if needed
  export const handleAPIResponse = async (response) => {
    if (!response.ok) {
      // Try to parse error data from response, use empty object if parsing fails
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(errorData.message || 'API request failed', response.status);
    }
    return response.json();
  };
  
  // General purpose error logging function
  export const logError = (error, context = '') => {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error);
    // Placeholder for more advanced logging (e.g., sending to a server)
  };
  
  // Function to convert errors into user-friendly messages
  export const getUserFriendlyErrorMessage = (error) => {
    if (error instanceof APIError) {
      // Provide specific messages based on HTTP status codes
      switch (error.status) {
        case 400:
          return 'The request was invalid. Please check your input and try again.';
        case 401:
          return 'You are not authorized to perform this action. Please log in and try again.';
        case 403:
          return 'You do not have permission to access this resource.';
        case 404:
          return 'The requested resource was not found.';
        case 500:
          return 'An unexpected server error occurred. Please try again later.';
        default:
          return 'An error occurred while processing your request.';
      }
    }
    // Generic message for non-API errors
    return 'An unexpected error occurred. Please try again.';
  };
  
  // Export all functions as a default object
  export default {
    APIError,
    asyncErrorHandler,
    handleAPIResponse,
    logError,
    getUserFriendlyErrorMessage,
  };