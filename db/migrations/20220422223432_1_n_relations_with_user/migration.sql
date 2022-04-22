/*
  Warnings:

  - Added the required column `userId` to the `AcademicEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `LaboralExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TechnicalEducation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AcademicEducation` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `LaboralExperience` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Publication` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Reference` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Skill` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TechnicalEducation` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reference` ADD CONSTRAINT `Reference_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TechnicalEducation` ADD CONSTRAINT `TechnicalEducation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademicEducation` ADD CONSTRAINT `AcademicEducation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboralExperience` ADD CONSTRAINT `LaboralExperience_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
