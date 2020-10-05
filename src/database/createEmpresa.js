module.exports = async function createEmpresa(db, { empresa }) {
	await db.run(`
	  INSERT INTO empresas (
		  sigla
	  ) VALUES (
		  "${empresa.nome}",
	  );
	`);
};
