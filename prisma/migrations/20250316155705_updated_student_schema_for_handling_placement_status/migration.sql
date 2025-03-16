-- AlterTable
ALTER TABLE "students" ADD COLUMN     "isDreamPlaced" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPlaced" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "job_id" TEXT;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
