const pool = require('../config/database');

// Função para cadastrar vacina 
exports.cadastrarVacina = async (req, res) => {
    const { usuario_id, nome_vacina, lote, dose, data_aplicacao, proxima_dose_data, posto_saude } = req.body;

    try {
        const status = proxima_dose_data ? 'AGENDADA' : 'APLICADA';

        // Cadastra a vacina aplicada
        await pool.query(
            'INSERT INTO vacinas (usuario_id, nome_vacina, lote, dose, data_aplicacao, posto_saude, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [usuario_id, nome_vacina, lote, dose, data_aplicacao, posto_saude, 'APLICADA']
        );
        
        // Se houver próxima dose, agenda
        if(proxima_dose_data) {
            await pool.query(
                'INSERT INTO vacinas (usuario_id, nome_vacina, proxima_dose_data, status) VALUES (?, ?, ?, ?)',
                [usuario_id, nome_vacina, proxima_dose_data, 'AGENDADA']
            );
        }

        res.status(201).json({ message: 'Vacinação registrada com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
};

// Função para consultar o calendário de vacinas do usuário 
exports.consultarVacinas = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const [vacinas] = await pool.query('SELECT * FROM vacinas WHERE usuario_id = ? ORDER BY data_aplicacao DESC', [usuarioId]);
        
        // Lógica para identificar vacinas em atraso
        const hoje = new Date();
        const vacinasEmAtraso = vacinas.filter(v => v.status === 'AGENDADA' && new Date(v.proxima_dose_data) < hoje);

        res.status(200).json({
            calendario: vacinas,
            atrasadas: vacinasEmAtraso
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
};