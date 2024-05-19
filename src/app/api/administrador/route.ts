import { NextResponse } from "next/server";
import { Administrador, getAdministradores, inserirAdministrador } from "../../../../lib/administrador";
import { cpfDuplicado, emailDuplicado } from "../../../../lib/erros";

export async function GET(request: Request) {
    const data = await getAdministradores()
    
    return NextResponse.json(data)
}

export async function POST(request:Request) {
    const dados: Administrador = await request.json()
    if (dados !== null){
        try {

            const adm = await inserirAdministrador(dados)
    
            if (adm === null) {
                return NextResponse.json("ERROR 00")
            } else {
                console.log("Dados criados.\n", adm);
                try {
                   
                } catch (e) {
                    console.log(e)
                }
                return NextResponse.json(adm)
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