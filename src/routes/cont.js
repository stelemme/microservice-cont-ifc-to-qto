const express = require("express");
const router = express.Router();

// Importing the controllers
const {
  ifcToQtoGET,
  ifcToQtoPOST,
} = require("../controllers/ifcToQto");

// Assigning controllers to the "/cont/ifc-to-qto" URI
router.get("/ifc-to-qto", ifcToQtoGET);
router.post("/ifc-to-qto", ifcToQtoPOST);

module.exports = router;
