'use client'
import Image from "next/image";
import { useState } from 'react';
import { createSession } from "./lib/sessions";


export default function Home() {

  const [formValues, setFormValues] = useState({
    email: '',
    senha: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        window.location.href = '/plataform';
      } else {
        const errorBody = await response.json().catch(() => ({}));
        console.error("Erro ao fazer login:", errorBody?.message || response.statusText);
        alert("Erro nas credenciais!");
      }

    } catch (error: unknown) {
      console.error("Erro na requisição:", error);
      alert("Erro ao fazer login. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full  flex-col items-center justify-center py-2 bg-white">
        <Image alt="Logo do Projeto Care" width={100} height={100} src="logo-care.svg"></Image>
        <h1 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black">
          Projeto Care
        </h1>
        <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-2xs ">
          <div className="p-2 sm:p-4">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">Entre</h1>
              <p className="mt-2 text-sm text-gray-600 ">
                Não possui uma conta ainda?
                <a className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium " href="/signup">
                  <br />Cadastre-se aqui!
                </a>
              </p>
            </div>

            <div className="mt-3">
              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 ">Ou</div>

              <form method="POST" onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <label id="email" className="block text-sm">Email</label>
                  <div className="relative">
                    <input id="email" value={formValues.email} onChange={handleChange} type="text" className="py-2 px-3 block w-full border border-blue-100 focus:border-blue-600 shadow-sm text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="Email" />
                  </div>
                  <div>
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <label id="senha" className="block text-sm mb-2 ">Senha</label>
                      <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium " href="/recover-account">Esqueceu a senha?</a>
                    </div>
                    <div className="relative">
                      <input id="senha" value={formValues.senha} onChange={handleChange} type="password" className="py-2 px-3 block w-full border border-blue-100 focus:border-blue-600 shadow-sm text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="Senha" />
                    </div>
                  </div>

                  <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
