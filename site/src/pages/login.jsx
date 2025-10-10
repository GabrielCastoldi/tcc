import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import seringa from '/images/seringa.png';
import '../css/Login.css';

export default function Login() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault(); 
    setError(''); 
    setIsLoading(true); 

    try {
      const response = await fetch('http://localhost:3333/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cpf, senha })
      });

      if (response.ok) {
        navigate('/cpf');
      } 
      else {
        const data = await response.json();
        setError(data.message || 'Falha no login. Verifique suas credenciais.');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      console.error('Erro na requisição de login:', err);
    } finally {
      setIsLoading(false); 
    }
  };


  return (
    <div className="login-tela">
      <div className="login-esquerda">
        <div className="circulo-icone">
        <img src={seringa} alt="ícone de seringa" style={{ width: '100px', height: '100px' }} />
        </div>
      </div>

      <div className="login-direita">
        <h2>ENTRAR</h2>

        <form onSubmit={handleLogin}>
          <div className="input-login">
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>

          <div className="input-login">
            <input
              type="password"
              placeholder="SENHA"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button className="btn-login" type="submit" disabled={isLoading}>
            {isLoading ? 'ENTRANDO...' : 'ENTRAR'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p className="link-cadastro">
          <a href="/cadastro-profissional">CADASTRAR COMO PROFISSIONAL DE SAÚDE</a>
        </p>
      </div>
    </div>
  );
}
