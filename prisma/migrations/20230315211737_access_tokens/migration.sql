/*
  Warnings:

  - The primary key for the `AnilistUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `accessToken` to the `AnilistUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `AnilistUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `AnilistUser` DROP FOREIGN KEY `AnilistUser_userId_fkey`;

-- AlterTable
ALTER TABLE `AnilistUser` DROP PRIMARY KEY,
    ADD COLUMN `accessToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `userId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `AnilistUser` ADD CONSTRAINT `AnilistUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
