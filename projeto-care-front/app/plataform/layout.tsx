'use client';
import Link from "next/link";
import Image from "next/image";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  async function Logout() {
        const confirmDelete = window.confirm("Tem certeza que deseja sair?");

    if (confirmDelete) {
        
        try {
            const res = await fetch('/api/auth', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                window.location.href = '/';
            } else {
                console.error('Erro ao fazer o logout');
            }
        } catch (err) {
            console.error('Erro ao fazer o logout', err);
        }
    }
    };

  return (
    <div className="flex flex-row h-screen">
      <aside id="hs-application-sidebar" className="
                  w-65 h-full 
                  bg-white border-e border-gray-200
                  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
                  dark:bg-neutral-800 dark:border-neutral-700" role="dialog" aria-label="Sidebar">
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4 flex items-center justify-center">

            <a className="flex-none rounded-xl text-xl text-white inline-block font-semibold focus:outline-hidden focus:opacity-80" href="#" aria-label="Preline">
              <Image src="logo-care.svg" alt="logo do projeto care" width={150} height={150} priority></Image>
              Projeto Care
            </a>

            <div className="hidden lg:block ms-2"></div>
          </div>

          <div className="h-full overflow-y-auto ">
            <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
              <ul className="flex flex-col space-y-1">
                <li>
                  <Link href="/plataform" className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white">Home</Link>
                </li>

                <li className="hs-accordion" id="agendar-accordion">
                  <Link href="/plataform/create-appointment" className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200" aria-expanded="true" aria-controls="users-accordion-child">Agendar Exames</Link>
                </li>

                <li className="hs-accordion" id="account-accordion">
                  <Link href="/plataform/exams" className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200" aria-expanded="true" aria-controls="users-accordion-child">Exames</Link>
                </li>

                <li className="hs-accordion" id="account-accordion">
                  <Link href="/plataform/appointments" className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200" aria-expanded="true" aria-controls="account-accordion-child">Agendamentos</Link>
                </li>

                <li className="hs-accordion mt-8" id="account-accordion">
                  <button  onClick={() => Logout()} className="hs-accordion-toggle cursor-pointer w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-red-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-red-400" aria-expanded="true" aria-controls="account-accordion-child">Logout</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
