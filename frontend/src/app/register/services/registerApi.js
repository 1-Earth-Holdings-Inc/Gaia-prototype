import { apiFetch } from '@/shared/lib/api';

/**
 * Registration API service
 */
export const registerUser = async (userData) => {
  const response = await apiFetch('/auth/register', {
    method: 'POST',
    body: userData
  });
  
  return response;
};

export const checkEmailAvailability = async (email) => {
  const response = await apiFetch('/auth/check-email', {
    method: 'POST',
    body: { email }
  });
  
  return response;
};
