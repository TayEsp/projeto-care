'use client'
import { useEffect, useState } from "react";

type AppointmentItem = {
    id: string
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

export default function Appointment() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        async function createUser() {

            try {
                const response = await fetch('/api/user', { method: "GET", headers: { "Content-Type": "application/json" } })
                if (response?.ok) {
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

    async function cancelAppointment(id: string) {
        const confirmDelete = window.confirm("Tem certeza que deseja cancelar o agendamento?");

    if (confirmDelete) {
        
        try {
            const res = await fetch(`http://localhost:3001/appointment/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                alert("Cancelado com sucesso!")
            } else {
                console.error('Erro ao excluir agendamento');
            }
        } catch (err) {
            console.error('Erro ao excluir agendamento:', err);
        }
    }
    };

    const appointmentTemplate = (user: User) => {
        return (
            <div className="rounded-xl overflow-hidden border border-gray-300">
                <table className="min-w-full">
                    <thead className="bg-blue-100 text-black">
                        <tr>
                            <th className="p-3 text-left font-semibold">Exame</th>
                            <th className="p-3 text-left font-semibold">Especialidade</th>
                            <th className="p-3 text-left font-semibold">Data</th>
                            <th className="p-3 text-left font-semibold">Hora</th>
                            <th className="p-3 text-left font-semibold">Observação</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {user.agendamento?.map((agendamento: AppointmentItem, index: number) => (
                            <tr
                                key={index}
                                className="border border-gray-300 hover:bg-blue-50 transition"
                            >
                                <td className="p-3">{agendamento.Exame.nome}</td>
                                <td className="p-3">{agendamento.Exame.especialidade}</td>
                                <td className="p-3">
                                    {new Date(agendamento.data).toLocaleDateString("pt-BR")}
                                </td>
                                <td className="p-3">
                                    {new Date(agendamento.data).getHours()}:
                                    {new Date(agendamento.data).getMinutes()}
                                </td>
                                <td className="p-3">{agendamento.observacoes}</td>
                                <td >
                                <button className="p-1 cursor-pointer border border-gray-50 rounded-xl bg-red-200"
                                    onClick={() => cancelAppointment(agendamento.id)}
                                >Cancelar Agendamento</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="p-6 h-full w-full flex flex-col">
            {appointmentTemplate(user)}
        </div>
    )
}