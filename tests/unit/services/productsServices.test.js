const { expect } = require('chai');
const sinon = require('sinon');
const productsModels = require('../../../models/productsModels');
const productsServices = require('../../../services/productsServices');
const mock = require('../../mock');

describe('Testa a camada "services" da rota "/products".', () => {
  describe('Testa o método "GET"', () => {
    describe('Testa a função "productsServices.getAll"', () => {
      before(() => {
        sinon.stub(productsModels, 'getAll').resolves(mock.products)
      });
      after(() => {
        productsModels.getAll.restore();
      });

      it('Verifica se a rota GET "/products" retorna um "array" de "objetos" com todos os produtos', async () => {
        const result = await productsServices.getAll();
        expect(result.data).to.be.a('array').to.have.length(3);
        expect(result.data[0]).to.be.a('object');
        expect(result.data[2]).to.deep.equal({ id: 3, name: 'Escudo do Capitão América' })
      });

      it('Verifica se o objeto retornado da rota  GET "/products" comtem um "id" com um numero e um "name" com uma string', async () => {
        const result = await productsServices.getAll();
        expect(result.data[1]).to.have.property('id').that.is.a('number');
        expect(result.data[1]).to.have.property('name').that.is.a('string');
      });

      it('verifica se o "status" retornado é "200"', async () => {
        const result = await productsServices.getAll();
        expect(result.status).to.equal(200);
      })

      it('verifica se os dados retornados estão corretos', async () => {
        const result = await productsServices.getAll();
        expect(result).to.deep.equal({ status: 200, data: mock.products });
      })
    });


    describe('Testa a função "productsServices.getById"', () => {
      before(() => {
        sinon.stub(productsModels, 'getById').resolves(mock.products[0])
      });
      after(() => {
        productsModels.getById.restore();
      });

      it('Verifica se a funcao "productsServices.getById" retorna um objeto "data" contendo os dados corretos e um "status 200" ', async () => {
        const result = await productsServices.getById(1);
        const compare = { status: 200, data: { id: 1, name: 'Martelo de Thor' } }
        expect(result).to.deep.equal(compare);
      });
    });

    describe('Testa caso a função do banco de dados envie dados invalidos', () => {
      before(() => {
        sinon.stub(productsModels, 'getById').resolves(undefined)
      });
      after(() => {
        productsModels.getById.restore();
      });

      it('Testa se caso a função "productsServices.getById" receba dados invalidos, retorna uma mensagem de erro e o "status 404', async () => {
        const result = await productsServices.getById(50);
        const compare = { status: 404, message: { message: 'Product not found' } }
        expect(result).to.deep.equal(compare);
      });
    });

  });
});