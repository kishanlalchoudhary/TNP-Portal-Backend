-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "is_placed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_shortlisted" BOOLEAN NOT NULL DEFAULT false;
