const { Sequelize } = require('sequelize');
const  CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport } = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
            const response = await Flight.findAll({
                where: filter,
                order: sort,
                include: [
                    {
                        model: Airplane,
                        required: true,
                        as: 'airplane_details'
                    },
                    {
                        model: Airport,
                        required: true,
                        as: 'departure_Airport',
                        on: {
                            col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departure_Airport.code")),
                        },
                        // attributes: ["code"] if selected column need to display
                    },
                    {
                        model: Airport,
                        required: true,
                        as: 'arrival_Airport',
                        on: {
                            col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrival_Airport.code")),
                        }
                    },
            ]
            });
    
            return response;
    }
}

module.exports = FlightRepository;