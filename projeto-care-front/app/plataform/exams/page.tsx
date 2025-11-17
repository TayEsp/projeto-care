'use client'
import { useEffect, useState } from "react";

type ExamItem = {
    nome: string;
    especialidade: string;
};

export default function Exam() {
    const [exams, setExams] = useState<ExamItem[]>([]);


    useEffect(() => {
        async function createExams() {

            try {
                const response = await fetch('http://localhost:3001/exam/listExams', { method: "GET", headers: { "Content-Type": "application/json" } })
                if (response?.ok) {
                    const data: ExamItem[] = await response.json();
                    setExams(data);
                } else {
                    const errorBody = await response.json().catch(() => ({}));
                    console.error("Erro ao carregar:", errorBody?.message || response.statusText);
                    alert("Erro ao carregar, tente novamente mais tarde.");
                }

            } catch (error: unknown) {
                console.error("Erro na requisição:", error);
                alert("Erro ao carregar. Tente novamente mais tarde.");
            }
        }
        createExams()

    }, [])

    const examTemplate = () => {
        return (
            <div className="rounded-xl overflow-hidden border border-gray-300">
                <table className="min-w-full">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3 text-left font-medium">Nome</th>
                            <th className="p-3 text-left font-medium">Especialidade</th>
                        </tr>
                    </thead>

                    <tbody>
                        {exams.map((exam, index) => (
                            <tr key={index} className="border border-gray-300 hover:bg-blue-50 transition">
                                <td className="p-3">{exam.nome}</td>
                                <td className="p-3">{exam.especialidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    if (!exams)
        return <p className="p-6 flex justify-center items-center text-xl font-semibold">carregando...</p>

    return (
        <div className="h-full w-full p-6 flex flex-col">
            {examTemplate()}
        </div>
    )
}