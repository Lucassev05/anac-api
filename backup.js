dataSet.pipe(csvParser()).on('data', (data) => {
	const voo = {
		empresa: data.empresa,
		numero_voo: data.numero_voo,
		di: data.di,
		tipo_linha: data.tipo_linha,
		origem: data.origem,
		destino: data.destino,
		partida_prevista: data.partida_prevista
			? new Date(
					`${data.partida_prevista
						.split(' ')[0]
						.split('/')
						.reverse()
						.join('/')} ${data.partida_prevista.split(' ')[1]}`
			  )
			: null,
		partida_real: data.partida_real
			? new Date(
					`${data.partida_real
						.split(' ')[0]
						.split('/')
						.reverse()
						.join('/')} ${data.partida_real.split(' ')[1]}`
			  )
			: null,
		chegada_prevista: data.chegada_prevista
			? new Date(
					`${data.chegada_prevista
						.split(' ')[0]
						.split('/')
						.reverse()
						.join('/')} ${data.chegada_prevista.split(' ')[1]}`
			  )
			: null,
		chegada_real: data.chegada_real
			? new Date(
					`${data.chegada_prevista
						.split(' ')[0]
						.split('/')
						.reverse()
						.join('/')} ${data.chegada_real.split(' ')[1]}`
			  )
			: null,
		situacao: data.situacao,
		justificativa: data.justificativa ? data.justificativa : null,
	};
	conteudo.push(voo);
	// saveVoo();
	//   console.log(data["ICAO Empresa A�rea"]);
});
