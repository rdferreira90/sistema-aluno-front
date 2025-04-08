
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../api/auth';
import { LoginCredentials } from '../types/user';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Usuário e senha são obrigatórios');
      return;
    }

    try {
      const credentials: LoginCredentials = { username, password };
      const { token, user } = await login(credentials);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl mb-4 font-semibold">Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded">
          Entrar
        </button>
      </div>
    </div>
  );
}
