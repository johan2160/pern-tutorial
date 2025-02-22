import prisma from '../prisma';

export const getAllGenres = async () => {
  return prisma.genre.findMany();
};

export const getGenreById = async (id: number) => {
  return prisma.genre.findUnique({ where: { id } });
};

export const createGenre = async (data: { name: string; description?: string | null }) => {
  return prisma.genre.create({ data });
};

export const updateGenre = async (id: number, data: { name?: string; description?: string | null }) => {
  return prisma.genre.update({ where: { id }, data });
};

export const deleteGenre = async (id: number) => {
  return prisma.genre.delete({ where: { id } });
};
