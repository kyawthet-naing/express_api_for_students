exports.success = (
  res,
  { message = "success", status = 200, data = null } = {}
) => {
  res.status(status).json({
    status: true,
    message: message,
    data: data,
  });
};

exports.throwError = ({ message = "server error", status = 500 } = {}) => {
  let err = new Error(message);
  err.status = status;
  throw err;
};
