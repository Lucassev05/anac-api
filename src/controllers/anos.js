const Database = require('../database/db');
const { formatarErro, formatarSucesso } = require('../utils/resposta');

const getAno = async (ctx) => {
	const ano = ctx.params.ano;

	const todosVoos = `
	SELECT count(*) as total
	FROM voos
	WHERE strftime('%Y', partida_prevista)='${ano}'
	`;

	const voosCancelados = `
	SELECT count(*) as total
	FROM voos 
	INNER JOIN situacoes on situacoes.id = voos.id_situacao
	WHERE situacoes.situacao like 'cancelado' AND strftime('%Y', partida_prevista)='${ano}' `;

	const voosRealizadosSemAtraso = `
	SELECT count(*) as total
	FROM voos
	INNER JOIN situacoes on situacoes.id = voos.id_situacao
	WHERE situacoes.situacao like 'realizado' AND strftime('%Y', partida_prevista)='${ano}' AND partida_prevista >= partida_real `;

	const voosRealizadosComAtraso = `
	SELECT count(*) as total
	FROM voos
	INNER JOIN situacoes on situacoes.id = voos.id_situacao
	WHERE situacoes.situacao like 'realizado' AND strftime('%Y', partida_prevista)='${ano}' AND partida_prevista < partida_real
	`;

	const dadosPorMes = `
	SELECT IFNULL(strftime('%m', voos.partida_real),00) as Mes,
	COUNT(voos.id) as Total,
	(SELECT COUNT (voos2.id)
		FROM voos voos2
		INNER JOIN situacoes on situacoes.id = voos2.id_situacao
		INNER JOIN voos on voos.id = voos2.id
		WHERE situacao like 'realizado'
		AND voos2.partida_prevista < voos2.partida_real) as Total_Atrasados,
	(SELECT COUNT (voos3.id)
		FROM voos voos3
		INNER JOIN situacoes on situacoes.id = voos3.id_situacao
		INNER JOIN voos on voos.id = voos3.id
		WHERE situacao like 'realizado'
		AND voos3.partida_prevista >= voos3.partida_real) as Total_No_Hoario,
	(SELECT COUNT (voos4.id)
		FROM voos voos4
		INNER JOIN situacoes on situacoes.id = voos4.id_situacao
		INNER JOIN voos on voos.id = voos4.id
		WHERE situacao like 'cancelado') as Total_Cancelados
	FROM voos
	GROUP BY IFNULL(strftime('%m', voos.partida_real),00)`;

	try {
		const db = await Database;
		const quantidadeVoosProgramada = await db.all(todosVoos);
		const quantidadeVoosCancelado = await db.all(voosCancelados);
		const quantidadeVoosSemAtraso = await db.all(voosRealizadosSemAtraso);
		const quantidadeVoosComAtraso = await db.all(voosRealizadosComAtraso);
		const dadosPorCadaMes = await db.all(dadosPorMes);

		const qtdVoosProgramado = quantidadeVoosProgramada[0].total;
		const qtdCancelado = quantidadeVoosCancelado[0].total;
		const qtdSemAtraso = quantidadeVoosSemAtraso[0].total;
		const qtdComAtraso = quantidadeVoosComAtraso[0].total;

		const body = {
			qtdVoosProgramado,
			qtdCancelado,
			qtdSemAtraso,
			qtdComAtraso,
			dadosPorCadaMes,
		};
		formatarSucesso(ctx, body);
	} catch (error) {
		console.log(error);
		formatarErro(ctx, error);
	}
};

module.exports = { getAno };
