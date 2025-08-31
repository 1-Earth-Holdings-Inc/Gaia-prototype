export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5001/api';

export async function apiFetch(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  
  console.log(`🌐 API Request: ${method} ${API_BASE}${path}`);
  console.log(`   Headers:`, headers);
  if (body) console.log(`   Body:`, body);
  
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  
  console.log(`📡 Response Status: ${res.status} ${res.statusText}`);
  
  const data = await res.json().catch(() => ({}));
  console.log(`📄 Response Data:`, data);
  
  if (!res.ok) {
    console.error(`❌ API Error: ${res.status} - ${data.message || data.error || 'Request failed'}`);
    throw new Error(data.message || data.error || 'Request failed');
  }
  
  return data;
}


