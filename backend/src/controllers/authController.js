const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Função para cadastrar um novo usuário (cidadão) 
exports.cadastrarUsuario = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        // Validação básica
        if (!nome || !cpf || !data_nascimento || !senha) {
            return res.status(400).json({ message: 'Dados obrigatórios não preenchidos.' });
        }

        const senha_hash = await bcrypt.hash(senha, 8);
        const [result] = await pool.query(
            'INSERT INTO pessoas (nome, cpf, data_nascimento, telefone, email, senha_hash, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nome, cpf, data_nascimento, telefone, email, senha_hash, 'USUARIO']
        );
        res.status(201).json({ message: 'Cadastro realizado com sucesso.' }); 
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'CPF ou E-mail já cadastrado.' });
        }
        res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
};

// Função para cadastrar uma nova enfermeira 
exports.cadastrarEnfermeira = async (req, res) => {
    const { nome, cpf, data_nascimento, email, senha, coren, codigo_acesso } = req.body;

    try {
        const senha_hash = await bcrypt.hash(senha, 8);
        await pool.query(
            'INSERT INTO pessoas (nome, cpf, data_nascimento, email, senha_hash, tipo, coren, codigo_acesso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nome, cpf, data_nascimento, email, senha_hash, 'ENFERMEIRA', coren, codigo_acesso]
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
        const [rows] = await pool.query('SELECT * FROM pessoas WHERE cpf = ?', [cpf]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'CPF não cadastrado.' }); 
        }

        const pessoa = rows[0];
        const senhaValida = await bcrypt.compare(senha, pessoa.senha_hash);

        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha inválida' }); 
        }

        const token = jwt.sign({ id: pessoa.id, tipo: pessoa.tipo }, process.env.JWT_SECRET, {
            expiresIn: '8h'
        });

        res.status(200).json({ auth: true, token: token, tipo: pessoa.tipo });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
};