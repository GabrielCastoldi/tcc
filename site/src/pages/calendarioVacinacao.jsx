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

  if (!paciente) {
    return <div>Carregando dados do paciente...</div>;
  }

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
          {paciente.atrasadas && paciente.atrasadas.length > 0 ? (
            <ul>
              {paciente.atrasadas.map((vacina, index) => (
                <li key={index}>
                  {vacina.nome_vacina} - Dose: {vacina.dose} - Prevista para: {vacina.proxima_dose_data}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma vacina em atraso.</p>
          )}

          <hr className="divisor" />

          <h2>TODAS AS VACINAS:</h2>
          {paciente.calendario && paciente.calendario.length > 0 ? (
            <ul>
              {paciente.calendario.map((vacina, index) => (
                <li key={index}>
                  {vacina.data_aplicacao ? vacina.data_aplicacao : 'Agendada'} - {vacina.nome_vacina} ({vacina.dose}) - Status: {vacina.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>{paciente.message || 'Nenhuma vacina encontrada.'}</p>
          )}
        </div>
      </div>
    </div>
  );
}