const Database = require('sqlite-async');

function execute(db) {
	return db.exec(`
	  CREATE TABLE IF NOT EXISTS empresas (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  sigla TEXT,
		  name TEXT,
	  );

	  CREATE TABLE IF NOT EXISTS situacoes (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		titulo TEXT,
	);
  
	  CREATE TABLE IF NOT EXISTS voos (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  empresa_id INTEGER NOT NULL,
		  di TEXT NOT NULL,
		  tipo_linha TEXT NOT NULL,
		  origem TEXT NOT NULL,
		  destino TEXT NOT NULL,
		  partida_prevista DATETIME,
		  partida_real DATETIME,
		  chegada_prevista DATETIME,
		  chegada_real DATETIME,
		  situacao_id VARCHAR(9) NOT NULL,
		  justificativa TEXT,
	  );
	`);
}

module.exports = Database.open(`${__dirname}./database.sqlite`).then(execute);
