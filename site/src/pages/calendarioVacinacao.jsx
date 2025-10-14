
import '../css/CalendarioVacinacao.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function CalendarioVacinacao() {
  const [nomeVacina, setNomeVacina] = useState('');
  const [lote, setLote] = useState('');
  const [doseAplicada, setDoseAplicada] = useState('');
  const [posto, setPosto] = useState('');
  const [proximaData, setProximaData] = useState('');
  const [dataAtual, setDataAtual] = useState('');
  const navigate = useNavigate();
  const { cpf } = useParams();

  console.log(cpf);

  useEffect(() => {
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    setDataAtual(dataFormatada);
  }, []);

  const handleTrocarPaciente = () => {
    navigate('/cpf');
  };

  const handleSair = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      nomeVacina,
      lote,
      doseAplicada,
      posto,
      proximaData
    });
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
          <h1>CADASTRAR VACINAÇÃO</h1>
          <h3>DATA DE VACINAÇÃO: {dataAtual}</h3>

          <form onSubmit={handleSubmit} className="form-vacinacao">
          <div className="input-vacinacao">
            <input
              type="text"
              placeholder="Nome da vacina"
              value={nomeVacina}
              onChange={(e) => setNomeVacina(e.target.value)}
              required
            />
          </div>

          <div className="input-vacinacao">
            <input
              type="text"
              placeholder="Lote"
              value={lote}
              onChange={(e) => setLote(e.target.value)}
              required
            />
          </div>

          <div className="input-vacinacao">
            <input
              type="number"
              placeholder="Dose aplicada"
              value={doseAplicada}
              onChange={(e) => setDoseAplicada(e.target.value)}
              required
            />
          </div>

          <div className="input-vacinacao">
            <input
              type="text"
              placeholder="Posto de aplicação"
              value={posto}
              onChange={(e) => setPosto(e.target.value)}
              required
            />
          </div>

          <div className="input-vacinacao">
            <label> Próxima data de vacinação</label>
            <input
              type="date"
              value={proximaData}
              onChange={(e) => setProximaData(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-vacinacao">CADASTRAR</button>
        </form>
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