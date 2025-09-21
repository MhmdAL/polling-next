// lib/config.ts

export const config = {
  apiUrl: process.env.NEXT_PUBLIC_BEE_API_URL || 'http://localhost:5000',
} as const;

export default config;
