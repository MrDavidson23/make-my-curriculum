/*
  Warnings:

  - You are about to drop the column `UserId` on the `AcademicEducation` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `LaboralExperience` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Reference` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `TechnicalEducation` table. All the data in the column will be lost.
  - You are about to drop the column `profession` on the `User` table. All the data in the column will be lost.
  - Added the required column `curriculumId` to the `AcademicEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Curriculum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curriculumId` to the `LaboralExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curriculumId` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curriculumId` to the `Reference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curriculumId` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curriculumId` to the `TechnicalEducation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `AcademicEducation` DROP FOREIGN KEY `AcademicEducation_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `LaboralExperience` DROP FOREIGN KEY `LaboralExperience_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `Publication` DROP FOREIGN KEY `Publication_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `Reference` DROP FOREIGN KEY `Reference_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TechnicalEducation` DROP FOREIGN KEY `TechnicalEducation_UserId_fkey`;

-- AlterTable
ALTER TABLE `AcademicEducation` DROP COLUMN `UserId`,
    ADD COLUMN `curriculumId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Curriculum` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `profession` VARCHAR(191) NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `LaboralExperience` DROP COLUMN `UserId`,
    ADD COLUMN `curriculumId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Publication` DROP COLUMN `UserId`,
    ADD COLUMN `curriculumId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Reference` DROP COLUMN `userId`,
    ADD COLUMN `curriculumId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Skill` ADD COLUMN `curriculumId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TechnicalEducation` DROP COLUMN `UserId`,
    ADD COLUMN `curriculumId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `profession`;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curriculum` ADD CONSTRAINT `Curriculum_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reference` ADD CONSTRAINT `Reference_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TechnicalEducation` ADD CONSTRAINT `TechnicalEducation_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademicEducation` ADD CONSTRAINT `AcademicEducation_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboralExperience` ADD CONSTRAINT `LaboralExperience_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
