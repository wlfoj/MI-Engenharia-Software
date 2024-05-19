import { NextResponse } from "next/server"
import { edicaoUsuario, edicaoUsuarioTipo } from "../../../../lib/usuario"
import { usuarioNaoEncontrado } from "../../../../lib/erros"

/* STRING TIPOS DE ALTERAÇÃO DE DADOS */
/* 
    ...
    ...
*/
export async function PUT(request: Request) {
    const dados: edicaoUsuarioTipo = await request.json()
    if (dados !== null) {
        try {
            const usuarioAlterado = await edicaoUsuario(dados.tipo, dados.novoDado, dados.emailDoUsuario)
            return NextResponse.json(JSON.stringify(usuarioAlterado))

        } catch (e) {
            if (e instanceof usuarioNaoEncontrado) {
                return NextResponse.json(JSON.stringify("ERROR 03"))
            }
        }
    }

}