const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

// Rota para gerar o relatório de vacinas em atraso 
router.get('/atraso', relatorioController.getRelatorioAtraso);

module.exports = router;