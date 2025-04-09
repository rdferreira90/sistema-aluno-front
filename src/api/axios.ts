// src/api/axios.ts
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🎯 Mapeamento de mensagens padrão por status
const defaultMessages: Record<number, string> = {
  400: 'Requisição inválida.',
  401: 'Sessão expirada. Faça login novamente.',
  403: 'Você não tem permissão para isso.',
  404: 'Recurso não encontrado.',
  500: 'Erro interno do servidor. Tente novamente mais tarde.',
  503: 'Serviço temporariamente indisponível.',
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || defaultMessages[status] || 'Erro inesperado.';

    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.error(message);
      window.location.href = '/login';
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
