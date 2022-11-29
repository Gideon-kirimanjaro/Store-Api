const handleErrors = (err, req, res, next) => {
  err.status(500);
  console.log(err);
  // return next(err);
  // return res.status(500).json(err.message);
};
module.exports = handleErrors;
