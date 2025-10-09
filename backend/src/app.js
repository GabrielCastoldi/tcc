// src/app.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const vacinaRoutes = require('./routes/vacinaRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');
const notificacaoRoutes = require('./routes/notificacaoRoutes');
const getPatientsRoutes = require('./routes/getPatient');
const { iniciarServicoNotificacoes } = require('./services/notificationService');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', getPatientsRoutes);
app.use('/api/vacinas', vacinaRoutes);
app.use('/api/relatorios', relatorioRoutes);
app.use('/api/notificacoes', notificacaoRoutes);

// Inicia o serviço de verificação automática de notificações
iniciarServicoNotificacoes();

module.exports = app;