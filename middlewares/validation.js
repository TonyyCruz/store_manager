const response = {
  nameRequired: { message: '"name" is required' },
  lengthError: { message: '"name" length must be at least 5 characters long' },
};

const productName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === undefined) return res.status(400).json(response.nameRequired);
  if (name.length < 5) return res.status(422).json(response.lengthError);
  next();
};

module.exports = {
  productName,
};