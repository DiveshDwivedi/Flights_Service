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


module.exports = {
    createCity
}