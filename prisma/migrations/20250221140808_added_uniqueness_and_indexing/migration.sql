/*
  Warnings:

  - A unique constraint covering the columns `[student_id,job_id]` on the table `applications` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "students" ALTER COLUMN "sgpa_be_sem_1" SET DEFAULT -1,
ALTER COLUMN "sgpa_be_sem_2" SET DEFAULT -1,
ALTER COLUMN "cgpa" SET DEFAULT -1;

-- CreateIndex
CREATE INDEX "applications_student_id_idx" ON "applications"("student_id");

-- CreateIndex
CREATE INDEX "applications_job_id_idx" ON "applications"("job_id");

-- CreateIndex
CREATE UNIQUE INDEX "applications_student_id_job_id_key" ON "applications"("student_id", "job_id");
