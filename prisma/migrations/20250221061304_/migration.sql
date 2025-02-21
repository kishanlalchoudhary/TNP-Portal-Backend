/*
  Warnings:

  - You are about to drop the column `year_down` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "year_down",
ALTER COLUMN "active_backlogs" DROP DEFAULT,
ALTER COLUMN "passive_backlogs" DROP DEFAULT,
ALTER COLUMN "percentage_diploma" DROP DEFAULT;
