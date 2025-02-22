import prisma from '../prisma';

export const getAllBooks = async () => {
  return prisma.book.findMany({
    include: {
      author: true,
      genre: true,
    },
  });
};

export const getBookById = async (id: number) => {
  return prisma.book.findUnique({
    where: { id },
    include: {
      author: true,
      genre: true,
    },
  });
};

export const createBook = async (data: {
  title: string;
  number_of_pages: number;
  is_read?: boolean;
  release_date: string;
  author_id: number;
  genre_id?: number | null;
}) => {
  return prisma.book.create({
    data: {
      title: data.title,
      number_of_pages: data.number_of_pages,
      is_read: data.is_read ?? false,
      release_date: new Date(data.release_date),
      author: { connect: { id: data.author_id } },
      genre: data.genre_id ? { connect: { id: data.genre_id } } : undefined,
    },
    include: { author: true, genre: true },
  });
};

export const updateBook = async (id: number, data: {
  title?: string;
  number_of_pages?: number;
  is_read?: boolean;
  release_date?: string;
  author_id?: number;
  genre_id?: number | null;
}) => {
  const updateData: any = { ...data };
  if (data.release_date) {
    updateData.release_date = new Date(data.release_date);
  }
  if (data.author_id) {
    updateData.author = { connect: { id: data.author_id } };
    delete updateData.author_id;
  }
  if (data.genre_id !== undefined) {
    updateData.genre = data.genre_id
      ? { connect: { id: data.genre_id } }
      : { disconnect: true };
    delete updateData.genre_id;
  }
  return prisma.book.update({
    where: { id },
    data: updateData,
    include: { author: true, genre: true },
  });
};

export const deleteBook = async (id: number) => {
  return prisma.book.delete({ where: { id } });
};
