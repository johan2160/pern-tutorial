import { Router } from 'express';
import * as authorController from '../controllers/authorController';
import { validate } from '../middlewares/validate';
import { createAuthorSchema, updateAuthorSchema } from '../schemas/authorSchema';

const router = Router();

router.get('/', authorController.getAuthors);
router.get('/:id', authorController.getAuthor);
router.post('/', validate(createAuthorSchema), authorController.createAuthor);
router.put('/:id', validate(updateAuthorSchema), authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

export default router;
