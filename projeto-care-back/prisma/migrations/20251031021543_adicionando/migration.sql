/*
  Warnings:

  - Added the required column `updateAtl` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAtl` to the `Exame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAtl` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendamento" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAtl" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Exame" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAtl" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAtl" TIMESTAMP(3) NOT NULL;
