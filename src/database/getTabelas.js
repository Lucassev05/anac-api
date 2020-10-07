const Database = require("./db");

async function getEmpresas() {
  const query = `
	  SELECT id, sigla 
	  FROM empresas
	`;

  try {
    const db = await Database;
    const empresas = await db.all(query);

    return empresas;
  } catch (error) {
    console.log(error);
  }
}

async function getAeroportos() {
  const query = `
  		SELECT id, sigla
  		FROM aeroportos
  	  `;
  try {
    const db = await Database;
    const aeroportos = await db.all(query);
    return aeroportos;
  } catch (error) {
    console.log(error);
  }
}

async function getJustificativas() {
  const query = `
  		SELECT id, sigla
  		FROM justificativas
  	  `;
  try {
    const db = await Database;
    const justificativas = await db.all(query);
    return justificativas;
  } catch (error) {
    console.log(error);
  }
}

async function getSituacoes() {
  const query = `
  		SELECT id, situacao
  		FROM situacoes
		`;

  try {
    const db = await Database;
    const situacoes = await db.all(query);
    return situacoes;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getEmpresas,
  getAeroportos,
  getJustificativas,
  getSituacoes,
};
