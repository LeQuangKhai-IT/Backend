import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRouters from "./route/routeAdmin"
import connection from "./database/init.redis"

import 'dotenv/config'
let PORT = process.env.PORT || 8751;

/* create an express app and use JSON */
let app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app)
initWebRouters(app)
connection()
app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
})
