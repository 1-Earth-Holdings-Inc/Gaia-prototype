/**
 * Application configuration constants
 */

export const APP_CONFIG = {
  name: 'Gaia',
  description: 'Gaia Platform - Environmental Stewardship and Sustainable Action',
  version: '1.0.0'
};

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5001/api',
  timeout: 10000
};

export const STORAGE_KEYS = {
  token: 'gaia_token',
  newUser: 'newUser'
};

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  forgot: '/forgot',
  earthCharter: '/earth-charter',
  dashboard: '/dashboard'
};

export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true
};
