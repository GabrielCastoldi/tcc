// src/controllers/notificacaoController.js

const pool = require('../config/database');

/**
 * Cria uma notificação manual para um usuário específico.
 * Esta função é acionada quando a enfermeira clica no botão "Notificar".
 */
exports.enviarNotificacaoManual = async (req, res) => {
    // O ID do usuário a ser notificado virá no corpo da requisição
    const { usuario_id } = req.body;

    if (!usuario_id) {
        return res.status(400).json({ message: 'O ID do usuário é obrigatório.' });
    }

    try {
        // Mensagem padrão para vacina em atraso, conforme a documentação
        const mensagem = "Vacina em atraso! Vá até o posto de saúde mais próximo e atualize seu calendário."; // [cite: 146]

        // Insere a notificação no banco de dados
        await pool.query(
            'INSERT INTO notificacoes (usuario_id, mensagem, data_envio, tipo) VALUES (?, ?, NOW(), ?)',
            [usuario_id, mensagem, 'ATRASO']
        );

        res.status(200).json({ message: 'Notificação enviada com sucesso.' });

    } catch (error) {
        console.error('Erro ao enviar notificação manual:', error);
        res.status(500).json({ message: 'Erro no servidor ao enviar notificação.' });
    }
};