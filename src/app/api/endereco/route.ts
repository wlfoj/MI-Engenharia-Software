import { NextResponse } from "next/server"
import { edicaoUsuario, edicaoUsuarioTipo } from "../../../../lib/usuario"
import { usuarioNaoEncontrado } from "../../../../lib/erros"
import { edicaoEnderecoTipo, edicaoEndereco } from "../../../../lib/endereco"

/* STRING TIPOS DE ALTERAÇÃO DE DADOS */
/* 
    ...
    ...
*/
export async function PUT(request: Request) {
    const dados: edicaoEnderecoTipo = await request.json()
    if (dados !== null) {
        try {
            console.log("TO NA API 1")
            const endercoAlterado = await edicaoEndereco(dados)
            console.log("TO NA API 2")
            return NextResponse.json(JSON.stringify(endercoAlterado))

        } catch (e) {
            return NextResponse.json(JSON.stringify("ERROR 03"))
        }
    }

}