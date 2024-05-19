import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"
import { getUsuario } from "../../../../lib/usuario"

type Cartao = {
    num_cartao: string,
    dono_cartao: string,
    data_vencimento: string,
    cvv: string
    usuario_email: string
}

export async function POST(request:Request) {
    const dados: Cartao = await request.json();
    if (dados) {
        const usuario = await getUsuario(dados.usuario_email);
        if (usuario) {
            if (usuario.cliente) {
                const cliente = await prisma.cliente.findUnique({
                    where: {
                        id_usuario: usuario?.id
                    }
                })
                if (cliente) {
                    const cartao = await prisma.cartao_Credito.create({
                        data: {
                            num_cartao: dados.num_cartao,
                            dono_cartao: dados.dono_cartao,
                            data_vencimento: dados.data_vencimento,
                            cvv: dados.cvv,
                            clientes: {
                                connect: {
                                    id: cliente.id
                                }
                            }
                            }
                        
                    })
                    NextResponse.json({message:"Cartão cadastrado com sucesso!"}, {status: 200})
                }
            }
        }
    }
    NextResponse.json({error:"Erro ao cadastrar cartão!"}, {status: 400});
}
    
