import express from "express";
const router = express.Router();

const PetController = require("../controllers/pets");

router.get("", PetController.getPets);

router.get("/:id", PetController.getPetById);

router.put("/:id", PetController.updatePet);

router.post("", PetController.insertPet);

router.delete("", PetController.deletePet);

module.exports = router;
