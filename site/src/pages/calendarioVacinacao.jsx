
import '../css/CalendarioVacinacao.css';
import '../css/CadastroVacinacao.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function CalendarioVacinacao() {
  const [nomeVacina, setNomeVacina] = useState('');
  const [lote, setLote] = useState('');
  const [doseAplicada, setDoseAplicada] = useState('');
  const [posto, setPosto] = useState('');
  const [proximaData, setProximaData] = useState('');
  const [dataAtual, setDataAtual] = useState('');
  const [vacinas, setVacinas] = useState([]);
  const [atrasadas, setAtrasadas] = useState([]);
  const navigate = useNavigate();
  const { cpf } = useParams();

  useEffect(() => {
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    setDataAtual(dataFormatada);
    fetchVacinas();
  }, []);

  const handleTrocarPaciente = () => {
    navigate('/cpf');
  };

  const handleSair = () => {
    navigate('/');
  };

  const fetchVacinas = async () => {
    try {
      const response = await fetch(`http://localhost:3333/api/vacinas/${cpf}`);
      const data = await response.json();
      setVacinas(data.calendario || []);
      setAtrasadas(data.atrasadas || []);
    } catch (error) {
      console.error('Erro ao buscar vacinas', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3333/api/vacinas/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf,
          nome_vacina: nomeVacina,
          lote,
          dose: doseAplicada,
          data_aplicacao: new Date().toISOString().split('T')[0],
          proxima_dose_data: proximaData !== '' ? proximaData : null,
          posto_saude: posto
        }),
      });
  
      const data = await response.json();
      alert(data.message);
      fetchVacinas(); // Atualiza a lista após cadastrar
    } catch (error) {
      alert('Erro ao cadastrar');
      console.error('Erro ao cadastrar', error);
    }
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
            />
          </div>

          <button type="submit" className="btn-vacinacao">CADASTRAR</button>
        </form>
        </div>

        <div className="calendario-direita">
          <h2>VACINAS EM ATRASO:</h2>
          <ul>
            {atrasadas.length > 0 ? (
              atrasadas.map((v) => (
                <li key={v.id}>
                  {v.nome_vacina} - Dose: {v.dose || '---'} - Prevista para: {v.proxima_dose_data}
                </li>
              ))
            ) : (
              <p>Nenhuma vacina atrasada 🎉</p>
            )}
          </ul>
          <hr className="divisor" />

          <h2>TODAS AS VACINAS:</h2>
          <ul>
          {vacinas.length > 0 ? (
            vacinas.map((v) => (
              <li key={v.id}>
                {v.nome_vacina} - {v.status} - Aplicada em: {v.data_aplicacao || '---'}
              </li>
            ))
          ) : (
            <p>Nenhuma vacina registrada.</p>
          )}
        </ul>
        </div>
      </div>
    </div>
  );
}