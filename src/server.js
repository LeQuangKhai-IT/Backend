import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "../src/config/viewEngine.js"
import initWebRouters from "./route/router-staff.js"
import { } from "dotenv/config.js";
let PORT = process.env.PORT || 8751;

/* create an express app and use JSON */
let app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app)
initWebRouters(app)


app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
})
