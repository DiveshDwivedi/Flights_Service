const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { SuccessResponse, ErroResponse } = require("../utils/common");

/**
 *
 * @param {*} req
 * @param {*} response
 * @returns
 *
 * @POST : /airports
 */
async function createAirport(req, response) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId
    });
    SuccessResponse.data = airport;
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
 * @GET : /airports
 */
async function getAllAirports(req, response) {
  try {
    const airports = await AirportService.getAllAirports();
      SuccessResponse.data = airports;
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
 * @GET : /airport/:id
 */
async function getAirport(req, response) {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airport;
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
 * @DELETE : /airport/:id
 */
async function destroyAirport(req, response) {
  try {
    const airport = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.data = airport;
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
 * @PATCH : /airport/:id
 */
async function updateAirport(req, response) {
  try {
    const airport = await AirportService.updateAirport(req.params.id,{
        name: req.body.name,
        code: req.body.code,
        address: req.body.address,
        cityId: req.body.cityId
    });
    SuccessResponse.data = airport;
    return response.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErroResponse.error = error;
    return response.status(error.StatusCode).json(ErroResponse);
  }
}

module.exports = {
  createAirport,
  getAllAirports,
  getAirport,
  destroyAirport,
  updateAirport
};
