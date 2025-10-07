import React, { useState, useEffect } from 'react';
import '../css/CadastroVacinacao.css';
import { useNavigate } from 'react-router-dom';

export default function CadastroVacinacao() {
  const [nomeVacina, setNomeVacina] = useState('');
  const [lote, setLote] = useState('');
  const [doseAplicada, setDoseAplicada] = useState('');
  const [posto, setPosto] = useState('');
  const [proximaData, setProximaData] = useState('');
  const [dataAtual, setDataAtual] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    setDataAtual(dataFormatada);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      nomeVacina,
      lote,
      doseAplicada,
      posto,
      proximaData
    });
    navigate('/calendario-vacinacao');
  };

  const handleSair = () => {
    navigate('/calendario-vacinacao');
  };

  return (
    <div className="tela-vacinacao-menu">
      <header className="menu-vacinacao">
        <button className="btn-menu" onClick={handleSair}>X</button>
      </header>

      <main className="tela-vacinacao">
        <h2>CADASTRAR VACINAÇÃO</h2>
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
      </main>
    </div>
  );
}
