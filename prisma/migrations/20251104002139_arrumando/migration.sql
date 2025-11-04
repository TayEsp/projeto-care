-- DropForeignKey
ALTER TABLE "public"."Exame" DROP CONSTRAINT "Exame_agendamentoId_fkey";

-- AlterTable
ALTER TABLE "Exame" ALTER COLUMN "agendamentoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "Agendamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
