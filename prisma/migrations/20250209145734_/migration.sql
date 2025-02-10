-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_desc" TEXT NOT NULL,
    "job_role" TEXT NOT NULL,
    "job_location" TEXT NOT NULL,
    "selection_process" TEXT NOT NULL,
    "company_logo_url" TEXT NOT NULL,
    "company_jd_url" TEXT NOT NULL,
    "company_package" DOUBLE PRECISION NOT NULL,
    "dream_company" TEXT NOT NULL,
    "eligile_branches" TEXT[],
    "cgpa" DOUBLE PRECISION NOT NULL,
    "automata_score" DOUBLE PRECISION NOT NULL,
    "elq_score" DOUBLE PRECISION NOT NULL,
    "percentage_10th" DOUBLE PRECISION NOT NULL,
    "percentage_12th" DOUBLE PRECISION NOT NULL,
    "application_deadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);
