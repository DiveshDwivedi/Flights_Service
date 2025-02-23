const {
    Sequelize
} = require('sequelize');
const CrudRepository = require('./crud-repository');
const {
    Flight,
    Airplane,
    Airport,
    City
} = require('../models');
const {
    addRowLockOnFlight
} = require('./queries');
const db = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [{
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetails'
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code")),
                    },
                    include: {
                        model: City,
                        required: true,
                    }
                    // attributes: ["code"] if selected column need to display
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code")),
                    },
                    include: {
                        model: City,
                        required: true,
                    }
                },
            ]
        });

        return response;
    }

    async updateRemainingSeat(flightId, seats, dec = true) {
        const transaction = await db.sequelize.transaction();

        try {
            await db.sequelize.query(addRowLockOnFlight(flightId))
            const flight = await Flight.findByPk(flightId);

            if (+dec) {
                await flight.decrement('totalSeats', {
                    by: seats
                });
            } else {
                await flight.increment('totalSeats', {
                    by: seats
                });
            }
            await transaction.commit();
            return flight;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }
}

module.exports = FlightRepository;