import express from "express";
import res from "express/lib/response";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", (req, res)=>{
        return res.send("Hello Nam Son")
    });
    return app.use("/", router);
}

module.exports = initWebRoutes;