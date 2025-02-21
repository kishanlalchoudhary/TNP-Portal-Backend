-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "active_backlogs" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "passive_backlogs" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "percentage_diploma" DOUBLE PRECISION NOT NULL DEFAULT 80,
ADD COLUMN     "year_down" TEXT NOT NULL DEFAULT 'No';
