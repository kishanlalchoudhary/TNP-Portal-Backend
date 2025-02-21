/*
  Warnings:

  - Made the column `sgpa_be_sem_1` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sgpa_be_sem_2` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cgpa` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "students" ALTER COLUMN "sgpa_be_sem_1" SET NOT NULL,
ALTER COLUMN "sgpa_be_sem_2" SET NOT NULL,
ALTER COLUMN "cgpa" SET NOT NULL;
