const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { SuccessResponse, ErroResponse } = require("../utils/common");

/**
 *
 * @param {*} req
 * @param {*} response
 * @returns
 *
 * @POST : /flights
 */
async function createFlight(req, response) {
  try {
    const flight = await FlightService.createFlight({
        flightNumber: req.body.flightNumber,
        airplaneId: req.body.airplaneId,
        departureAirportId: req.body.departureAirportId,
        arrivalAirportId: req.body.arrivalAirportId,
        arrivalTime: req.body.arrivalTime,
        departureTime: req.body.departureTime,
        price: req.body.price,
        boardingGate: req.body.boardingGate,
        totalSeats: req.body.totalSeats,
    });
    SuccessResponse.data = flight;
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
 * @GET : /flights
 */
async function getAllFlights(req, response) {
  try {
      const flights = await FlightService.getAllFlights(req.query);
      SuccessResponse.data = flights;
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
 * @GET : /flight/:id
 */
async function getFlight(req, response) {
  try {
    const flight = await FlightService.getFlight(req.params.id);
    SuccessResponse.data = flight;
    return response.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErroResponse.error = error;
    return response.status(error.StatusCode).json(ErroResponse);
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * 
 * @PATCH : /flight/:seats
 */
async function updateSeats(req, res) {
  try {
    const response = await FlightService.updateSeats({
      flightId: req.params.id,
      seats: req.body.seats,
      dec: req.body.dec,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErroResponse.error = error;
    return res.status(error.StatusCode).json(ErroResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats
};
