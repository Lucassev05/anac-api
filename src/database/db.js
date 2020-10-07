const Database = require('sqlite-async');

function execute(db) {
	return db.exec(`
	  CREATE TABLE IF NOT EXISTS empresas (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  sigla TEXT NOT NULL,
		  nome TEXT
	  );

	  CREATE TABLE IF NOT EXISTS aeroportos (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		sigla TEXT NOT NULL,
		nome TEXT
	);

	CREATE TABLE IF NOT EXISTS situacoes (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		situacao TEXT NOT NULL,
		descricao TEXT
	);

	CREATE TABLE IF NOT EXISTS justificativas (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		sigla TEXT NOT NULL,
		descricao TEXT
	);


	  CREATE TABLE IF NOT EXISTS voos (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  id_empresa INTEGER NOT NULL,
		  numero_voo TEXT,
		  di TEXT NOT NULL,
		  tipo_linha TEXT NOT NULL,
		  id_aeroporto_origem INTEGER NOT NULL,
		  id_aeroporto_destino INTEGER NOT NULL,
		  partida_prevista DATETIME,
		  partida_real DATETIME,
		  chegada_prevista DATETIME,
		  chegada_real DATETIME,
		  id_situacao INTEGER NOT NULL,
		  id_justificativa INTEGER
	  );
	`);
}

module.exports = Database.open(`${__dirname}./database.sqlite`).then(execute);
