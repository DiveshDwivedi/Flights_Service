const { FlightRepository } = require('../repositories');
const AppError  = require('../utils/errors/app-error');
const {Op} = require('sequelize');
const { StatusCodes } = require('http-status-codes');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        console.log(error);
       if (error.name == 'SequelizeValidationError') {
        let explaination = [];

        error.errors.forEach((err) => {
            explaination.push([err.message, err.value]);
        });

        throw new AppError(explaination, StatusCodes.BAD_REQUEST);
       }
       throw new AppError('Cannot create new flight Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endTripTime = " 23:59:00";
    // trips= BLR-GKP
    if (query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split('-');
        if (departureAirportId == arrivalAirportId) {
            throw new AppError('departureAirportId and arrivalAirportId should be different', StatusCodes.BAD_GATEWAY);
        }
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    if (query.price) {
        [minPrice, maxPrice] = query.price.split('-');

        customFilter.price = {
            [Op.between] : [minPrice, ((maxPrice == undefined) ? 20000 : maxPrice)], 
        }
    }

    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte] : query.travellers
        }
    }

    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between] : [query.tripDate, query.tripDate + endTripTime]
        }
    }

    if (query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters;
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch All Flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights
}