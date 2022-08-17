const { expect } = require('chai');
const sinon = require('sinon');
const salesServices = require('../../../services/salesServices');
const salesControllers = require('../../../controllers/salesControllers');
const mock = require('../../mock');

describe('Testa a camada "controllers" da rota "/sales".', () => {


  //  ========================= GET ========================= //

  describe('Testa o método "GET" da rota "/sales".', () => {
    describe('Testa a função "salesControllers.getAllSales"', () => {

      const req = {};
      const res = {};
      const next = (err) => { err };
      const arrayOfProducts = mock.products;

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesServices, 'getAllSales').resolves({
          status: 200, data: arrayOfProducts
        });
      });

      after(() => {
        salesServices.getAllSales.restore();
      });

      it('Verifica se a rota "/" retorna um status 200', async () => {
        await salesControllers.getAllSales(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status.calledOnce).to.be.true;
      });

      it('Verifica se a rota "/" retorna um "array" com "objetos" contendo todos os produtos', async () => {
        await salesControllers.getAllSales(req, res, next);
        expect(res.json.calledWith(arrayOfProducts)).to.be.true;
      });
    });


  //   describe('Testa a função "productsServices.getById" com um id "existente"', () => {

  //     const req = {};
  //     const res = {};
  //     const next = (err) => { err };
  //     const returnedObject = mock.products[0];

  //     before(() => {
  //       res.status = sinon.stub().returns(res);
  //       res.json = sinon.stub().returns();
  //       req.params = sinon.stub().returns();
  //       sinon.stub(productsServices, 'getById').resolves({
  //         status: 200, data: returnedObject
  //       });
  //     });

  //     after(() => {
  //       productsServices.getById.restore();
  //     });

  //     it('Verifica se a funcao "productsServices.getById" retorna um "status 200" ', async () => {
  //       await productsControllers.getById(req, res, next);
  //       expect(res.status.calledWith(200)).to.be.true;
  //       expect(res.status.calledOnce).to.be.true;
  //     });

  //     it('Verifica se o objeto é retornado corretamente', async () => {
  //       await productsControllers.getById(req, res, next);
  //       expect(res.json.calledWith(returnedObject)).to.be.true;
  //     });
  //   });


  //   describe('Testa a função "productsServices.getById" com um id "inexistente"', () => {

  //     const req = {};
  //     const res = {};
  //     const next = (err) => { err }

  //     before(() => {
  //       req.params = sinon.stub().returns()
  //       res.status = sinon.stub().returns(res);
  //       res.json = sinon.stub().returns();

  //       sinon.stub(productsServices, 'getById').resolves({
  //         status: 200, data: []
  //       });
  //     });

  //     after(() => {
  //       productsServices.getById.restore();
  //     });

  //     it('Verifica se retorna um status 200', async () => {
  //       await productsControllers.getById(req, res, next);
  //       expect(res.status.calledWith(200)).to.be.true;
  //       expect(res.status.calledOnce).to.be.true;
  //     });

  //     it('Verifica se "data" retorna um array vazio', async () => {
  //       await productsControllers.getById(req, res, next);
  //       expect(res.json.calledWith([])).to.be.true;
  //     });
  //   });
  });

  //  ========================= POST ========================= //

  // describe('Testa o método "POST" da camada /products da função "productsControllers.addAProduct"', () => {
  //   describe('testa casos de sucesso', () => {
  //     const req = { body: { name: 'test' } };
  //     const res = {};
  //     const next = (err) => { err };
  //     const receivedId = 5;

  //     before(() => {
  //       res.status = sinon.stub().returns(res);
  //       res.json = sinon.stub().returns();

  //       sinon.stub(productsServices, 'addAProduct').resolves({
  //         status: 201, id: receivedId
  //       });
  //     });

  //     after(() => {
  //       productsServices.addAProduct.restore();
  //     });

  //     it('Verifica se retorna status 201', async () => {
  //       await productsControllers.addAProduct(req, res, next);
  //       expect(res.status.calledWith(201)).to.be.true;
  //       expect(res.status.calledOnce).to.be.true;
  //     });

  //     it('Verifica se retorna um objeto contendo o id e nome do produto adicionado', async () => {
  //       await productsControllers.addAProduct(req, res, next);
  //       const expectedResult = { id: 5, name: 'test' };
  //       expect(res.json.calledWith(expectedResult)).to.be.true;
  //     });
  //   });

  //   describe('testa casos de falha', () => {
  //     const req = { body: { name: 'test' } };
  //     const res = {};
  //     const next = (err) => { err };
  //     const errorMessage = { message: 'Action Failed' };

  //     before(() => {
  //       res.status = sinon.stub().returns(res);
  //       res.json = sinon.stub().returns();

  //       sinon.stub(productsServices, 'addAProduct').resolves({
  //         status: 404, message: errorMessage
  //       });
  //     });

  //     after(() => {
  //       productsServices.addAProduct.restore();
  //     });

  //     it('Verifica se retorna status 404', async () => {
  //       await productsControllers.addAProduct(req, res, next);
  //       expect(res.status.calledWith(404)).to.be.true;
  //       expect(res.status.calledOnce).to.be.true;
  //     });

  //     it('Verifica se retorna em caso de falha envia a mensagem "Action Failed"', async () => {
  //       await productsControllers.addAProduct(req, res, next);
  //       expect(res.json.calledWith(errorMessage)).to.be.true;
  //     });
  //   });
  // });

});