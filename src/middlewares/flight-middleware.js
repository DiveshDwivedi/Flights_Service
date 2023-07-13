const { StatusCodes } = require("http-status-codes");
const { ErroResponse } = require("../utils/common");
const AppError  = require('../utils/errors/app-error');
function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    ErroResponse.message = "Something went wrong while creating flight";
    ErroResponse.error = new AppError(["flightNumber not found in the incoming request"], StatusCodes.BAD_REQUEST);

    return res.json(ErroResponse);
  }

  if (!req.body.airplaneId) {
    ErroResponse.message = "Something went wrong while creating flight";
    ErroResponse.error = new AppError(["airplaneId not found in the incoming request"], StatusCodes.BAD_REQUEST);

    return res.json(ErroResponse);
  }

  if (!req.body.departureAirportId) {
    ErroResponse.message = "Something went wrong while creating flight";
    ErroResponse.error = new AppError(["departureAirportId not found in the incoming request"], StatusCodes.BAD_REQUEST);

    return res.json(ErroResponse);
  }

  if (!req.body.arrivalAirportId) {
    ErroResponse.message = "Something went wrong while creating flight";
    ErroResponse.error = new AppError(["arrivalAirportId not found in the incoming request"], StatusCodes.BAD_REQUEST);

    return res.json(ErroResponse);
  }

  if (!req.body.arrivalTime) {
    ErroResponse.message = "Something went wrong while creating flight";
    ErroResponse.error = new AppError(["arrivalTime not found in the incoming request"], StatusCodes.BAD_REQUEST);

    return res.json(ErroResponse);
  }

  if (!req.body.departureTime) {
    ErroResponse.message = "Something went wrong while creating flight";
    ErroResponse.error = new AppError(["departureTime not found in the incoming request"], StatusCodes.BAD_REQUEST);

    return res.json(ErroResponse);
  }

  if (!req.body.price) {
    ErroResponse.message = "Something went wrong while creating flight";
    ErroResponse.error = new AppError(["price not found in the incoming request"], StatusCodes.BAD_REQUEST);

    return res.json(ErroResponse);
  }

  if (!req.body.totalSeats) {
    ErroResponse.message = "Something went wrong while creating flight";
    ErroResponse.error = new AppError(["totalSeats not found in the incoming request"], StatusCodes.BAD_REQUEST);

    return res.json(ErroResponse);
  }

  // need to add middleware for departureTime < arrivalTime
  next();
}

module.exports = {
  validateCreateRequest,
};
