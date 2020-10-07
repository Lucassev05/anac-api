async function createEmpresa(db, { empresa }) {
  const empresaInserida = await db.run(`
	  INSERT INTO empresas (
		  sigla
	  ) VALUES (
		  "${empresa.nome}"
	  );
	`);
  return empresaInserida.lastID;
}

async function createSituacao(db, { situacao }) {
  const situacaoInserida = await db.run(`
	  INSERT INTO situacoes (
		  situacao
	  ) VALUES (
		  "${situacao.titulo}"
	  );
	`);
  return situacaoInserida.lastID;
}

async function createJustificativa(db, { justificativa }) {
  const justificativaInserida = await db.run(`
	  INSERT INTO justificativas (
		  sigla
	  ) VALUES (
		  "${justificativa.sigla}"
	  );
	`);
  return justificativaInserida.lastID;
}

async function createAeroporto(db, { aeroporto }) {
  const aeroportoInserido = await db.run(`
		INSERT INTO aeroportos (
			sigla
		) VALUES (
			"${aeroporto.sigla}"
		);
	  `);
  return aeroportoInserido.lastID;
}

async function createVoo(db, { voo }) {
  await db.run(`
        INSERT INTO voos (
		  id_empresa,
		  numero_voo,
		  di,
		  tipo_linha,
		  id_aeroporto_origem,
		  id_aeroporto_destino,
		  partida_prevista,
		  partida_real,
		  chegada_prevista,
		  chegada_real,
		  id_situacao,
		  id_justificativa
        ) VALUES(
			"${voo.id_empresa}",
			"${voo.numero_voo}",
            "${voo.di}",
            "${voo.tipo_linha}",
            "${voo.id_aeroporto_origem}",
            "${voo.id_aeroporto_destino}",
            "${voo.partida_prevista}",
            "${voo.partida_real}",
            "${voo.chegada_prevista}",
            "${voo.chegada_real}",
            "${voo.id_situacao}",
            "${voo.id_justificativa}"
        );
  `);
}

module.exports = {
  createEmpresa,
  createSituacao,
  createVoo,
  createJustificativa,
  createAeroporto,
};
