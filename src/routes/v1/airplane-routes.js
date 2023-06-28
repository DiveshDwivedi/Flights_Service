const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');
const router = express.Router();

/**
 * /api/v1/airplanes @POST
 */
// router.post('/', AirplaneController.createAirplane);

// middleware added

router.post('/',
            AirplaneMiddlewares.validateCreateRequest,    
            AirplaneController.createAirplane
            );

/**
 * /api/v1/airplanes @GET
 */
router.get('/', AirplaneController.getAllAirplanes);

/**
 * /api/v1/airplanes/:id @GET
 */
router.get('/:id', AirplaneController.getAirplane);
module.exports = router;