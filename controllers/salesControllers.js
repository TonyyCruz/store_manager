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
};

module.exports = salesControllers;