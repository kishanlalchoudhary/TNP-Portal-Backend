-- AlterTable
ALTER TABLE "students" ALTER COLUMN "cgpa" SET DEFAULT -1,
ALTER COLUMN "cgpa" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "jobs_created_at_idx" ON "jobs"("created_at");

-- CreateIndex
CREATE INDEX "students_cgpa_idx" ON "students"("cgpa");
