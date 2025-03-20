-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "permanent_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
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
    "aadhar_number" TEXT NOT NULL,
    "pan_number" TEXT NOT NULL,
    "passport_number" TEXT NOT NULL,
    "citizenship" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_pict_registration_id_key" ON "users"("pict_registration_id");
