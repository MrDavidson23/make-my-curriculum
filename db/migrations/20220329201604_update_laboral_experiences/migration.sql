/*
  Warnings:

  - You are about to drop the column `finishMonth` on the `LaboralExperience` table. All the data in the column will be lost.
  - You are about to drop the column `startMonth` on the `LaboralExperience` table. All the data in the column will be lost.
  - You are about to alter the column `finishYear` on the `LaboralExperience` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `LaboralExperience` DROP COLUMN `finishMonth`,
    DROP COLUMN `startMonth`,
    MODIFY `finishYear` DATETIME(3) NOT NULL;
