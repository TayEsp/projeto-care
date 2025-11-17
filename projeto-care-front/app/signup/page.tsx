'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";

export default function SignUpFormulario() {
    const today = new Date().toISOString().slice(0, 10);

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        passwordVerify: '',
        nome: '',
        cpf: '',
        dataDeNascimento: today,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    const [formErrors, setFormErrors] = useState()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Converte a data para o formato ISO-8601
        const dataDeNascimentoISO = new Date(formValues.dataDeNascimento).toISOString();
        
        const resultForm = {
            email: formValues.email,
            senha: formValues.password,
            nome: formValues.nome,
            cpf: formValues.cpf,
            dataDeNascimento: dataDeNascimentoISO,
        };

            try{
                const response = await fetch("http://localhost:3001/user/signup", {method: "POST", body: JSON.stringify(resultForm), headers:{"Content-Type":"application/json"}})
                if (response?.ok){
                    try{
                        alert("cadastrado com sucesso!")
                        const redirectUrl = "/";
                        window.location.href = redirectUrl;
                    }  catch (error: unknown) {
                        console.error('Error details:', error);
                    }
                }else {
                  const errorBody = await response.json().catch(() => ({}));
                  console.error("Erro ao cadastrar:", errorBody?.message || response.statusText);
                  alert("Erro ao cadastrar, tente novamente mais tarde.");
            }

          } catch (error: unknown) {
            console.error("Erro na requisição:", error);
            alert("Erro ao enviar o formulário. Tente novamente mais tarde.");
        }
    };

    return (
        <main className="flex min-h-screen w-full  flex-col items-center justify-center py-2 bg-white">
                  <Image alt="Logo do Projeto Care" width={100} height={100} src="logo-care.svg"></Image>
                  <h1 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black">
                    Projeto Care
                  </h1>
                    <div className="mt-4 bg-white border border-gray-200 rounded-xl shadow-2xs ">
                      <div className="p-2 sm:p-7">
                        <div className="text-center">
                          <h2 className="text-3xl md:text-3xl font-bold text-gray-800 ">
                            Cadastro
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                Preencha os dados abaixo.
                            </p>
                        </div>
        
                        <div className="mt-5">
        
                          <form method="POST" onSubmit={handleSubmit}>
                            <div className="grid gap-y-4">
                                <label id="nome" className="block text-sm mb-2 ">Nome</label>
                                <div className="relative">
                                  <input id="nome" type="text" value={formValues.nome} onChange={handleChange} className="py-2 px-3 block w-full border border-blue-100 focus:border-blue-600 shadow-sm text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="Nome Completo" />
                                </div>

                                <label id="cpf" className="block text-sm mb-2 ">CPF</label>
                                <div className="relative">
                                  <input id="cpf" value={formValues.cpf} onChange={handleChange} type="text" className="py-2 px-3 block w-full border border-blue-100 focus:border-blue-600 shadow-sm text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="CPF" />
                                </div>

                                <label id="dataDeNascimento" className="block text-sm mb-2 ">Data de Nascimento</label>
                                <div className="relative">
                                  <input id="dataDeNascimento" value={formValues.dataDeNascimento} onChange={handleChange} type="date" className="py-2 px-3 block w-full border border-blue-100 focus:border-blue-600 shadow-sm text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="Data de Nascimento" />
                                </div>

                                <label id="email" className="block text-sm mb-2 ">Email</label>
                                <div className="relative">
                                  <input id="email" value={formValues.email} onChange={handleChange} type="text" className="py-2 px-3 block w-full border border-blue-100 focus:border-blue-600 shadow-sm text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="Email" />
                                </div>
                               
                                <label id="password" className="block text-sm mb-2 ">Senha</label>
                                <div className="relative">
                                  <input id="password" value={formValues.password} onChange={handleChange} type="password" className="py-2 px-3 block w-full border border-blue-100 focus:border-blue-600 shadow-sm text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="Senha" />
                                </div>

                                <label id="passwordVerify" className="block text-sm mb-2 ">Confirmar a senha</label>
                                <div className="relative">
                                  <input id="passwordVerify" value={formValues.passwordVerify} onChange={handleChange} type="password" className="py-2 px-3 block w-full border border-blue-100 focus:border-blue-600 shadow-sm text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="Confirme a senha" />
                                    {<div className="text-sm text-red-500 italic mt-1 py-2">As senhas são diferentes. Tente Novamente.</div>}
                                </div>
                                <div className="mt-5 flex justify-between w-full">
                                    <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none mr-8">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                        Salvar
                                    </button>
                                    {/* {flagExist && <div  className="text-sm text-red-500 italic mt-1 py-2">Este email já foi cadastrado!</div>} */}
                                </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
              </main>

    );
}
