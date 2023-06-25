const { StatusCodes } = require("http-status-codes");
const { ErroResponse } = require("../utils/common");
const AppError  = require('../utils/errors/app-error');
function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErroResponse.message = "Something went wrong while creating airplane";
    ErroResponse.error = new AppError(["Model Number not found in the incoming request correct form"], StatusCodes.BAD_REQUEST);

    return res.json(ErroResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
