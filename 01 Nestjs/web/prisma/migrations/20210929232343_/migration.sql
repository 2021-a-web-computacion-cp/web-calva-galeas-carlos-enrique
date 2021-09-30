/*
  Warnings:

  - You are about to drop the column `videoclip` on the `Musica` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Musica` DROP COLUMN `videoclip`,
    ADD COLUMN `videoclips` BOOLEAN NOT NULL DEFAULT false;
