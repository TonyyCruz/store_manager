const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);
  res.status(err.status || 500).json({ message: err.message } || { message: 'unknown error' });
};

module.exports = errorMiddleware;