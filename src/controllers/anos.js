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
	SELECT strftime('%m', voos.partida_real) as Mes,
	COUNT(voos.id) as Total,
	(SELECT COUNT (voos.id)
		FROM voos
		INNER JOIN situacoes on situacoes.id = voos.id_situacao
		WHERE situacao like 'realizado'
		AND voos.partida_prevista < voos.partida_real) as Total_Atrasados,
	(SELECT COUNT (voos.id)
		FROM voos
		INNER JOIN situacoes on situacoes.id = voos.id_situacao
		WHERE situacao like 'realizado'
		AND voos.partida_prevista >= voos.partida_real) as Total_No_Hoario,
	(SELECT COUNT (voos.id)
		FROM voos
		INNER JOIN situacoes on situacoes.id = voos.id_situacao
		WHERE situacao like 'cancelado') as Total_Cancelados
	FROM voos
	GROUP BY strftime('%m', voos.partida_real)`;

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
