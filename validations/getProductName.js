const response = {
  nameRequired: { message: '"name" is required' },
  lengthError: { message: '"name" length must be at least 5 characters long' },
};

const getProductName = (name) => {
  if (!name || name === undefined) return { status: 400, message: response.nameRequired };
  if (name.length < 5) return { status: 422, message: response.lengthError };
  return {};
};

module.exports = { getProductName };