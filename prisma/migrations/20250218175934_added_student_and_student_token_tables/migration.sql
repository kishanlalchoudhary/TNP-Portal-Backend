-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "primary_email" TEXT NOT NULL,
    "alternate_email" TEXT NOT NULL,
    "primary_mobile_number" TEXT NOT NULL,
    "alternate_mobile_number" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "current_address" TEXT NOT NULL,
    "permanent_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "roll_number" INTEGER NOT NULL,
    "university_prn" TEXT NOT NULL,
    "pict_registration_id" TEXT NOT NULL,
    "percentage_10th" DOUBLE PRECISION NOT NULL,
    "board_10th" TEXT NOT NULL,
    "passing_year_10th" INTEGER NOT NULL,
    "no_of_gap_years_after_10th" INTEGER NOT NULL,
    "reason_of_gap_after_10th" TEXT NOT NULL,
    "after_10th_appeared_for" TEXT NOT NULL,
    "percentage_12th" DOUBLE PRECISION NOT NULL,
    "board_12th" TEXT NOT NULL,
    "passing_year_12th" INTEGER NOT NULL,
    "no_of_gap_years_after_12th" INTEGER NOT NULL,
    "reason_of_gap_after_12th" TEXT NOT NULL,
    "percentage_diploma" DOUBLE PRECISION NOT NULL,
    "university_of_diploma" TEXT NOT NULL,
    "passing_year_diploma" INTEGER NOT NULL,
    "no_of_gap_years_after_diploma" INTEGER NOT NULL,
    "reason_of_gap_after_diploma" TEXT NOT NULL,
    "percentile_cet" DOUBLE PRECISION NOT NULL,
    "percentile_jee" DOUBLE PRECISION NOT NULL,
    "college_started_year" INTEGER NOT NULL,
    "sgpa_fe_sem_1" DOUBLE PRECISION NOT NULL,
    "sgpa_fe_sem_2" DOUBLE PRECISION NOT NULL,
    "sgpa_se_sem_1" DOUBLE PRECISION NOT NULL,
    "sgpa_se_sem_2" DOUBLE PRECISION NOT NULL,
    "sgpa_te_sem_1" DOUBLE PRECISION NOT NULL,
    "sgpa_te_sem_2" DOUBLE PRECISION NOT NULL,
    "sgpa_be_sem_1" DOUBLE PRECISION NOT NULL,
    "sgpa_be_sem_2" DOUBLE PRECISION NOT NULL,
    "active_backlogs" INTEGER NOT NULL,
    "active_backlog_semesters" TEXT[],
    "passive_backlogs" INTEGER NOT NULL,
    "year_down" TEXT NOT NULL,
    "aadhar_number" TEXT NOT NULL,
    "pan_number" TEXT NOT NULL,
    "passport_number" TEXT NOT NULL,
    "citizenship" TEXT NOT NULL,
    "documents_url" TEXT NOT NULL,
    "amcat_result_url" TEXT NOT NULL,
    "be_receipt_url" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_tokens_token_key" ON "student_tokens"("token");

-- CreateIndex
CREATE INDEX "student_tokens_studentId_idx" ON "student_tokens"("studentId");

-- AddForeignKey
ALTER TABLE "student_tokens" ADD CONSTRAINT "student_tokens_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
