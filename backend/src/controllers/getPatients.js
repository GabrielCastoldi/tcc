const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Função de procurar paciente 
exports.encontrarPaciente = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM pacientes WHERE cpf = ?', [cpf]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'CPF não cadastrado.' }); 
        }
        const paciente = rows[0];
        const token = jwt.sign({ id: paciente.id }, process.env.JWT_SECRET, {
            expiresIn: '8h'
        });

        res.status(200).json({ auth: true, token: token });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
};