const salesServices = require('../services/salesServices');

const salesControllers = {
  getAllSales: async (_req, res, next) => {
    try {
      const { status, data } = await salesServices.getAllSales();
      res.status(status).json(data);
    } catch (err) {
      next(err);
    }
  },

  getSaleById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const { status, data, message } = await salesServices.getSaleById(id);
      res.status(status).json(data || message);
    } catch (err) {
      next(err);
    }
  },

  registerSale: async (req, res, next) => {
    try {
      const { id, data, status } = await salesServices.registerSale(req.body);
      res.status(status).json({ id, itemsSold: data });
    } catch (err) {
      next(err);
    }
  },

  deleteSale: async (req, res, next) => {
    const { id } = req.params;
    try {
      const { message, status } = await salesServices.deleteSale(id);
      res.status(status).json(message || '');
    } catch (err) {
      next(err);
    }
  },

  editSale: async (req, res, next) => {
    const { id } = req.params;

    try {
      const { data, status, message } = await salesServices.editSale({
        id, itemsSold: req.body,
      });
      res.status(status).json(message || { id, itemsSold: data });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = salesControllers;