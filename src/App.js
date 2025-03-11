import './App.css';
import userImage from './images/do-utilizador.png';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Login-area">
          <img src={userImage} className="User-img" alt="Imagem de usuário" />
          <p>Faça seu login:</p>

          <input
            type="text"
            placeholder="Usuário"
            className="User"
          />

          <input
            type="password"
            placeholder="Senha"
            className="Password"
          />

          <button type="submit" className="login-button">Entrar</button>
        </div>
      </header>
    </div>
  );
}

export default App;
