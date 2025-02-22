import { Router } from 'express';
import authorRoutes from './authorRoutes';
import genreRoutes from './genreRoutes';
import bookRoutes from './bookRoutes';

const router = Router();

router.use('/authors', authorRoutes);
router.use('/genres', genreRoutes);
router.use('/books', bookRoutes);

export { router };
