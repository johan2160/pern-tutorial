import prisma from '../prisma';

export const getAllAuthors = async () => {
  return prisma.author.findMany();
};

export const getAuthorById = async (id: number) => {
  return prisma.author.findUnique({ where: { id } });
};

export const createAuthor = async (data: { name: string; biography?: string | null }) => {
  return prisma.author.create({ data });
};

export const updateAuthor = async (id: number, data: { name?: string; biography?: string | null }) => {
  return prisma.author.update({ where: { id }, data });
};

export const deleteAuthor = async (id: number) => {
  return prisma.author.delete({ where: { id } });
};
