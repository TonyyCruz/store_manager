const { expect } = require('chai');
const sinon = require('sinon');
const productsModels = require('../../../models/productsModels');
const productsServices = require('../../../services/productsServices');
const mock = require('../../mock');

describe('Testa a camada "services" da rota "/products".', () => {
  describe('Testa o método "GET" da rota "/products".', () => {
    describe('Testa a função "getAll"', () => {
      before(() => {
        sinon.stub(productsModels, 'getAll').resolves(mock.products)
      });
      after(() => {
        productsModels.getAll.restore();
      });

      it('Verifica se a rota GET "/products" retorna um "array" de "objetos" com todos os produtos', async () => {
        const result = await productsServices.getAllProducts();
        console.log('services', result.status);
        expect(result.data).to.be.a('array').to.have.length(3);
        expect(result.data[0]).to.be.a('object');
        expect(result.data[2]).to.deep.equal({ id: 3, name: 'Escudo do Capitão América' })
      });

      it('Verifica se o objeto retornado da rota  GET "/products" comtem um "id" com um numero e um "name" com uma string', async () => {
        const result = await productsServices.getAllProducts();
        expect(result.data[1]).to.have.property('id').that.is.a('number');
        expect(result.data[1]).to.have.property('name').that.is.a('string');
      });

      it('verifica se o "status" retornado é "200"', async () => {
        const result = await productsServices.getAllProducts();
        expect(result.status).to.equal(200);
      })

      it('verifica se os dados retornados estão corretos', async () => {
        const result = await productsServices.getAllProducts();
        // expect(result[1]).to.deep.equal({ id: 2, name: 'Traje de encolhimento' });
      })
    });

    // describe('Testa a função "getById"', () => {
    //   before(() => {
    //     sinon.stub(connection, 'query').resolves([[mock.products[2]]])
    //   });
    //   after(() => {
    //     connection.query.restore();
    //   });

    //   //  ===== REVER DEPOIS ESSE IF  =====  //
    //   it('Verifica se a rota GET "/products/:id" retorna um "objeto" com o "id" informado e um "name" com o nome do produto', async () => {
    //     const result = await productsModel.getById(3);
    //     expect(result).to.deep.equal({ id: 3, name: 'Escudo do Capitão América' });
    //   });
    // });

  });
});