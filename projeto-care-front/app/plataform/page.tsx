'use client'
import { useEffect, useState } from "react";
import Link from "next/link";

type AppointmentItem = {
    Exame: {
        nome: string;
        especialidade: string;
    };
    data: string; // ISO string
    observacoes: string;
};

type User = {
    nome: string;
    email: string;
    senha: string;
    dataDeNascimento: string;
    cpf: string;
    agendamento?: AppointmentItem[];
};

export default function Plataform() {
    const [semana, setSemana] = useState(['', '', '', '', '', '', ''])
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        function adicinarSemana() {

            const diaSemana = new Date().getDay();
            const dataHoje = new Date()
            const dia = String(dataHoje.getDate()).padStart(2, '0');
            const mes = String(dataHoje.getMonth() + 1).padStart(2, '0');

            const novaSemana = Array(7).fill("");

            for (let i = 0; i < 7; i++) {
                const calcDia = (+dia) - (diaSemana - i);
                novaSemana[i] = `${calcDia}/${mes}`;
            }

            setSemana(novaSemana);
        }

        adicinarSemana()

        async function createUser() {
            try {
                const response = await fetch('/api/user', { method: "GET", headers: { "Content-Type": "application/json" } })
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.data)
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
        createUser()

    }, [])

    if (!user) {
        return <p className="p-6 flex justify-center items-center text-xl font-semibold">carregando...</p>
    }

    if (!user.agendamento || user.agendamento.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Você ainda não possui nenhum agendamento!</h1>
                <p className="text-lg text-gray-600">Agende um exame agora e cuide da sua saúde.</p>
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    <Link href="/plataform/create-appointment" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition" aria-expanded="true" aria-controls="users-accordion-child">Agendar Exames</Link>
                </button>
            </div>
        );
    }

    //caso haja agendamentos
    return (
        <div className="text-black p-6">
            <h1 className="text-2xl font-semibold italic">Olá Bem vinda de volta, {user.nome}</h1>
            <div className="flex flex-col p-4">
                <table className=" bg-blue-50">
                    <thead>
                        <tr>
                            {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map((dia, idx) => (
                                <th key={idx}>
                                    {dia}
                                    <br />
                                    {semana[idx]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {semana.map((dataDia, idx) => {
                                const agendamentosDoDia = user.agendamento
                                    ?.filter(ag => {
                                        const ano = new Date().getFullYear()
                                        const agData = new Date(ag.data);
                                        const anoData = agData.getFullYear()
                                        const agDiaMes = `${String(agData.getDate()).padStart(2, '0')}/${String(agData.getMonth() + 1).padStart(2, '0')}`;
                                        return (agDiaMes === dataDia) && (anoData === ano);
                                    }) || [];

                                return (
                                    <td key={idx} className="p-2 align-top">
                                        {agendamentosDoDia.length > 0 ? (
                                            agendamentosDoDia.map((ag, i) => {
                                                const hora = new Date(ag.data).getHours().toString().padStart(2, '0');
                                                const min = new Date(ag.data).getMinutes().toString().padStart(2, '0');
                                                return (
                                                    <div key={i} className="mb-2 border border-gray-300 max-w-40 p-2 rounded bg-blue-100">
                                                        <strong>{ag.Exame.nome}</strong> ({ag.Exame.especialidade})<br />
                                                        {dataDia} às {hora}:{min}<br />
                                                        {ag.observacoes}
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <p className="text-gray-500"> ----- </p>
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}