/*
  Warnings:

  - A unique constraint covering the columns `[anilistId]` on the table `AnilistUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `anilistId` to the `AnilistUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `AnilistUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AnilistUser` ADD COLUMN `anilistId` BIGINT NOT NULL,
    ADD COLUMN `expiresAt` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AnilistUser_anilistId_key` ON `AnilistUser`(`anilistId`);
