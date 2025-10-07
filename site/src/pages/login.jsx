import React, { useState } from 'react';
import { IoPersonSharp, IoLockClosedSharp } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";
import seringa from '/images/seringa.png';
import '../css/Login.css';

export default function Login() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  return (
    <div className="login-tela">
      <div className="login-esquerda">
        <div className="circulo-icone">
        <img src={seringa} alt="ícone de seringa" style={{ width: '100px', height: '100px' }} />
        </div>
      </div>

      <div className="login-direita">
        <h2>ENTRAR</h2>

        <div className="input-login">
          <IoPersonSharp className="icon" />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>

        <div className="input-login">
          <IoLockClosedSharp   className="icon" />

          <input
            type="password"
            placeholder="SENHA"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button className="btn-login" onClick={() => navigate("/cpf")}>ENTRAR</button>

        <p className="link-cadastro">
          <a href="/cadastro-profissional">CADASTRAR COMO PROFISSIONAL DE SAÚDE</a>
        </p>
      </div>
    </div>
  );
}
