import { NextResponse } from "next/server";
import { Promoter, edicaoPromoter, edicaoPromoterTipo, getPromoters, inserirPromoter } from "../../../../lib/promoter";
import { cpfDuplicado, emailDuplicado } from "../../../../lib/erros";

export async function GET(request: Request) {
    const data = await getPromoters()
    
    return NextResponse.json(data)
}

export async function POST(request:Request) {
    const dados: Promoter = await request.json()
    if (dados !== null){
        try {

            const promoter = await inserirPromoter(dados)
    
            if (promoter === null) {
                console.log("Dados de PROMOTER invalidos.")
                return NextResponse.json("ERROR 00")
            } else {
                console.log("Dados criados.\n", promoter);
                
                return NextResponse.json(promoter)
            }

        } catch (e) {
            if (e instanceof cpfDuplicado){
                return NextResponse.json("ERROR 01")
            } else if (e instanceof emailDuplicado){
                return NextResponse.json("ERROR 02")
            }
        }
    
    } 

}

/* STRING TIPOS DE ALTERAÇÃO DE DADOS */
/* 'trocar status' - string usada para alterar o status do evento
    ...
    ...
*/

export async function PUT(request:Request) {
    const dados: edicaoPromoterTipo = await request.json()
    if (dados !== null) {
        const promoterAlterado = await edicaoPromoter(dados.tipo, dados.novoDado, dados.cpfORcnpj)
        if (promoterAlterado !== null){
            console.log("PROMOTER NA API: ", promoterAlterado)
            return NextResponse.json(promoterAlterado)
        } else {   
            console.log("DEU UM ERRO")
            return NextResponse.json({error: "ERROR 00"})
        }
    }

}

