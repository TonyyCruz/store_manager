const { expect } = require('chai');
const sinon = require('sinon');
const productsModels = require('../../../models/productsModels');
const productsServices = require('../../../services/productsServices');
const mock = require('../../mock');

describe('Testa a camada "services" da rota "/products".', () => {

  //  ========================= GET ========================= //

  describe('Testa o método "GET"', () => {
    describe('Testa a função "productsServices.getAll"', () => {

      const arrayWithObjectsOfProducts = mock.products;
      before(() => {
        sinon.stub(productsModels, 'getAll').resolves(arrayWithObjectsOfProducts)
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
        expect(result).to.deep.equal({ status: 200, data: arrayWithObjectsOfProducts });
      })
    });


    describe('Testa a função "productsServices.getById"', () => {

      const objectWithOneProduct = mock.products[0];

      before(() => {
        sinon.stub(productsModels, 'getById').resolves(objectWithOneProduct)
      });
      after(() => {
        productsModels.getById.restore();
      });

      it('Verifica se a funcao "productsServices.getById" retorna um objeto "data" contendo os dados corretos e um "status 200" ', async () => {
        const result = await productsServices.getById(1);
        const expectedResult = { status: 200, data: { id: 1, name: 'Martelo de Thor' } }
        expect(result).to.deep.equal(expectedResult);
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
        const expectedResult = { status: 404, message: { message: 'Product not found' } }
        expect(result).to.deep.equal(expectedResult);
      });
    });
  });


  //  ========================= POST ========================= //
  describe('Testa o método "POST"', () => {
    describe('Testa caso de sucesso Da função "productsServices.addAProduct"', () => {
      
      const productId = 6;

      before(() => {
        sinon.stub(productsModels, 'addAProduct').resolves(productId)
      });
      after(() => {
        productsModels.addAProduct.restore();
      });

      it('verifica se retorna o status 201 e id do item adicionado', async () => {
        const result = await productsServices.addAProduct();
        const expectedResult = { status: 201, id: 6 };
        expect(result).to.deep.equals(expectedResult)
      });
    });


    describe('Testa caso a função "productsServices.addAProduct" receba dados invalidos de productsModels', () => {

      const productId = undefined;

      before(() => {
        sinon.stub(productsModels, 'addAProduct').resolves(productId)
      });
      after(() => {
        productsModels.addAProduct.restore();
      });

      it('verifica se retorna o status 404 e a mensagem "Addition fail"', async () => {
        const result = await productsServices.addAProduct();
        console.log('teste', result);
        const expectedResult = { status: 404, message: { message: 'Addition fail' } };
        expect(result).to.deep.equals(expectedResult)
      });
    });
  });


  //  ========================= DELETE ========================= //

  describe('Testa o método "DELETE"', () => {
    describe('Testa caso de sucesso Da função "productsServices.updateAProduct"', () => {

      const affectedRows = 1;

      before(() => {
        sinon.stub(productsModels, 'updateAProduct').resolves(affectedRows)
      });
      after(() => {
        productsModels.updateAProduct.restore();
      });

      it('verifica se retorna o status 201 e id do item adicionado', async () => {
        productId = 5;
        const name = 'testName'
        const result = await productsServices.updateAProduct(productId, name);
        const expectedResult = { status: 200, data: { id: productId, name } };
        expect(result).to.deep.equals(expectedResult)
      });
    });


    describe('Testa caso da função "productsServices.updateAProduct" receber "affectedRows maior que 1"', () => {

      const affectedRows = 2;

      before(() => {
        sinon.stub(productsModels, 'updateAProduct').resolves(affectedRows)
      });
      after(() => {
        productsModels.updateAProduct.restore();
      });

      it('verifica se retorna o status 500 e a mensagem "2 lines were affected, Severe error"', async () => {
        productId = 5;
        const name = 'testName'
        const result = await productsServices.updateAProduct(productId, name);
        const expectedResult = { status: 500, message: { message: `${affectedRows} lines were affected, Severe error` } };

        expect(result).to.deep.equals(expectedResult)
      });
    });

    describe('Testa caso da função "productsServices.updateAProduct" receber "affectedRows" invalido', () => {

      const affectedRows = 0;

      before(() => {
        sinon.stub(productsModels, 'updateAProduct').resolves(affectedRows)
      });
      after(() => {
        productsModels.updateAProduct.restore();
      });

      it('verifica se retorna o status 404 e a mensagem "Action Failed" caso nenhuma linha seja alterada', async () => {
        productId = 5;
        const name = 'testName'
        const result = await productsServices.updateAProduct(productId, name);
        const expectedResult = { status: 404, message: { message: 'Action Failed' } };

        expect(result).to.deep.equals(expectedResult)
      });
    });
  });

  //  ========================= DELETE ========================= //


  describe('Testa o método "DELETE"', () => {
    describe('Testa caso de sucesso Da função "productsServices.deleteAProduct"', () => {

      const affectedRows = 1;

      before(() => {
        sinon.stub(productsModels, 'deleteAProduct').resolves(affectedRows)
      });
      after(() => {
        productsModels.deleteAProduct.restore();
      });

      it('verifica se retorna o status 204', async () => {
        productId = 2;
        const result = await productsServices.deleteAProduct(productId);
        const expectedResult = { status: 204};
        expect(result).to.deep.equals(expectedResult)
      });
    });


    describe('Testa caso da função "productsServices.deleteAProduct" receber "affectedRows maior que 1"', () => {

      const affectedRows = 2;

      before(() => {
        sinon.stub(productsModels, 'deleteAProduct').resolves(affectedRows)
      });
      after(() => {
        productsModels.deleteAProduct.restore();
      });

      it('verifica se retorna o status 500 e a mensagem "2 lines were affected, Severe error"', async () => {
        productId = 5;
        const result = await productsServices.deleteAProduct(productId);
        const expectedResult = { status: 500, message: { message: `${affectedRows} lines were affected, Severe error` } };

        expect(result).to.deep.equals(expectedResult)
      });
    });

    describe('Testa caso da função "productsServices.deleteAProduct" receber "affectedRows" invalido', () => {

      const affectedRows = 0;

      before(() => {
        sinon.stub(productsModels, 'deleteAProduct').resolves(affectedRows)
      });
      after(() => {
        productsModels.deleteAProduct.restore();
      });

      it('verifica se retorna o status 404 e a mensagem "Action Failed" caso nenhuma linha seja alterada', async () => {
        productId = 5;
        const result = await productsServices.deleteAProduct(productId);
        const expectedResult = { status: 404, message: { message: 'Delete fail' } };

        expect(result).to.deep.equals(expectedResult)
      });
    });
  });
});
