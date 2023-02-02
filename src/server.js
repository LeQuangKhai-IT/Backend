import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import intWebRouter from "./route/router"
import connectDB from "./database/init.redis";
import 'dotenv/config'
let PORT = process.env.PORT || 8751;

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect DB
connectDB();

// View
viewEngine(app);

// Router
intWebRouter(app);

app.listen(PORT, () => {
    console.log("App listening on port: " + PORT);
})
