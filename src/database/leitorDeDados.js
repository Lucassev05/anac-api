const fs = require('fs');
const csvParser = require('csv-parser');
const { saveEmpresa, saveVoo, saveSituacao } = require('./insertData');

const nameDir = '01_2018';

const dataSet = fs.createReadStream(`src/database/dataset/${nameDir}_out.csv`);
// ver 10-2018
const conteudo = [];

const formatarData = (data) =>
	new Date(
		`${data.split(' ')[0].split('/').reverse().join('/')} ${
			data.split(' ')[1]
		}`
	);

dataSet.pipe(csvParser()).on('data', (data) => {
	const voo = {
		empresa: data.empresa,
		numero_voo: data.numero_voo,
		di: data.di,
		tipo_linha: data.tipo_linha,
		origem: data.origem,
		destino: data.destino,
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
	// conteudo.push(voo);

	saveEmpresa(voo);
	saveVoo(voo);
	saveSituacao(voo);
	// saveVoo();
	//   console.log(data["ICAO Empresa A�rea"]);
});

dataSet.on('end', () => {
	console.log(conteudo);
});
