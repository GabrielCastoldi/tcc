const express = require('express');
const router = express.Router();
const getPatientsController = require('../controllers/getPatients');

// Rota para encontrar o paciente pelo CPF
router.post('/encontrar-paciente/:cpf', getPatientsController.encontrarPaciente);

module.exports = router;