import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import CadastroProfissional from "./pages/cadastroProfissional";
import Cpf from "./pages/cpf";
import CadastroVacina from './pages/cadastroVacinacao';
import CalendarioVacinacao from './pages/calendarioVacinacao';
import RelatorioVacinacao from './pages/relatorioVacinacao';
import CadastroPaciente from './pages/cadastroPaciente';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro-profissional" element={<CadastroProfissional />} />
        <Route path="/cpf" element={<Cpf />} />
        <Route path="/cadastro-vacinacao" element={<CadastroVacina />} />
        <Route path="/calendario-vacinacao" element={<CalendarioVacinacao/>} />
        <Route path="/:cpf/calendario" element={<CalendarioVacinacao/>} />
        <Route path="/relatorio-vacinacao" element={<RelatorioVacinacao/>} />
        <Route path="/cadastro-paciente" element={<CadastroPaciente/>} />
      </Routes>
    </Router>
  );
}

export default App;
