//create router
const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

//create a route
router.get("/home/:page", Controller.kusonimeController.getListupdate);
router.get("/detail/:link", Controller.kusonimeController.getDetail);

//export router
module.exports = router;
