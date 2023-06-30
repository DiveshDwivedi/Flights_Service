const { StatusCodes } = require("http-status-codes");
const { ErroResponse } = require("../utils/common");
const AppError  = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErroResponse.message = "Something went wrong while creating city";
    ErroResponse.error = new AppError(["City name not found in the incoming request"], StatusCodes.BAD_REQUEST);
    return res.json(ErroResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
