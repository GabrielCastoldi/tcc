const pool = require('../config/database');

// Função para obter relatório de vacinas em atraso 
exports.getRelatorioAtraso = async (req, res) => {
    try {
        const hoje = new Date().toISOString().slice(0, 10);
        const query = `
            SELECT p.nome, p.cpf, p.telefone, v.nome_vacina, v.proxima_dose_data
            FROM pessoas p
            JOIN vacinas v ON p.id = v.usuario_id
            WHERE v.status = 'AGENDADA' AND v.proxima_dose_data < ?
            ORDER BY v.proxima_dose_data;
        `;

        const [relatorio] = await pool.query(query, [hoje]);

        res.status(200).json(relatorio);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao gerar relatório.', error: error.message });
    }
};