/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `movies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `movies_title_key` ON `movies`(`title`);
