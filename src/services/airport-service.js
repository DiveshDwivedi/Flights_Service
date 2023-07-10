const { AirportRepository } = require('../repositories');
const AppError  = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
       if (error.name == 'SequelizeValidationError') {
        let explaination = [];

        error.errors.forEach((err) => {
            explaination.push([err.message, err.value]);
        });

        throw new AppError(explaination, StatusCodes.BAD_REQUEST);
       }
       throw new AppError('Cannot create new Airport Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot fetch All Airports data', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if (error.StatusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Airport not present', StatusCodes.NOT_FOUND); 
        }
        throw new AppError('Cannot fetch Airport data', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

async function destroyAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if (error.StatusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Airport not present you wanted to delete', StatusCodes.NOT_FOUND); 
        }
        throw new AppError('Airport data not found', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

async function updateAirport(id, data) {
    try {
        const airport = await airportRepository.update(id, data);
        return airport;
    } catch (error) {
        if (error.StatusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Airport not present you wanted to update', StatusCodes.NOT_FOUND); 
        }
        throw new AppError('Airport data not found', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

module.exports = {
    createAirport,
    getAllAirports,
    getAirport,
    destroyAirport,
    updateAirport
}