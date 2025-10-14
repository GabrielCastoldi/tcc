const express = require('express');
const router = express.Router();
const vacinaController = require('../controllers/vacinaController');
// Middleware de autenticação (a ser implementado)
// const { authenticateToken } = require('../middleware/authMiddleware');

// Rota para a enfermeira cadastrar uma nova vacina para um usuário 
router.post('/cadastrar', vacinaController.cadastrarVacina);

// Rota para consultar o calendário de vacinação de um usuário 
router.get('/:cpf', vacinaController.consultarVacinas);

module.exports = router;