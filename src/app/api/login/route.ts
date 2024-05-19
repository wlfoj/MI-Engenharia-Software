import { NextResponse } from "next/server";
import { verificarEmailESenha } from "../../../../lib/usuario";
import { usuarioNaoEncontrado } from "../../../../lib/erros";

interface RequestBody {
    email: string
    password: string
}
export async function POST(request:Request) {
    const body:RequestBody = await request.json()

    try{
        const usuario = await verificarEmailESenha(body.email, body.password)
        
        return NextResponse.json(usuario)
    } catch (e) {
        if (e instanceof usuarioNaoEncontrado){
            return NextResponse.json(JSON.stringify("ERROR 03"))
        }
    }

}