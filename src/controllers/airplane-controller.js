const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { SuccessResponse, ErroResponse } = require("../utils/common");

/**
 *
 * @param {*} req
 * @param {*} response
 * @returns
 *
 * @POST : /airplanes
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
    return response.status(error.StatusCode).json(ErroResponse);
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} response 
 * @returns 
 * 
 * @GET : /airplanes
 */
async function getAllAirplanes(req, response) {
  try {
    const airplanes = await AirplaneService.getAllAirplanes();
      SuccessResponse.data = airplanes;
      return response.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErroResponse.error = error;
    return response.status(error.StatusCode).json(ErroResponse);
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} response 
 * @returns 
 * 
 * @GET : /airplane/:id
 */
async function getAirplane(req, response) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return response.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErroResponse.error = error;
    return response.status(error.StatusCode).json(ErroResponse);
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} response 
 * @returns 
 * 
 * @DELETE : /airplane/:id
 */
async function destroyAirplane(req, response) {
  try {
    const airplane = await AirplaneService.destroyAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return response.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErroResponse.error = error;
    return response.status(error.StatusCode).json(ErroResponse);
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} response 
 * @returns 
 * 
 * @PATCH : /airplane/:id
 */
async function updateAirplane(req, response) {
  try {
    const airplane = await AirplaneService.updateAirplane(req.params.id,{
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    return response.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErroResponse.error = error;
    return response.status(error.StatusCode).json(ErroResponse);
  }
}

module.exports = {
  createAirplane,
  getAllAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane
};
