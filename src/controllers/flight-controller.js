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

module.exports = {
  createFlight,
};
