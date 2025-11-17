/*
  Warnings:

  - You are about to drop the column `updateAtl` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `updateAtl` on the `Exame` table. All the data in the column will be lost.
  - You are about to drop the column `updateAtl` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updateAt` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Exame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendamento" DROP COLUMN "updateAtl",
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Exame" DROP COLUMN "updateAtl",
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "updateAtl",
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
