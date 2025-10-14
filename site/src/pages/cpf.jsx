import React, { useState } from 'react';
import '../css/cpf.css'; 
import { useNavigate } from 'react-router-dom';

export default function Cpf() {
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!cpf.trim()) { 
      setError('O CPF é obrigatório.');
      return; 
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3333/api/pacientes/encontrar-paciente/${cpf}`, {
        method: 'GET',
      });

      if (response.ok) {
        navigate(`/${cpf}/calendario`);
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao procurar. Tente novamente.');
      }
    } catch (err) {
      setError('Não foi possível conectar ao servidor. Tente mais tarde.');
      console.error('Erro na requisição:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePatient = () => {
    navigate('/cadastro-paciente'); 
  };

  const handleReport = () => {
    navigate('/relatorio-vacinacao'); 
  };

  const handleExit = () => {
    navigate('/'); 
  };

  return (
    <div>
      <header className="menu-cpf">
        <button className="btn-menu" onClick={handleCreatePatient}>
          CADASTRAR PACIENTE
        </button>
        <button className="btn-menu" onClick={handleReport}>
          RELATÓRIO
        </button>
        <button className="btn-menu" onClick={handleExit}>
          SAIR
        </button>
      </header>

      <div className="tela-cpf">
      
        <h2>INFORME O CPF DO PACIENTE:</h2>

        <div className="input-cpf">
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
        </div>

            {error && <p className="error-message">{error}</p>}
        <button className="btn-cpf" type="submit" disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? 'BUSCANDO...' : 'BUSCAR'}
            </button>
      </div>
    </div>
  );
}
