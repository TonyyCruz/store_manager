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

      it('Verifica se a fumção salesControllers.getAllSales retorna um status 200', async () => {
        await salesControllers.getAllSales(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status.calledOnce).to.be.true;
      });

      it('Verifica se a função salesControllers.getAllSales retorna um "array" com "objetos" contendo todos os produtos', async () => {
        await salesControllers.getAllSales(req, res, next);
        expect(res.json.calledWith(arrayOfProducts)).to.be.true;
      });
    });


    describe('Testa a função "salesControllers.getSaleById"', () => {

      const req = { params: { id: 2 } };
      const res = {};
      const next = (err) => { err };
      const returnedArray = [
        {
          "date": "2022-08-14T23:18:18.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "date": "2022-08-14T23:18:18.000Z",
          "productId": 2,
          "quantity": 10
        }
      ];

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        req.params = sinon.stub().returns();

        sinon.stub(salesServices, 'getSaleById').resolves({
          status: 200, data: returnedArray
        });
      });

      after(() => {
        salesServices.getSaleById.restore();
      });

      it('Verifica se a funcao "salesControllers.getSaleById" retorna um "status 200" ', async () => {
        await salesControllers.getSaleById(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.status.calledOnce).to.be.true;
      });

      it('Verifica se o objeto é retornado corretamente', async () => {
        await salesControllers.getSaleById(req, res, next);
        expect(res.json.calledWith(returnedArray)).to.be.true;
      });
    });
  });

  //  ========================= POST ========================= //

  describe('Testa o método "POST" da camada /sales', () => {
    describe('testa a função "salesControllers.registerSale"', () => {
      const req = { body: {} };
      const res = {};
      const next = (err) => { err };
      const itemsSold = [
        {
          "productId": 2,
          "quantity": 2
        },
        {
          "productId": 1,
          "quantity": 50
        }
      ];

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesServices, 'registerSale').resolves({
          status: 201, data: itemsSold, id: 9
        });
      });

      after(() => {
        salesServices.registerSale.restore();
      });

      it('Verifica se retorna status 201', async () => {
        await salesControllers.registerSale(req, res, next);
        expect(res.status.calledWith(201)).to.be.true;
        expect(res.status.calledOnce).to.be.true;
      });

      it('Verifica se retorna um objeto contendo o id e nome do produto adicionado', async () => {
        await salesControllers.registerSale(req, res, next);
        console.log(res.json.args[0][0]);
        const expectedResponse = {
          "id": 9,
          "itemsSold": [
            {
              "productId": 2,
              "quantity": 2
            },
            {
              "productId": 1,
              "quantity": 50
            }
          ]
        }
        expect(res.json.calledWith(expectedResponse)).to.be.true;
      });
    });
  });

});