import { NextResponse } from "next/server";
import { getCliente } from "../../../../../lib/cliente";
import { usuarioNaoEncontrado } from "../../../../../lib/erros";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { cpf: string };
  }
) {
  const cpf = params.cpf;
  try {
    const data = await getCliente(cpf);
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof usuarioNaoEncontrado){
      return NextResponse.json(JSON.stringify('ERROR 03'));
    }
  }

}