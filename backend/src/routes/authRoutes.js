const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para cadastrar uma nova enfermeira 
router.post('/cadastrar-enfermeira', authController.cadastrarEnfermeira);

// Rota para login de usuário e enfermeira 
router.post('/login', authController.login);

module.exports = router;