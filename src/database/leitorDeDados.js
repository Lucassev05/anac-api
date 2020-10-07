const fs = require('fs');
const csvParser = require('csv-parser');
const {
	saveEmpresa,
	saveVoo,
	saveSituacao,
	saveJustificativas,
	saveAeroporto,
} = require('./insertData');
const {
	getEmpresas,
	getAeroportos,
	getJustificativas,
	getSituacoes,
} = require('./getTabelas');

let empresasNaBase = [];
let aeroportosNaBase = [];
let situacoesNaBase = [];
let justificativasNaBase = [];

const getAllData = async () => {
	await getEmpresas().then((response) => {
		// console.log("------------------------EMPRESAS---------------------");
		empresasNaBase = response;
		// console.log(empresasNaBase);
	});
	await getAeroportos().then((response) => {
		// console.log("------------------------AEROPORTOS---------------------");
		aeroportosNaBase = response;
		// console.log(aeroportosNaBase);
	});
	await getJustificativas().then((response) => {
		// console.log("------------------------JUSTIFICATIVAS---------------------");
		justificativasNaBase = response;
		// console.log(justificativasNaBase);
	});
	await getSituacoes().then((response) => {
		// console.log("------------------------SITUACOES---------------------");
		situacoesNaBase = response;
		// console.log(situacoesNaBase);
	});
};

const formatarData = (data) =>
	new Date(
		`${data.split(' ')[0].split('/').reverse().join('/')} ${
			data.split(' ')[1]
		}`
	);

async function inserirEmpresa(voo) {
	const arraySiglas = empresasNaBase.map((element) => element.sigla);
	if (arraySiglas.length === 0) {
		empresasNaBase.push({ id: 1, sigla: voo.empresa });
		return saveEmpresa(voo.empresa);
	} else {
		if (arraySiglas.indexOf(voo.empresa) === -1) {
			empresasNaBase.push({
				id: empresasNaBase.length + 1,
				sigla: voo.empresa,
			});
			return saveEmpresa(voo.empresa);
		}
	}
	const id = await empresasNaBase.find((element) => {
		if (element.sigla == voo.empresa) return element;
	});
	return id.id;
}

async function inserirSituacoes(voo) {
	const arraySituacoes = situacoesNaBase.map((element) => element.situacao);

	if (arraySituacoes.length === 0) {
		situacoesNaBase.push({ id: 1, situacao: voo.situacao });
		return saveSituacao(voo.situacao);
	} else {
		if (arraySituacoes.indexOf(voo.situacao) === -1) {
			situacoesNaBase.push({
				id: situacoesNaBase.length + 1,
				situacao: voo.situacao,
			});
			return saveSituacao(voo.situacao);
		}
	}

	const id = situacoesNaBase.find((element) => {
		if (element.situacao == voo.situacao) return element;
	});
	return id.id;
}

async function inserirJustificativas(voo) {
	const arrayJustificativas = justificativasNaBase.map(
		(element) => element.sigla
	);

	if (arrayJustificativas.length === 0 && voo.justificativa != null) {
		justificativasNaBase.push({ id: 1, sigla: voo.justificativa });
		return saveJustificativas(voo.justificativa);
	} else {
		if (
			arrayJustificativas.indexOf(voo.justificativa) === -1 &&
			voo.justificativa != null
		) {
			justificativasNaBase.push({
				id: justificativasNaBase.length + 1,
				sigla: voo.justificativa,
			});
			return saveJustificativas(voo.justificativa);
		}
	}
	if (voo.justificativa != null) {
		const id = await justificativasNaBase.find((element) => {
			if (element.sigla == voo.justificativa) return element;
		});
		return id.id;
	}
	return null;
}

async function inserirAeroportoOrigem(voo) {
	const arrayAeroportos = aeroportosNaBase.map((element) => element.sigla);

	if (arrayAeroportos.length === 0) {
		//   se aeroportos forem iguais, salvar só um
		if (voo.origem != null) {
			aeroportosNaBase.push({
				id: aeroportosNaBase + 1,
				sigla: voo.origem,
			});
			return saveAeroporto(voo.origem);
		}
	} else {
		const vooOrigemExiste = arrayAeroportos.indexOf(voo.origem);
		if (vooOrigemExiste === -1) {
			aeroportosNaBase.push({
				id: aeroportosNaBase.length + 1,
				sigla: voo.origem,
			});
			return saveAeroporto(voo.origem);
		}
	}

	const id = await aeroportosNaBase.find((element) => {
		if (element.sigla == voo.origem) return element;
	});
	return id.id;
}

async function inserirAeroportoDestino(voo) {
	const arrayAeroportos = aeroportosNaBase.map((element) => element.sigla);

	if (arrayAeroportos.length === 0) {
		//   se aeroportos forem iguais, salvar só um
		if (voo.destino != null) {
			aeroportosNaBase.push({
				id: aeroportosNaBase + 1,
				sigla: voo.destino,
			});
			return saveAeroporto(voo.destino);
		}
	} else {
		const vooDestinoExiste = arrayAeroportos.indexOf(voo.destino);
		if (vooDestinoExiste === -1) {
			aeroportosNaBase.push({
				id: aeroportosNaBase.length + 1,
				sigla: voo.destino,
			});

			return saveAeroporto(voo.destino);
		}
	}
	const id = aeroportosNaBase.find((element) => {
		if (element.sigla == voo.destino) return element;
	});
	return id.id;
}

async function inserirVoo(voo) {
	saveVoo(voo);
}

async function lerDados() {
	const nameDir = 'teste2';
	const dataSet = fs.createReadStream(
		`src/database/dataset/${nameDir}_out.csv`
	);

	dataSet.pipe(csvParser()).on('data', async (data) => {
		const dados = {
			empresa: data.empresa,
			numero_voo: data.numero_voo,
			di: data.di,
			tipo_linha: data.tipo_linha,
			origem: data.origem,
			destino: data.destino,
			// partida_prevista: data.partida_prevista
			// 	? formatarData(data.partida_prevista)
			// 	: null,
			partida_prevista: data.partida_prevista
				? formatarData(data.partida_prevista)
				: null,
			partida_real: data.partida_real
				? formatarData(data.partida_real)
				: null,
			chegada_prevista: data.chegada_prevista
				? formatarData(data.chegada_prevista)
				: null,
			chegada_real: data.chegada_real
				? formatarData(data.chegada_real)
				: null,
			situacao: data.situacao,
			justificativa: data.justificativa ? data.justificativa : null,
		};

		const idEmpresa = await inserirEmpresa(dados);
		const idSituacao = await inserirSituacoes(dados);
		const idJustificativa = await inserirJustificativas(dados);
		const idAeroportoOrigem = await inserirAeroportoOrigem(dados);
		const idAeroportoDestino = await inserirAeroportoDestino(dados);

		dados.empresa = idEmpresa;
		dados.situacao = idSituacao;
		dados.justificativa = idJustificativa;
		dados.origem = idAeroportoOrigem;
		dados.destino = idAeroportoDestino;

		inserirVoo(dados);
	});
}

getAllData().then(lerDados);
