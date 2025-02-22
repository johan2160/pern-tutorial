import { Request, Response, NextFunction } from 'express';
import * as genreService from '../services/genreService';

export const getGenres = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genres = await genreService.getAllGenres();
    res.json(genres);
  } catch (error) {
    next(error);
  }
};

export const getGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const genre = await genreService.getGenreById(id);
    if (!genre) {
      res.status(404).json({ error: 'Genre not found' });
      return
    }
    res.json(genre);
  } catch (error) {
    next(error);
  }
};

export const createGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genre = await genreService.createGenre(req.body);
    res.status(201).json(genre);
  } catch (error) {
    next(error);
  }
};

export const updateGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const genre = await genreService.updateGenre(id, req.body);
    res.json(genre);
  } catch (error) {
    next(error);
  }
};

export const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await genreService.deleteGenre(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
