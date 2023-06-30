const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { SuccessResponse, ErroResponse } = require("../utils/common");

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

module.exports = {
    createCity
}