import React, { useState } from 'react';
import '../css/cpf.css'; 
import { useNavigate } from 'react-router-dom';

export default function Cpf() {
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();

  const handleAvancar = () => {
    // Aqui você pode validar o CPF antes de navegar
    navigate('/calendario-vacinacao');
  };

  const handleRelatorio = () => {
    navigate('/relatorio-vacinacao'); 
  };

  const handleSair = () => {
    navigate('/'); 
  };

  return (
    <div>
      <header className="menu-cpf">
        <button className="btn-menu" onClick={handleRelatorio}>
          RELATÓRIO
        </button>
        <button className="btn-menu" onClick={handleSair}>
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

        <button className="btn-cpf" onClick={handleAvancar}>
          BUSCAR
        </button>
      </div>
    </div>
  );
}
