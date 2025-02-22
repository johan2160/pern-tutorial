import { Request, Response, NextFunction } from 'express';
import * as authorService from '../services/authorService';

export const getAuthors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.json(authors);
  } catch (error) {
    next(error);
  }
};

export const getAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const author = await authorService.getAuthorById(id);
    if (!author) {
      res.status(404).json({ error: 'Author not found' });
    } else {
      res.json(author);
    }
  } catch (error) {
    next(error);
  }
};

export const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const author = await authorService.createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
};

export const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const author = await authorService.updateAuthor(id, req.body);
    res.json(author);
  } catch (error) {
    next(error);
  }
};

export const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await authorService.deleteAuthor(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};