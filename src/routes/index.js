//create router
const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

//create a route
router.get("/home", Controller.kusonimeController.getListupdate);
//create route query params page?
router.get("/home/:page", Controller.kusonimeController.getListupdate);

//export router
module.exports = router;
