const sendResponse = (res, status, message, data = null) => {
  const response = {
    status,
    message,
  };
  if (data !== null) {
    response.data = data;
  }
  res.status(status).json(response);
};

const successResponse = (res, message, data = null) => {
  sendResponse(res, 200, message, data);
};

const errorResponse = (res, status, message) => {
  sendResponse(res, status, message);
};

module.exports = {
  sendResponse,
  successResponse,
  errorResponse,
};
