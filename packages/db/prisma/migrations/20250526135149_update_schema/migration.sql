/*
  Warnings:

  - The values [IMAGE_LABELING,DATA_CLEANING,MODEL_TRAINING,QUALITY_CHECK] on the enum `TaskType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `experience` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskType_new" AS ENUM ('TEXT_ANNOTATION', 'IMAGE_ANNOTATION', 'DATA_ENTRY', 'TRANSCRIPTION', 'MODERATION');
ALTER TABLE "Task" ALTER COLUMN "type" TYPE "TaskType_new" USING ("type"::text::"TaskType_new");
ALTER TYPE "TaskType" RENAME TO "TaskType_old";
ALTER TYPE "TaskType_new" RENAME TO "TaskType";
DROP TYPE "TaskType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "experience";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "clientId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
