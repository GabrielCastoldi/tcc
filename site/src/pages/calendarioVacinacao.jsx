import React, { useState, useEffect } from 'react';
import '../css/CalendarioVacinacao.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CalendarioVacinacao() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    if (location.state && location.state.paciente) {
      setPaciente(location.state.paciente);
    }
  }, [location.state]);

  const handleTrocarPaciente = () => {
    navigate('/cpf');
  };

  const handleNovaVacinacao = () => {
    navigate('/cadastro-vacinacao');
  };

  const handleSair = () => {
    navigate('/');
  };

  return (
    <div className="calendario-tela">
      <header className="calendario-menu">
        <button className="btn-menu" onClick={handleTrocarPaciente}>
          TROCAR DE PACIENTE
        </button>
        <button className="btn-menu" onClick={handleSair}>
          SAIR
        </button>
      </header>

      <div className="calendario-titulo">
        <div className="calendario-esquerda">
          <h1>CALENDÁRIO DE VACINAÇÃO</h1>

          <button className="btn-nova-vacinacao" onClick={handleNovaVacinacao}>
            NOVA VACINAÇÃO
          </button>
        </div>

        <div className="calendario-direita">
          <h2>VACINAS EM ATRASO:</h2>
          
          <hr className="divisor" />

          <h2>TODAS AS VACINAS:</h2>
      
        </div>
      </div>
    </div>
  );
}