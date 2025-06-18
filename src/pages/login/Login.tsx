
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {getPermissionsFromToken, login} from '../../api/auth';
import { LoginCredentials } from '../../types/user';
import userImage from '../../assets/images/do-utilizador.png';
import logo from '../../assets/images/logo-vida-relevante.png';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const AuthContext = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Usuário e senha são obrigatórios');
      return;
    }

    try {
      const credentials: LoginCredentials = { username, password };
      const { token, user } = await login(credentials);      
      AuthContext.login(user, token);      
      const perms = getPermissionsFromToken();
      if (perms!= null && perms.permissionsByUnit.length > 1) {
        navigate('/select-unit');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login');      
    }
  };

  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Logo" />
        <div className="Login-area">
          <img src={userImage} className="User-img" alt="Imagem de usuário" />
          <p>Faça seu login:</p>

          <input
            type="text"
            placeholder="Usuário"
            className="User"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button onClick={handleLogin} className="login-button">Entrar</button>
        </div>
      </header>
    </div>

  );
}
