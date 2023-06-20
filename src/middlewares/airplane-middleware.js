const { StatusCodes } = require("http-status-codes");
const { ErroResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErroResponse.message = "Something went wrong while creating airplane";
    ErroResponse.error = {
      explanation:
        "Model Number not found in the incoming request correct form",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErroResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
};
