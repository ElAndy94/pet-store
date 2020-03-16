import { Router } from 'express';

const router = Router();

import {
  getPets,
  getPetById,
  updatePet,
  insertPet,
  deletePet
} from '../controllers/pets';
// const PetController = require('../controllers/pets');

router.get('', getPets);

router.get('/:id', getPetById);

router.put('/:id', updatePet);

router.post('', insertPet);

router.delete('', deletePet);

// module.exports = router;
export default router;
