import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CadastroProfissional.css';
import seringa from '/images/seringa.png';

export default function CadastroProfissional() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    coren: '',
    telefone: '',
    codigo: '',
    senha: '',
    confirmarSenha: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setIsLoading(true); 

    if (form.senha !== form.confirmarSenha) {
      setError('A senha e a confirmação de senha não coincidem.');
      setIsLoading(false);
      return;
    }

    const { confirmarSenha, ...dadosParaEnvio } = form;

    try {
      const response = await fetch('http://localhost:3333/api/auth/cadastrar-enfermeira', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnvio),
      });

      if (response.ok) {
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao cadastrar. Tente novamente.');
      }
    } catch (err) {
      setError('Não foi possível conectar ao servidor. Tente mais tarde.');
      console.error('Erro na requisição:', err);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="cadastro-profissional-tela">
      <div className="cadastro-esquerda">
        <div className="circulo-icone">
          <img
            src={seringa}
            alt="ícone de seringa"
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      </div>

      <div className="cadastro-direita">
        <h2>CRIAR UMA CONTA</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="coren"
            placeholder="Nº Coren"
            value={form.coren}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone / Celular"
            value={form.telefone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="codigo"
            placeholder="Código de acesso"
            value={form.codigo}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmação de senha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-cadastrar" disabled={isLoading}>
            {isLoading ? 'CADASTRANDO...' : 'CADASTRAR'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
