const { expect } = require('chai');
const sinon = require('sinon');
const productsModels = require('../../../models/productsModels');
const connection = require('../../../database/connection');
const mock = require('../../mock');

describe('Testa a camada "models" da rota "/products".', () => {

  //  ========================= GET ========================= //

  describe('Testa o método "GET"', () => {
    describe('Testa a função "productsModels.getAll"', () => {

      const arrayOfProducts = mock.products;

      before(() => {
        sinon.stub(connection, 'query').resolves([arrayOfProducts])
      });
      after(() => {
        connection.query.restore();
      });

      it('Verifica se a rota GET "/products" retorna um "array" de "objetos" com todos os produtos', async () => {
        const result = await productsModels.getAll();
        expect(result).to.be.a('array').to.have.length(3);
        expect(result[0]).to.be.a('object');
        expect(result[2]).to.be.a('object');
      });

      it('Verifica se o objeto retornado da rota  GET "/products" comtem um "id" com um numero e um "name" com uma string', async () => {
        const result = await productsModels.getAll();
        expect(result[0]).to.have.property('id').that.is.a('number');
        expect(result[0]).to.have.property('name').that.is.a('string');
      });

      it('verifica se os dados retornados estão corretos', async () => {
        const result = await productsModels.getAll();
        expect(result[1]).to.deep.equal({ id: 2, name: 'Traje de encolhimento' });
      })
    });


    describe('Testa a função "productsModels.getById"', () => {

      const arrayOfProducts = mock.products;

      before(() => {
        sinon.stub(connection, 'query').resolves([[arrayOfProducts[2]]])
      });
      after(() => {
        connection.query.restore();
      });

      it('Verifica se a rota GET "/products/:id" retorna um "objeto" com o "id" informado e um "name" com o nome do produto', async () => {
        const result = await productsModels.getById(3);
        expect(result).to.deep.equal({ id: 3, name: 'Escudo do Capitão América' });
      });
    });
  });


  //  ========================= POST ========================= //

  describe('Testa o método POST da rota /products', () => {
    describe('Testa a função "addAProduct"', () => {

      const insertId = { insertId: 5 };

      before(() => {
        sinon.stub(connection, 'query').resolves([insertId])
      });
      after(() => {
        connection.query.restore();
      });

      it('Verifica se a função tem o retorno o "id" do produto adicionado', async () => {
        const result = await productsModels.addAProduct();
        expect(result).to.equal(5);
      })
      
    });
  });


  //  ========================= PUT ========================= //

  describe.only('Testa o método PUT da rota /products', () => {
    describe('Testa a função "updateAProduct"', () => {

      const affectedRows = { affectedRows: 1 };

      before(() => {
        sinon.stub(connection, 'query').resolves([affectedRows])
      });
      after(() => {
        connection.query.restore();
      });

      it('Verifica se a a função "updateAProduct" devolve a quantidade de linhas afetadas', async () => {
        const result = await productsModels.updateAProduct();
        expect(result).to.equal(1);
      })

    });
  });
});
