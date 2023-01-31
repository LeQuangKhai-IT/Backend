import express from "express";
import homeController from "../controllers/controller"

let router = express.Router();

let intWebRouters = (app) => {
    // get controller
    router.get('/', homeController.getHomePage);

    return app.use('/', router);
}

module.exports = intWebRouters;