-- CreateTable
CREATE TABLE "queries" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "queries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replies" (
    "id" TEXT NOT NULL,
    "query_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "queries_student_id_idx" ON "queries"("student_id");

-- CreateIndex
CREATE INDEX "replies_query_id_idx" ON "replies"("query_id");

-- AddForeignKey
ALTER TABLE "queries" ADD CONSTRAINT "queries_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_query_id_fkey" FOREIGN KEY ("query_id") REFERENCES "queries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
