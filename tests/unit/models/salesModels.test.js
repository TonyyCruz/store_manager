const { expect } = require('chai');
const sinon = require('sinon');
const salesModels = require('../../../models/salesModels');
const connection = require('../../../database/connection');
const mock = require('../../mock');

describe('Testa a camada "models" da rota "/sales".', () => {

  //  ========================= POST ========================= //

  describe('Testa o método "POST"', () => {
    describe('Testa a função "salesModels.addSalesProducts"', () => {

      const itemsSold = [{ productId: 2, quantity: 3 }];

      before(() => {
        sinon.stub(connection, 'query').resolves([]);
        sinon.stub(salesModels, 'addSales').resolves(2);
      });
      after(() => {
        connection.query.restore();
        salesModels.addSales.restore();
      });

      it('Verifica se a função retorna o valor correto', async () => {
        const result = await salesModels.addSalesProducts({ itemsSold });
        expect(result).to.be.a('number');
        expect(result).to.be.equal(2);
      });
    });
  });


  //  ========================= GET ========================= //

  describe('Testa o método "GET"', () => {
    describe('Testa a função "salesModels.getAll"', () => {

      const arrayWithSaladItems = [{
        productId: 2, quantity: 3, saleId: 1,
        date: "2022-08-14T23:18:18.000Z"
      }];

      before(() => {
        sinon.stub(connection, 'query').resolves([arrayWithSaladItems]);
      });
      after(() => {
        connection.query.restore();
      });

      it('Verifica se a rota a função retorna o valor correto', async () => {
        const result = await salesModels.getAll();
        console.log(result);
        expect(result).to.be.a('array').to.have.length(1);
        expect(result[0]).to.be.a('object');
        expect(result[0]).to.have.all.keys('productId', 'quantity', 'saleId', 'date');
        expect(result).to.be.deep.eq(arrayWithSaladItems);
      });
    });


    describe('Testa a função "salesModels.getById"', () => {

      const arrayOfSaladItemsById = [
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
        sinon.stub(connection, 'query').resolves([arrayOfSaladItemsById]);
      });
      after(() => {
        connection.query.restore();
      });

      it('Verifica se a rota a função retorna o valor correto', async () => {
        const result = await salesModels.getById();
        console.log(result);
        expect(result).to.be.a('array').to.have.length(2);
        expect(result[0]).to.be.a('object');
        expect(result[1]).to.be.an('object').to.have.all.keys('productId', 'quantity', 'date');
        expect(result).to.be.deep.eq(arrayOfSaladItemsById);
      });
    });
  });
});
