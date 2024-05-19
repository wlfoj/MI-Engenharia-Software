import { NextResponse } from "next/server";
import { getUsuario } from "../../../../../lib/usuario";
import { usuarioNaoEncontrado } from "../../../../../lib/erros";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { email: string };
  }
) {
  const email = params.email;
  try {
    const data = await getUsuario(email);
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof usuarioNaoEncontrado) {
      return NextResponse.json(JSON.stringify('ERROR 03'));
    }
  }

}