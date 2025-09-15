/**
 * Configuration for the GDE Frontend
 */

// Get API configuration
export const getApiConfig = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://yummy-cymbre-orangecorp-43ef562b.koyeb.app';
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://yummy-cymbre-orangecorp-43ef562b.koyeb.app/api/v1';

  // Debug log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('API Configuration:', {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      resolved_apiUrl: apiUrl,
      resolved_apiBaseUrl: apiBaseUrl
    });
  }

  return {
    apiUrl,
    apiBaseUrl
  };
};

export const config = getApiConfig();