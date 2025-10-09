import React, { useState } from 'react';
import '../css/CalendarioVacinacao.css';
import { useNavigate } from 'react-router-dom';

export default function CalendarioVacinacao() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());

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
            <ul>
              <li>05/05 - Vacina Tríplice Viral</li>
              <li>08/05 - Vacina BCG</li>
            </ul>

          <hr className="divisor" />

          <h2>VACINA SELECIONADA:</h2>
            <ul>
              <li>14/10 - Vacina Tríplice Viral</li>
              <p>Data da última vacina: 07/03/2025</p>
            </ul>
        </div>
      </div>
    </div>
  );
}
