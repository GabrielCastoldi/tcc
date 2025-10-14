const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Função para cadastrar uma nova enfermeira 
exports.cadastrarEnfermeira = async (req, res) => {
    const { nome, cpf, coren, telefone, codigo_acesso, senha } = req.body;

    try {
        const senha_hash = await bcrypt.hash(senha, 8);
        await pool.query(
            'INSERT INTO enfermeiros (nome, cpf, coren, telefone, codigo_acesso, senha_hash) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, cpf, coren, telefone, codigo_acesso, senha_hash]
        );
        res.status(201).json({ message: 'Cadastro realizado com sucesso.' }); 
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
};

// Função para cadastrar um novo paciente
exports.cadastrarPaciente = async (req, res) => {
    const { nome, cpf, telefone, idade } = req.body;

    try {
        await pool.query(
            'INSERT INTO pacientes (nome, cpf, telefone, idade) VALUES (?, ?, ?, ?)',
            [nome, cpf, telefone, idade]
        );
        res.status(201).json({ message: 'Cadastro realizado com sucesso.' }); 
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
};

// Função de Login 
exports.login = async (req, res) => {
    const { cpf, senha } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM enfermeiros WHERE cpf = ?', [cpf]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'CPF não cadastrado.' }); 
        }

        const enfermeiro = rows[0];
        const senhaValida = await bcrypt.compare(senha, enfermeiro.senha_hash);

        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha inválida' }); 
        }

        const token = jwt.sign({ id: enfermeiro.id, tipo: enfermeiro.tipo }, process.env.JWT_SECRET, {
            expiresIn: '8h'
        });

        res.status(200).json({ auth: true, token: token, tipo: enfermeiro.tipo });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
};