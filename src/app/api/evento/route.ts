import { NextResponse } from "next/server";
import { Evento, edicaoEvento, edicaoEventoTipo, getEventos, inserirEvento } from "../../../../lib/evento";


/* Banco pessoal
mysql://root:(SENHA)@localhost:3306/(NOME DO BANCO) 
*/

/* Banco PlanetScale (Com erro)
mysql://nh7ntf3fxeucxnnj0c6s:pscale_pw_Xy42bmYPRmC8byFrTK6SzV7jv4OABObnuFmuSZogCrY@aws.connect.psdb.cloud/bd_wilticket?sslaccept=strict
*/

export async function GET(request: Request) {
    const data = await getEventos()
    
    return NextResponse.json(data)
}

export async function POST(request:Request) {
    const data: Evento = await request.json()
    if (data !== null) {
        const evento = await inserirEvento(data)
        if (evento === null){
            return NextResponse.json("ERROR 00")
        } else {
            return data
        }
    } else {
        return NextResponse.json("ERROR 00")
    }
}

/* STRING TIPOS DE ALTERAÇÃO DE DADOS */
/* 'trocar status' - string usada para alterar o status do evento
    ...
    ...
*/

export async function PUT(request:Request) {
    const dados: edicaoEventoTipo = await request.json()
    if (dados !== null) {
        const eventoAlterado = await edicaoEvento(dados.tipo, dados.novoDado, dados.idDoEvento)
        if (eventoAlterado !== null){
            console.log("EVENTO NA API: ", eventoAlterado)
            return NextResponse.json(eventoAlterado)
        } else {   
            console.log("DEU UM ERRO")
            return NextResponse.json({error: "ERROR 00"})
        }
    }

}