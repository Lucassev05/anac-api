module.exports = async function createVoo(db, { voo }) {
	await db.run(`
        INSERT INTO voos (
		  empresa_id,
		  di,
		  tipo_linha,
		  origem,
		  destino,
		  partida_prevista,
		  partida_real,
		  chegada_prevista,
		  chegada_real,
		  situacao_id,
		  justificativa
        ) VALUES(
            "${voo.empresa_id}",
            "${voo.di}",
            "${voo.tipo_linha}",
            "${voo.origem}",
            "${voo.destino}",
            "${voo.partida_prevista}",
            "${voo.partida_real}",
            "${voo.chegada_prevista}",
            "${voo.chegada_real}",
            "${voo.situacao_id}",
            "${voo.justificativa}"
        );
  `);
};
