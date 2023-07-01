const { CityRepository } = require('../repositories');
const AppError  = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;   
    } catch (error) {
        console.log(error);
      if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
        let explaination = [];
        error.errors.forEach((err) => {
            explaination.push(err.message);
        });
        throw new AppError(explaination, StatusCodes.BAD_REQUEST);
      } 
      throw new AppError('Cannot create new Airplane Object', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function getAllCities() {
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new AppError('Cannot fetch All Airplanes data', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch (error) {
        if (error.StatusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('City not present', StatusCodes.NOT_FOUND); 
        }
        throw new AppError('Cannot fetch City data', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

async function destroyCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if (error.StatusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('City not present you wanted to delete', StatusCodes.NOT_FOUND); 
        }
        throw new AppError('City data not found', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

async function updateCity(id, data) {
    try {
        const city = await cityRepository.update(id, data);
        return city;
    } catch (error) {
        if (error.StatusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('City not present you wanted to update', StatusCodes.NOT_FOUND); 
        }
        throw new AppError('City data not found', StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

module.exports = {
    createCity,
    getAllCities,
    getCity,
    destroyCity,
    updateCity
}