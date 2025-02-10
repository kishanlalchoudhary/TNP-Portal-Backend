/*
  Warnings:

  - You are about to drop the column `eligile_branches` on the `jobs` table. All the data in the column will be lost.
  - Added the required column `company_webiste_url` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "eligile_branches",
ADD COLUMN     "company_webiste_url" TEXT NOT NULL,
ADD COLUMN     "eligible_branches" TEXT[];
