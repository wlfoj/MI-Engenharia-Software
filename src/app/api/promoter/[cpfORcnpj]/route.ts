import { NextResponse } from "next/server";
import { getPromoter } from "../../../../../lib/promoter";
import { usuarioNaoEncontrado } from "../../../../../lib/erros";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { cpfORcnpj: string };
  }
) {
  const cpfORcnpj = params.cpfORcnpj;
  try {
    const data = await getPromoter(cpfORcnpj);
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof usuarioNaoEncontrado) {
      return NextResponse.json(JSON.stringify('ERROR 03'));
    }
  }
    
}