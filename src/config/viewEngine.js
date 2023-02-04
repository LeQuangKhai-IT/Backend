import express from 'express'

let configViewEngine = (app) => {
    //app.use(express.static("./src/public")); // Chỉ lấy ảnh trên server thông qua public
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

export default configViewEngine;