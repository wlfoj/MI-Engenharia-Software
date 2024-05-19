import { NextResponse } from "next/server";
import { getAdministrador } from "../../../../../lib/administrador";
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
    const data = await getAdministrador(cpf);
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof usuarioNaoEncontrado) {
      return NextResponse.json(JSON.stringify('ERROR 03'));
    }
  }

}