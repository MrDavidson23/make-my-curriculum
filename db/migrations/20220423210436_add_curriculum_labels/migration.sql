-- AlterTable
ALTER TABLE `Curriculum` ADD COLUMN `academicEducationLabel` VARCHAR(191) NOT NULL DEFAULT 'Educación Académica',
    ADD COLUMN `laboralExperienceLabel` VARCHAR(191) NOT NULL DEFAULT 'Experiencia Laboral',
    ADD COLUMN `publicationLabel` VARCHAR(191) NOT NULL DEFAULT 'Publicaciones',
    ADD COLUMN `referenceLabel` VARCHAR(191) NOT NULL DEFAULT 'Referencias',
    ADD COLUMN `skillLabel` VARCHAR(191) NOT NULL DEFAULT 'Habilidades',
    ADD COLUMN `technicalEducationLabel` VARCHAR(191) NOT NULL DEFAULT 'Educación Técnica';
