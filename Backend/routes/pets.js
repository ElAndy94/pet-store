const express = require("express");
const router = express.Router();

const PetController = require("../controllers/pets");

router.get("", PetController.getMovies);
router.post("/insert", PetController.insertPet);

module.exports = router;
