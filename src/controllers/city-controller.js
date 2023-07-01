const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { SuccessResponse, ErroResponse } = require("../utils/common");

/**
 *
 * @param {*} req
 * @param {*} response
 * @returns
 *
 * @POST : /cities
 */
async function createCity(req, response) {
    try {
        const city = await CityService.createCity({
            name: req.body.name,
        });
        SuccessResponse.data = city;
        return response.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
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
 * @GET : /cities
 */
async function getAllCities(req, response) {
    try {
      const cities = await CityService.getAllCities();
        SuccessResponse.data = cities;
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
 * @GET : /cities/:id
 */
async function getCity(req, response) {
    try {
      const city = await CityService.getCity(req.params.id);
      SuccessResponse.data = city;
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
 * @DELETE : /cities/:id
 */
async function destroyCity(req, response) {
    try {
      const city = await CityService.destroyCity(req.params.id);
      SuccessResponse.data = city;
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
 * @PATCH : /cities/:id
 */
async function updateCity(req, response) {
  try {
    const city = await CityService.updateCity(req.params.id,{
      name: req.body.name,
    });
    SuccessResponse.data = city;
    return response.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErroResponse.error = error;
    return response.status(error.StatusCode).json(ErroResponse);
  }
}
module.exports = {
    createCity,
    getAllCities,
    getCity,
    destroyCity,
    updateCity
}