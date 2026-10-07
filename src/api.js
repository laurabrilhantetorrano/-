// ─── Configuração da API ─────────────────────────────────────
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '');

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const config = {
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  };

  if (!(options.body instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`, config);

  let data = {};
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw {
      status: response.status,
      ...(typeof data === 'object' ? data : { erro: data }),
    };
  }

  return data;
}

export function formatarPreco(valor) {
  const num = Number(valor);
  if (Number.isNaN(num)) return 'R$ 0,00';

  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function normalizarImagem(url) {
  if (!url) return null;
  if (url.startsWith('http://back-ahgw.onrender.com')) {
    return url.replace('http://', 'https://');
  }
  return url;
}

export { API_URL };
export default apiFetch;
