'use client'
import { useState, useEffect } from 'react';

type Exam = {
    id: string;
    nome: string;
    especialidade: string;
}

export default function SignUpFormulario() {
    const today = new Date().toISOString().slice(0, 10);
    const [exams, setExams] = useState<Exam[]>([]);
    const [error, setError] = useState()

    const [formValues, setFormValues] = useState({
        observacoes: '',
        data: today,
        ExameId: ''
    });

    useEffect(() => {
            async function getExams() {
    
                try {
                    const response = await fetch('http://localhost:3001/exam/listExams', { method: "GET", headers: { "Content-Type": "application/json" } })
                    if (response?.ok) {
                        const data: Exam[] = await response.json();
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
            getExams()
    
        }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const dataISO = new Date(formValues.data).toISOString();

        const resultForm = {
            observacoes: formValues.observacoes,
            data: dataISO,
            ExameId: formValues.ExameId
        }

        try {
            const response = await fetch('/api/appointment', {method: 'POST', body: JSON.stringify(resultForm), headers: { 'Content-Type': 'application/json' },});
            if (response?.ok) {
                alert("Agendado com sucesso!")
            } else {
                const errorBody = await response.json().catch(() => ({}));
                setError(errorBody.error)
                console.error("Erro ao agendar:", errorBody?.error || response.statusText);
                
            }

        } catch (error: unknown) {
            console.error("Erro na requisição:", error);
            alert("Erro ao enviar o formulário. Tente novamente mais tarde.");
        }
    };

    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-6 bg-white">
            <div className="mt-4 bg-white border border-gray-200 rounded-xl shadow-2xs ">
                <div className="p-2 sm:p-7">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-3xl font-bold text-gray-800 ">
                            Agendamento de exame
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                            Preencha os dados abaixo.
                        </p>
                    </div>

                    <div className="mt-5">
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className="grid gap-y-4">
                                <div className="flex-1 flex-col min-w-40">
                                    <label id="observacoes" className="block text-sm mb-2 ">Exame</label>
                                    <select id="ExameId" value={formValues.ExameId} onChange={handleSelectChange} className="py-2 px-3 block w-full border border-blue-100 focus:border-blue-600 shadow-sm text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                                            <option key='' value=''>Escolha um exame</option>
                                        {exams?.map((exame: Exam, index: number) => (
                                            <option key={index} value={exame.id}> {exame.nome} - {exame.especialidade}</option>
                                        ))}
                                    </select>
                                </div>

                                <label id="data" className="block text-sm mb-2 ">Data do agendamento</label>
                                <div className="relative">
                                    <input id="data" value={formValues.data} onChange={handleChange} type="datetime-local" className="py-2 px-3 block w-full border border-blue-100 focus:border-blue-600 shadow-sm text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="Data" />
                                </div>

                                <label id="observacoes" className="block text-sm mb-2 ">Observações</label>
                                <div className="relative">
                                    <input id="observacoes" type="text" value={formValues.observacoes} onChange={handleChange} className="py-2 px-3 block w-full border border-blue-100 focus:border-blue-600 shadow-sm text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="Observações" />
                                </div>

                                <div className="mt-5 flex justify-between w-full">
                                    <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none mr-8">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                        Salvar
                                    </button>
                                    {error && <div  className="text-sm text-red-500 italic mt-1 py-2">{error}</div>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>

    );
}
