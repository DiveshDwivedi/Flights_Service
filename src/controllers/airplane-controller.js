const { StatusCodes } = require("http-status-codes");

const { AirplaneService } = require("../services");

const { SuccessResponse, ErroResponse } = require("../utils/common");

/**
 *
 * @param {*} req
 * @param {*} response
 * @returns
 *
 * POST : /airplanes
 */
async function createAirplane(req, response) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    return response.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErroResponse.error = error;
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErroResponse);
  }
}

module.exports = {
  createAirplane,
};
