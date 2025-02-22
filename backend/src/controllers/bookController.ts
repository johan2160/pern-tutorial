import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/bookService';

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const book = await bookService.getBookById(id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' }); 
      return
    } 
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const book = await bookService.updateBook(id, req.body);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await bookService.deleteBook(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
