import { NextResponse } from "next/server";
import { esqueceuSenha } from "../../../../../lib/usuario";
import { usuarioNaoEncontrado } from "../../../../../lib/erros";


export async function POST(request: Request) {
    const dados = await request.json()
    if (dados !== null) {
        try {
            const senhaEsquecida = await esqueceuSenha(dados.email)
            return NextResponse.json(JSON.stringify(senhaEsquecida))
        } catch (e) {
            if (e instanceof usuarioNaoEncontrado) {
                return NextResponse.json(JSON.stringify("ERROR 03"))
            }
        }
    }

}