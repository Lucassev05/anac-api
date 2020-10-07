REST Api desenvolvida para consulta de dados relacionados a ANAC

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]


## Instalação

- Instalação do Node
- Clone do projeto
- Configuração
- Execução do projeto


### Node

- Para instalação do Node, é necessário fazer o donwload no link: https://nodejs.org/

### Clone

> Clone o repositório

```shell
$ git clone https://github.com/Lucassev05/anac-api.git
```
ou
```shell
$ git clone git@github.com:Lucassev05/anac-api.git
```

### Configuração

> Instale os pacotes

```shell
$ npm install
```

### Configuração de porta
> Por padrão a aplicação é executada na porta 8000, porém a porta pode ser configurada.
- Para configurar a porta, será necessário renomear o arquivo .env.example para .env e alterar o valor da variável PORT para a porta desejada.

### Execução
> Execute o código com o comando

```shell
$ npm start
```

## Requisição

### Pegar dados anuais

    `GET /getAno/:ano`

### Response
```json
{
  "status": "sucesso",
  "dados": {
    "qtdVoosProgramado": 100,
    "qtdCancelado": 100,
    "qtdSemAtraso": 100,
    "qtdComAtraso": 100,
    "dadosPorCadaMes": [
      {
        "Mes": "01",
        "Total": 100,
        "Total_Atrasados": 100,
        "Total_No_Hoario": 100,
        "Total_Cancelados": 100
      }
    ]
  }
}
```

### Tecnologias Utilizadas
- <a href="https://nodejs.org/" target="_blank">Node.js</a>
- <a href="https://koajs.com/" target="_blank">Koa</a>
- <a href="https://www.sqlite.org/" target="_blank">Sqlite3</a>
- <a href="https://eslint.org/" target="_blank">ESlint</a>


[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
