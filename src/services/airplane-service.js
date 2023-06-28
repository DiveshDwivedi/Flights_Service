const { AirplaneRepository } = require('../repositories');
const AppError  = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
       if (error.name == 'SequelizeValidationError') {
        let explaination = [];

        error.errors.forEach((err) => {
            explaination.push([err.message, err.value]);
        });

        throw new AppError(explaination, StatusCodes.BAD_REQUEST);
       }
       throw new AppError('Cannot create new Airplane Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Cannot fetch All Airplanes data', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if (error.StatusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('Airplane not present', StatusCodes.NOT_FOUND); 
        }
        throw new AppError('Cannot fetch Airplane data', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

module.exports = {
    createAirplane,
    getAllAirplanes,
    getAirplane
}