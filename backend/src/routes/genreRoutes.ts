import { Router } from 'express';
import * as genreController from '../controllers/genreController';
import { validate } from '../middlewares/validate';
import { createGenreSchema, updateGenreSchema } from '../schemas/genreSchema';

const router = Router();

router.get('/', genreController.getGenres);
router.get('/:id', genreController.getGenre);
router.post('/', validate(createGenreSchema), genreController.createGenre);
router.put('/:id', validate(updateGenreSchema), genreController.updateGenre);
router.delete('/:id', genreController.deleteGenre);

export default router;
