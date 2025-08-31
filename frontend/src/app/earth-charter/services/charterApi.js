import { apiFetch } from '@/shared/lib/api';

/**
 * Earth Charter API service
 */
export const signEarthCharter = async (signatureData) => {
  const response = await apiFetch('/user/sign-earth-charter', {
    method: 'POST',
    body: signatureData
  });
  
  return response;
};

export const getEarthCharterStatus = async () => {
  const response = await apiFetch('/user/earth-charter-status', {
    method: 'GET'
  });
  
  return response;
};
