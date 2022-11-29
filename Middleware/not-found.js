const notFound = (err, req, res, next) => {
  err.status = 404;
  next(err);
};
module.exports = notFound;
