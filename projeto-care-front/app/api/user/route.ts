'use server'
import { NextResponse } from 'next/server';
import { getUser } from "../../lib/getUser";
import { getSession } from "../../lib/sessions";

export async function GET() {
    const token = await getSession();

    //pega o id do usuario pela session
    const userSession = await getUser();
    if (!userSession) {
        return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
    );
    }
    const response = await fetch(`http://localhost:3001/user/${userSession.sub}`, { method: "GET", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } })
    if (response.ok) {
        const data = await response.json();
        return NextResponse.json({data}, { status: 200 });
    }
        else{
        const err = await response.json().catch(() => ({}));
        return NextResponse.json(
            { error: err.message || "Erro ao buscar usuário" },
            { status: 400 }
        );
    }
}
