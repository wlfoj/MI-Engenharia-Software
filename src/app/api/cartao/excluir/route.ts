import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma"
import { getCliente } from "../../../../../lib/cliente"

type Cpf = {
    cpf: string
}

export async function POST(request: Request) {
    const dados: Cpf = await request.json();
    if (dados) {
        const cliente = await getCliente(dados.cpf);
        if (cliente) {
            const cartao = await prisma.cartao_Credito.delete({
                where: {
                    //@ts-ignore
                    id: cliente.id_cartao
                }
            });
            NextResponse.json({message:"Cartão excluído com sucesso!"}, {status: 200})
        }
    }
    NextResponse.json({error:"Erro ao excluir cartão!"}, {status: 400});
}
