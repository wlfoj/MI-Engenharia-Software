import { NextResponse } from "next/server";
import { getEvento } from "../../../../../lib/evento";


/* Banco pessoal
mysql://root:(SENHA)@localhost:3306/(NOME DO BANCO) 
*/

/* Banco PlanetScale (Com erro)
mysql://nh7ntf3fxeucxnnj0c6s:pscale_pw_Xy42bmYPRmC8byFrTK6SzV7jv4OABObnuFmuSZogCrY@aws.connect.psdb.cloud/bd_wilticket?sslaccept=strict
*/

export async function GET(request: Request, {params}: {
    params: { id: number }
  })
{
    const data = await getEvento(Number(params.id))
    return NextResponse.json(data)
}