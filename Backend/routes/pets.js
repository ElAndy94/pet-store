const express = require("express");
const router = express.Router();

const PetController = require("../controllers/pets");

router.get("", PetController.getPets);

router.post("", PetController.insertPet);

router.delete("", PetController.deletePet);

module.exports = router;
