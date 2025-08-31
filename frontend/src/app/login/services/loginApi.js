import { apiFetch } from '@/shared/lib/api';

/**
 * Login API service
 */
export const loginUser = async (email, password) => {
  const response = await apiFetch('/auth/login', {
    method: 'POST',
    body: { email, password }
  });
  
  return response;
};

export const requestPasswordReset = async (email) => {
  const response = await apiFetch('/auth/forgot-password', {
    method: 'POST',
    body: { email }
  });
  
  return response;
};
