module.exports = async function createSituacao(db, { situacao }) {
	await db.run(`
	  INSERT INTO situacoes (
		  titulo
	  ) VALUES (
		  "${situacao.titulo}"
	  );
	`);
};
