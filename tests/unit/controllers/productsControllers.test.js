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
      const arrayOfProducts = mock.products;

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsServices, 'getAll').resolves({
          status: 200, data: arrayOfProducts
        });
      });

      after(() => {
        productsServices.getAll.restore();
      });

      it('Verifica se a rota "/" retorna um status 200', async () => {
        await productsControllers.getAll(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status.calledOnce).to.be.true;
      });

      it('Verifica se a rota "/" retorna um "array" com "objetos" contendo todos os produtos', async () => {
        await productsControllers.getAll(req, res, next);
        expect(res.json.calledWith(arrayOfProducts)).to.be.true;
      });
    });


    describe('Testa a função "productsServices.getById" com um id "existente"', () => {

      const req = {};
      const res = {};
      const next = (err) => { err };
      const objectWithOneProduct = mock.products[0];

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        req.params = sinon.stub().returns();
        sinon.stub(productsServices, 'getById').resolves({
          status: 200, data: objectWithOneProduct
        });
      });

      after(() => {
        productsServices.getById.restore();
      });

      it('Verifica se a funcao "productsServices.getById" retorna um "status 200" ', async () => {
        await productsControllers.getById(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status.calledOnce).to.be.true;
      });

      it('Verifica se o objeto é retornado corretamente', async () => {
        await productsControllers.getById(req, res, next);
        expect(res.json.calledWith(objectWithOneProduct)).to.be.true;
      });
    });


    describe('Testa a função "productsServices.getById" com um id "inexistente"', () => {

      const req = {};
      const res = {};
      const next = (err) => { err }

      before(() => {
        req.params = sinon.stub().returns()
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsServices, 'getById').resolves({
          status: 200, data: []
        });
      });

      after(() => {
        productsServices.getById.restore();
      });

      it('Verifica se retorna um status 200', async () => {
        await productsControllers.getById(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status.calledOnce).to.be.true;
      });

      it('Verifica se "data" retorna um array vazio', async () => {
        await productsControllers.getById(req, res, next);
        expect(res.json.calledWith([])).to.be.true;
      });
    });

  });
});