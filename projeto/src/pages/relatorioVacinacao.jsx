import React, { useState } from "react";
import "../css/RelatorioVacinacao.css";
import { useNavigate } from "react-router-dom";

export default function RelatorioVacinacao() {
  const navigate = useNavigate();

  const handleTrocarPaciente = () => {
    navigate("/cpf");
  };

  // Lista simulada de pacientes (futuramente virá da API)
  const [pacientes] = useState([
    { nome: "Maria Silva", cpf: "598.359.219-59", vacina: "HEPATITE B", celular: "1993699390" },
    { nome: "João Lima", cpf: "598.359.219-59", vacina: "HEPATITE B", celular: "1993699390" },
    { nome: "José Silva", cpf: "598.359.219-59", vacina: "HEPATITE B", celular: "1993699390" },
    { nome: "Livia Silva", cpf: "598.359.219-59", vacina: "HEPATITE B", celular: "1993699390" },
    { nome: "Lucia Lima", cpf: "598.359.219-59", vacina: "HEPATITE B", celular: "1993699390" },
  ]);

  const handleNotificar = (nome) => {
    alert(`Paciente ${nome} notificado!`);
  };

  const handleExportar = () => {
    alert("Relatório exportado!");
  };

  return (
    <div className="relatorio-tela">
      <header className="relatorio-menu">
        <button className="btn-menu" onClick={handleTrocarPaciente}>
          X
        </button>
      </header>

      <h1 className="titulo">RELATÓRIO DE VACINAÇÃO EM ATRASO</h1>

      <table className="tabela-relatorio">
        <thead>
          <tr>
            <th>NOME</th>
            <th>CPF</th>
            <th>VACINA</th>
            <th>CELULAR</th>
            <th>AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p, index) => (
            <tr key={index}>
              <td>{p.nome}</td>
              <td>{p.cpf}</td>
              <td>{p.vacina}</td>
              <td>{p.celular}</td>
              <td>
                <button className="btn-notificar" onClick={() => handleNotificar(p.nome)}>
                  NOTIFICAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn-exportar" onClick={handleExportar}>
        EXPORTAR
      </button>
    </div>
  );
}
