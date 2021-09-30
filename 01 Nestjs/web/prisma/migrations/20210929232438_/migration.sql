/*
  Warnings:

  - You are about to drop the column `videoclips` on the `Musica` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Musica` DROP COLUMN `videoclips`,
    ADD COLUMN `videoclip` BOOLEAN NOT NULL DEFAULT false;
