const Database = require("./db");
const {
  createEmpresa,
  createVoo,
  createSituacao,
  createJustificativa,
  createAeroporto,
} = require("./funcoesDeInsercao");

async function saveEmpresa(data) {
  const empresa = {
    nome: data,
  };

  try {
    const db = await Database;
    return await createEmpresa(db, {
      empresa,
    });
  } catch (error) {
    console.log(error);
  }
}

async function saveSituacao(data) {
  const situacao = {
    titulo: data,
  };

  try {
    const db = await Database;
    return await createSituacao(db, {
      situacao,
    });
  } catch (error) {
    console.log(error);
  }
}

async function saveJustificativas(data) {
  const justificativa = {
    sigla: data,
  };

  try {
    const db = await Database;
    return await createJustificativa(db, {
      justificativa,
    });
  } catch (error) {
    console.log(error);
  }
}

async function saveAeroporto(data) {
  const aeroporto = {
    sigla: data,
  };

  try {
    const db = await Database;
    return await createAeroporto(db, {
      aeroporto,
    });
  } catch (error) {
    console.log(error);
  }
}

async function saveVoo(data) {
  const voo = {
    id_empresa: data.empresa,
    numero_voo: data.numero_voo,
    di: data.di,
    tipo_linha: data.tipo_linha,
    id_aeroporto_origem: data.origem,
    id_aeroporto_destino: data.destino,
    partida_prevista: data.partida_prevista,
    partida_real: data.partida_real,
    chegada_prevista: data.chegada_prevista,
    chegada_real: data.chegada_real,
    id_situacao: data.situacao,
    id_justificativa: data.justificativa,
  };
  try {
    const db = await Database;
    return await createVoo(db, {
      voo,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  saveEmpresa,
  saveVoo,
  saveSituacao,
  saveJustificativas,
  saveAeroporto,
};
