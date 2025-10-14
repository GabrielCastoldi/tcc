import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CadastroProfissional.css';
import seringa from '/images/seringa.png';

export default function CadastroProfissional() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    idade: '', 
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

    const idadeNum = parseInt(form.idade, 10);
    if (isNaN(idadeNum) || idadeNum < 0 || idadeNum > 120) {
      setError('Insira uma idade válida entre 0 e 120.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/api/auth/cadastrar-paciente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, idade: idadeNum }),
      });

      if (response.ok) {
        navigate('/cpf');
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
        <h2>CADASTRAR UM PACIENTE</h2>
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
            type="number"
            name="idade"
            placeholder="Idade"
            value={form.idade}
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
          
          <button type="submit" className="btn-cadastrar" disabled={isLoading}>
            {isLoading ? 'CADASTRANDO...' : 'CADASTRAR'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
