/*
  Warnings:

  - You are about to drop the column `curriculumId` on the `AcademicEducation` table. All the data in the column will be lost.
  - You are about to drop the column `curriculumId` on the `LaboralExperience` table. All the data in the column will be lost.
  - You are about to drop the column `curriculumId` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the column `curriculumId` on the `Reference` table. All the data in the column will be lost.
  - You are about to drop the column `curriculumId` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `curriculumId` on the `TechnicalEducation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `AcademicEducation` DROP FOREIGN KEY `AcademicEducation_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `LaboralExperience` DROP FOREIGN KEY `LaboralExperience_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `Publication` DROP FOREIGN KEY `Publication_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `Reference` DROP FOREIGN KEY `Reference_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `Skill` DROP FOREIGN KEY `Skill_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `TechnicalEducation` DROP FOREIGN KEY `TechnicalEducation_curriculumId_fkey`;

-- AlterTable
ALTER TABLE `AcademicEducation` DROP COLUMN `curriculumId`;

-- AlterTable
ALTER TABLE `LaboralExperience` DROP COLUMN `curriculumId`;

-- AlterTable
ALTER TABLE `Publication` DROP COLUMN `curriculumId`;

-- AlterTable
ALTER TABLE `Reference` DROP COLUMN `curriculumId`;

-- AlterTable
ALTER TABLE `Skill` DROP COLUMN `curriculumId`;

-- AlterTable
ALTER TABLE `TechnicalEducation` DROP COLUMN `curriculumId`;

-- CreateTable
CREATE TABLE `ReferenceOnCurriculum` (
    `referenceId` INTEGER NOT NULL,
    `curriculumId` INTEGER NOT NULL,

    PRIMARY KEY (`referenceId`, `curriculumId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PublicationOnCurriculum` (
    `publicationId` INTEGER NOT NULL,
    `curriculumId` INTEGER NOT NULL,

    PRIMARY KEY (`publicationId`, `curriculumId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TechnicalEducationOnCurriculum` (
    `technicalEducationId` INTEGER NOT NULL,
    `curriculumId` INTEGER NOT NULL,

    PRIMARY KEY (`technicalEducationId`, `curriculumId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademicEducationOnCurriculum` (
    `academicEducationId` INTEGER NOT NULL,
    `curriculumId` INTEGER NOT NULL,

    PRIMARY KEY (`academicEducationId`, `curriculumId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LaboralExperienceOnCurriculum` (
    `laboralExperienceId` INTEGER NOT NULL,
    `curriculumId` INTEGER NOT NULL,

    PRIMARY KEY (`laboralExperienceId`, `curriculumId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SkillOnCurriculum` (
    `skillId` INTEGER NOT NULL,
    `curriculumId` INTEGER NOT NULL,

    PRIMARY KEY (`skillId`, `curriculumId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReferenceOnCurriculum` ADD CONSTRAINT `ReferenceOnCurriculum_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReferenceOnCurriculum` ADD CONSTRAINT `ReferenceOnCurriculum_referenceId_fkey` FOREIGN KEY (`referenceId`) REFERENCES `Reference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PublicationOnCurriculum` ADD CONSTRAINT `PublicationOnCurriculum_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PublicationOnCurriculum` ADD CONSTRAINT `PublicationOnCurriculum_publicationId_fkey` FOREIGN KEY (`publicationId`) REFERENCES `Publication`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TechnicalEducationOnCurriculum` ADD CONSTRAINT `TechnicalEducationOnCurriculum_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TechnicalEducationOnCurriculum` ADD CONSTRAINT `TechnicalEducationOnCurriculum_technicalEducationId_fkey` FOREIGN KEY (`technicalEducationId`) REFERENCES `TechnicalEducation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademicEducationOnCurriculum` ADD CONSTRAINT `AcademicEducationOnCurriculum_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademicEducationOnCurriculum` ADD CONSTRAINT `AcademicEducationOnCurriculum_academicEducationId_fkey` FOREIGN KEY (`academicEducationId`) REFERENCES `AcademicEducation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboralExperienceOnCurriculum` ADD CONSTRAINT `LaboralExperienceOnCurriculum_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboralExperienceOnCurriculum` ADD CONSTRAINT `LaboralExperienceOnCurriculum_laboralExperienceId_fkey` FOREIGN KEY (`laboralExperienceId`) REFERENCES `LaboralExperience`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillOnCurriculum` ADD CONSTRAINT `SkillOnCurriculum_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillOnCurriculum` ADD CONSTRAINT `SkillOnCurriculum_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
