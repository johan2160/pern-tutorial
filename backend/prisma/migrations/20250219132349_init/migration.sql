-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "biography" TEXT,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "number_of_pages" INTEGER NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "release_date" TIMESTAMP(3) NOT NULL,
    "author_id" INTEGER NOT NULL,
    "genre_id" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;
