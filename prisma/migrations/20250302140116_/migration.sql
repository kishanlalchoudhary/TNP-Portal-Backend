/*
  Warnings:

  - You are about to drop the `replies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_query_id_fkey";

-- DropTable
DROP TABLE "replies";
