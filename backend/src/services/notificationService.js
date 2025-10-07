const cron = require('node-cron');
const pool = require('../config/database');

const verificarEVacinas = async () => {
    console.log('Executando verificação de vacinas agendadas e em atraso...');
    const hoje = new Date();
    const tresDiasAFrente = new Date();
    tresDiasAFrente.setDate(hoje.getDate() + 3);

    const hojeFormatado = hoje.toISOString().slice(0, 10);
    const tresDiasFormatado = tresDiasAFrente.toISOString().slice(0, 10);

    try {
        // Encontra vacinas em atraso 
        const [atrasadas] = await pool.query(
            "SELECT usuario_id, nome_vacina FROM vacinas WHERE status = 'AGENDADA' AND proxima_dose_data < ?", [hojeFormatado]
        );

        for (const vacina of atrasadas) {
            const mensagem = `Vacina em atraso! Vá até o posto de saúde mais próximo e atualize seu calendário.`;
            await pool.query(
                'INSERT INTO notificacoes (usuario_id, mensagem, data_envio, tipo) VALUES (?, ?, NOW(), ?)',
                [vacina.usuario_id, mensagem, 'ATRASO']
            );
        }

        // Encontra vacinas agendadas para os próximos 3 dias 
        const [agendadas] = await pool.query(
            "SELECT usuario_id, nome_vacina FROM vacinas WHERE status = 'AGENDADA' AND proxima_dose_data BETWEEN ? AND ?", [hojeFormatado, tresDiasFormatado]
        );

        for (const vacina of agendadas) {
            const mensagem = `Você tem uma vacina se aproximando! Fique atento à sua próxima dose.`;
            await pool.query(
                'INSERT INTO notificacoes (usuario_id, mensagem, data_envio, tipo) VALUES (?, ?, NOW(), ?)',
                [vacina.usuario_id, mensagem, 'AGENDAMENTO']
            );
        }

    } catch (error) {
        console.error('Erro ao processar notificações:', error);
    }
};

// Agenda a tarefa para rodar uma vez por dia à meia-noite 
const iniciarServicoNotificacoes = () => {
    cron.schedule('0 0 * * *', verificarEVacinas);
};

module.exports = { iniciarServicoNotificacoes };