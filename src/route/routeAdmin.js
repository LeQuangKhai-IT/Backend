import express from 'express'
import homeController from '../controllers/controller.js'

let router = express.Router();

let initWebRouters = (app) => {
    router.get('/', homeController.getHomePage);

    return app.use('/', router)
}

module.exports = initWebRouters;


