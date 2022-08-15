const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModels');
const connection = require('../../../database/connection');
const mock = require('../../mock');

describe('Testa a camada "models" da rota "/products".', () => {
  describe('Testa o método "GET" da rota "/products".', () => {
    describe('Testa a função "getAll"', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([mock.products])
      });
      after(() => {
        connection.query.restore();
      });

      it('Verifica se a rota GET "/products" retorna um "array" de "objetos" com todos os produtos', async () => {
        const result = await productsModel.getAll();
        expect(result).to.be.a('array').to.have.length(3);
        expect(result[0]).to.be.a('object');
        expect(result[2]).to.be.a('object');
      });

      it('Verifica se o objeto retornado da rota  GET "/products" comtem um "id" com um numero e um "name" com uma string', async () => {
        const result = await productsModel.getAll();
        expect(result[0]).to.have.property('id').that.is.a('number');
        expect(result[0]).to.have.property('name').that.is.a('string');
      });
      
      it('verifica se os dados retornados estão corretos', async () => {
        const result = await productsModel.getAll();
        expect(result[1]).to.deep.equal({ id: 2, name: 'Traje de encolhimento' });
      })
    });

    describe('Testa a função "getById"', () => {
      before(() => {
        sinon.stub(connection, 'query').resolves([[mock.products[2]]])
      });
      after(() => {
        connection.query.restore();
      });

      //  ===== REVER DEPOIS ESSE IF  =====  //
      it('Verifica se a rota GET "/products/:id" retorna um "objeto" com o "id" informado e um "name" com o nome do produto', async () => {
        const result = await productsModel.getById(3);
        expect(result).to.deep.equal({ id: 3, name: 'Escudo do Capitão América' });
      });
    });

  });
});
