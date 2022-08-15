const productsServices = require('../services/productsServices');

const productsControllers = {
  getAll: async (_req, res, next) => {
    try {
      const { message, status, data } = await productsServices.getAllProducts();
      res.status(status).json(data || message);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const { status, message, data } = await productsServices.getAProduct(id);
      res.status(status).json(data || message);
    } catch (err) {
      next(err);
    }
  },

  addAProduct: async (req, res, next) => {
    const { name } = req.body;
    try {
      const { status, message, id } = await productsServices.addProduct(name);
      res.status(status).json({ id, name } || message);
    } catch (err) {
      next(err);
    }
  },

  updateAProduct: async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const { status, message, data } = await productsServices.productUpdate(id, name);
      res.status(status).json(data || message);
    } catch (err) {
      next(err);
    }
  },

  deleteAProduct: async (req, res, next) => {
    const { id } = req.params;
    try {
      const { status, message } = await productsServices.productDelete(id);
      res.status(status).json('' || message);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productsControllers;