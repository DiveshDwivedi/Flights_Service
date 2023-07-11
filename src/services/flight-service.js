const { FlightRepository } = require('../repositories');
const AppError  = require('../utils/errors/app-error');
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

module.exports = {
    createFlight,
}