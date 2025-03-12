-- AlterTable
ALTER TABLE "queries" ADD COLUMN     "is_replied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "replied_at" TIMESTAMP(3),
ADD COLUMN     "reply" TEXT;

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "queries_created_at_idx" ON "queries"("created_at");
