const Database = require('../database/db');

const getAno = async (ctx, ano) => {
	const todosVoos = `
	SELECT count(*) as total
	FROM voos
	`;

	const voosCancelados = `
	SELECT count(*) as total
	FROM voos 
	INNER JOIN situacoes on situacoes.id = voos.id_situacao
	WHERE situacoes.situacao like 'cancelado'`;

	const voosRealizadosSemAtraso = `
	SELECT count(*) as total
	FROM voos
	INNER JOIN situacoes on situacoes.id = voos.id_situacao
	WHERE situacoes.situacao like 'realizado'`;

	const voosRealizadosComAtraso = `
	SELECT count(*) as total
	FROM voos
	INNER JOIN situacoes on situacoes.id = voos.id_situacao
	WHERE situacoes.situacao like 'realizado'
	`;

	try {
		const db = await Database;
		const quantidadeVoosProgramada = await db.all(todosVoos);
		const quantidadeVoosCancelado = await db.all(voosCancelados);
		const quantidadeVoosSemAtraso = await db.all(voosRealizadosSemAtraso);
		const quantidadeVoosComAtraso = await db.all(voosRealizadosComAtraso);

		const qtdVoosProgramado = quantidadeVoosProgramada[0].total;
		const qtdCancelado = quantidadeVoosCancelado[0].total;
		const qtdSemAtraso = quantidadeVoosSemAtraso[0].total;
		const qtdComAtraso = quantidadeVoosComAtraso[0].total;

		ctx.body = {
			qtdVoosProgramado,
			qtdCancelado,
			qtdSemAtraso,
			qtdComAtraso,
		};
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getAno };
