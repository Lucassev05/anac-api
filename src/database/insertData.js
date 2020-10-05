const Database = require('./db');
const createEmpresa = require('./createEmpresa');
const createVoo = require('./createVoo');

async function saveEmpresa(data) {
	const empresa = {
		name: data.empresa,
	};

	try {
		const db = await Database;
		await createEmpresa(db, {
			empresa,
		});
	} catch (error) {
		console.log(error);
	}
}

async function saveSituacao(data) {
	const situacao = {
		titulo: data.situacao,
	};

	try {
		const db = await Database;
		await createEmpresa(db, {
			situacao,
		});
	} catch (error) {
		console.log(error);
	}
}

async function saveVoo(data) {
	const voo = {
		empresa_id: 1,
		di: data.di,
		tipo_linha: data.tipo_linha,
		origem: data.origem,
		destino: data.destino,
		partida_prevista: data.partida_prevista,
		partida_real: data.partida_real,
		chegada_prevista: data.chegada_prevista,
		chegada_real: data.chegada_real,
		situacao_id: 1,
		justificativa: data.justificativa,
	};
	try {
		const db = await Database;
		await createVoo(db, {
			voo,
		});
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	saveEmpresa,
	saveVoo,
	saveSituacao,
};
