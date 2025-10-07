import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CadastroProfissional.css';
import seringa from '/images/seringa.png';

export default function CadastroProfissional() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    coren: '',
    telefone: '',
    codigo: '',
    senha: '',
    confirmarSenha: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados cadastrados:', form);

    // Aqui pode fazer validação ou enviar os dados para a API
    // Após o envio ou confirmação, redireciona para raiz ("/")
    navigate('/'); // redireciona para a raiz da aplicação
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
        <h2>CRIAR UMA CONTA</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
          />
          <input
            type="text"
            name="coren"
            placeholder="Nº Coren"
            value={form.coren}
            onChange={handleChange}
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone / Celular"
            value={form.telefone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="codigo"
            placeholder="Código de acesso"
            value={form.codigo}
            onChange={handleChange}
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmação de senha"
            value={form.confirmarSenha}
            onChange={handleChange}
          />

          <button type="submit" className="btn-cadastrar">
            CADASTRAR
          </button>
        </form>
      </div>
    </div>
  );
}
