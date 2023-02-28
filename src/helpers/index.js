//create custom response
const response = (res, status, message, data, pagination) => {
  const result = {};
  result.status = status || 200;
  result.message = message;
  result.data = data;
  result.pagination = pagination;
  return res.status(result.status).json(result);
};

module.exports = response;
