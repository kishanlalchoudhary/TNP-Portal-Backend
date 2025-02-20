/*
  Warnings:

  - You are about to drop the column `adminId` on the `admin_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `admin_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `admin_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `student_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `student_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `student_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pict_registration_id]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `admin_id` to the `admin_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `admin_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `student_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `student_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admin_tokens" DROP CONSTRAINT "admin_tokens_adminId_fkey";

-- DropForeignKey
ALTER TABLE "student_tokens" DROP CONSTRAINT "student_tokens_studentId_fkey";

-- DropIndex
DROP INDEX "admin_tokens_adminId_idx";

-- DropIndex
DROP INDEX "student_tokens_studentId_idx";

-- AlterTable
ALTER TABLE "admin_tokens" DROP COLUMN "adminId",
DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
ADD COLUMN     "admin_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "student_tokens" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "studentId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "student_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "admin_tokens_admin_id_idx" ON "admin_tokens"("admin_id");

-- CreateIndex
CREATE INDEX "student_tokens_student_id_idx" ON "student_tokens"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_pict_registration_id_key" ON "students"("pict_registration_id");

-- AddForeignKey
ALTER TABLE "admin_tokens" ADD CONSTRAINT "admin_tokens_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_tokens" ADD CONSTRAINT "student_tokens_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
