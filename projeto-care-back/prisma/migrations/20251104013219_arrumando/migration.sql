/*
  Warnings:

  - You are about to drop the column `agendamentoId` on the `Exame` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[exameId]` on the table `Agendamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exameId` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Exame" DROP CONSTRAINT "Exame_agendamentoId_fkey";

-- DropIndex
DROP INDEX "public"."Exame_agendamentoId_key";

-- AlterTable
ALTER TABLE "Agendamento" ADD COLUMN     "exameId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Exame" DROP COLUMN "agendamentoId";

-- CreateIndex
CREATE UNIQUE INDEX "Agendamento_exameId_key" ON "Agendamento"("exameId");

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_exameId_fkey" FOREIGN KEY ("exameId") REFERENCES "Exame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
