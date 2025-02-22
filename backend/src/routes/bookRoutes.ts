import { Router } from 'express';
import * as bookController from '../controllers/bookController';
import { validate } from '../middlewares/validate';
import { createBookSchema, updateBookSchema } from '../schemas/bookSchema';

const router = Router();

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
router.post('/', validate(createBookSchema), bookController.createBook);
router.put('/:id', validate(updateBookSchema), bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
