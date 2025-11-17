'use server'
import { NextResponse, NextRequest } from 'next/server';
import { getUser } from "../../lib/getUser";

export async function POST(req: NextRequest) {
    const formValues = await req.json();
    const userSession = await getUser();

    if (!userSession) {
        return NextResponse.json(
            { error: "Usuário não autenticado" },
            { status: 401 }
        );
    }

    const data = {
        UsuarioId: userSession.sub,
        ...formValues
    }
    const response = await fetch("http://localhost:3001/appointment/create", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
    if (response.ok) {
        console.log(response.body)
        const result = await response.json().catch(() => null);

        if (result === null) {
            return NextResponse.json(
                { error: "Exames já agendados para este horário" },
                { status: 409 }
            );
        }
        return NextResponse.json({ status: 200 });
    } else {
        const err = await response.json().catch(() => ({}));
        return NextResponse.json(
            { error: err.message },
            { status: response.status }
        );
    }
}
