const pool = require('../config/database');

// Função para cadastrar vacina 
exports.cadastrarVacina = async (req, res) => {
    const { cpf, nome_vacina, lote, dose, data_aplicacao, proxima_dose_data, posto_saude } = req.body;

    try {
        // Verifica se o paciente existe
        const [pacientes] = await pool.query('SELECT id FROM pacientes WHERE cpf = ?', [cpf]);
        if (pacientes.length === 0) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }

        // Sempre registra a dose aplicada
        await pool.query(
            'INSERT INTO vacinas (paciente_cpf, nome_vacina, lote, dose, data_aplicacao, posto_saude, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [cpf, nome_vacina, lote, dose, data_aplicacao, posto_saude, 'APLICADA']
        );

        // Se houver próxima dose, agenda
        if (proxima_dose_data) {
            const proximaDose = parseInt(dose) + 1;
            await pool.query(
                'INSERT INTO vacinas (paciente_cpf, nome_vacina, dose, proxima_dose_data, status) VALUES (?, ?, ?, ?, ?)',
                [cpf, nome_vacina, proximaDose, proxima_dose_data, 'AGENDADA']
            );
        }

        res.status(201).json({ message: 'Vacinação registrada com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
};

// Função para consultar o calendário de vacinas do usuário 
exports.consultarVacinas = async (req, res) => {
    const { cpf } = req.params;

    try {
        const [pacientes] = await pool.query('SELECT id FROM pacientes WHERE cpf = ?', [cpf]);

        if (pacientes.length === 0) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }

        const [vacinas] = await pool.query(
            'SELECT * FROM vacinas WHERE paciente_cpf = ? ORDER BY data_aplicacao DESC',
            [cpf]
        );

        if (vacinas.length === 0) {
            return res.status(200).json({
                message: 'Nenhuma vacina registrada para este paciente.',
                calendario: [],
                atrasadas: []
            });
        }

        const hoje = new Date();

        const vacinasEmAtraso = vacinas.filter(v =>
            v.status === 'AGENDADA' &&
            v.proxima_dose_data &&
            new Date(v.proxima_dose_data) < hoje
        );

        const vacinasAgendadas = vacinas.filter(v =>
            v.status === 'AGENDADA' &&
            v.proxima_dose_data &&
            new Date(v.proxima_dose_data) >= hoje
        );

        let situacao = '';

        if (vacinasEmAtraso.length > 0) {
            situacao = 'Existem vacinas em atraso.';
        } else if (vacinasAgendadas.length > 0) {
            situacao = 'Existem vacinas agendadas para o futuro.';
        } else {
            situacao = 'Todas as vacinas estão aplicadas e em dia.';
        }

        res.status(200).json({
            situacao,
            calendario: vacinas,
            atrasadas: vacinasEmAtraso
        });

    } catch (error) {
        console.error('Erro ao consultar vacinas:', error);
        res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
};