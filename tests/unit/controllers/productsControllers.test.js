const { expect } = require('chai');
const sinon = require('sinon');
const productsServices = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');
const mock = require('../../mock');

describe('Testa a camada "controllers" da rota "/products".', () => {
  describe('Testa o método "GET" da rota "/products".', () => {
    describe('Testa a rota "/" de "productsControllers"', () => {

      const req = {};
      const res = {};
      const next = (err) => { err };

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsServices, 'getAllProducts').resolves({
          status: 200, data: mock.products
        });
      });

      after(() => {
        productsServices.getAllProducts.restore();
      });

      it('Verifica se a rota "/" retorna um status 200', async () => {
        await productsControllers.getAll(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
      expect(res.status.calledOnce).to.be.true;
      });

      it('Verifica se a rota "/" retorna um "array" com "objetos" contendo todos os produtos', async () => {
        await productsControllers.getAll(req, res, next);
        expect(res.json.calledWith(mock.products)).to.be.true;
      });

      it('Verifica se o objeto retornado da rota  GET "/products" comtem um "id" com um numero e um "name" com uma string', async () => {
        const result = await productsServices.getAllProducts();
        expect(result.data[1]).to.have.property('id').that.is.a('number');
        expect(result.data[1]).to.have.property('name').that.is.a('string');
      });

    });


    describe.only('Testa a função "productsServices.getAProduct"', () => {
      before(() => {
        sinon.stub(productsModels, 'getAll').resolves(mock.products[0])
      });
      after(() => {
        productsModels.getAll.restore();
      });

      it('Verifica se a funcao "productsServices.getAProduct" retorna um objeto "data" contendo os dados corretos e um "status 200" ', async () => {
        const result = await productsServices.getAProduct(1);
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

      it('Testa se caso a função "productsServices.getAProduct" receba dados invalidos, retorna uma mensagem de erro e o "status 404', async () => {
        const result = await productsServices.getAProduct(1);
        const compare = { status: 404, message: { message: 'Product not found' } }
        expect(result).to.deep.equal(compare);
      });
    });

  });
});