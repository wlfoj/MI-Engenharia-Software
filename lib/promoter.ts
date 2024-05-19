import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { cpfDuplicado, emailDuplicado, usuarioNaoEncontrado } from "./erros";
import { mailOptions, transporter, trocarDestinatario } from "./nodemailer";

export type Promoters = Prisma.PromiseReturnType<typeof getPromoters>;
export type Promoter = {
    cpf: string,
    cnpj: string,
    status: string,
    data_nasc: Date,
    telefone: string,
    usuario: {
        nome: string,
        email: string,
        senha: string
    },
    endereco: {
        rua: string,
        numero: number,
        bairro: string,
        cidade: string,
        estado: string,
        cep: string,
        complemento: string,
    },
};

export type edicaoPromoterTipo = {
    tipo: string,
    novoDado: string,
    cpfORcnpj: string
}


export async function getPromoters() {
    const data = await prisma.promoter.findMany({
        include: {
            usuario: true,
            eventos: true,
            endereco: true,
        },
        orderBy: [{
            id: "desc"
        }
        ],
    })

    const listaPromoterSemSenha: any = []
    data.map((u) => {
        if (u !== null) {
            const { usuario, ...promoterSemSenha } = u;
            const promoterSemSenhaCompleto = {
                ...promoterSemSenha,
                usuario: {
                    ...usuario,
                    senha: undefined // Exclui a propriedade "senha" do objeto interno "usuario"
                }
            }
            listaPromoterSemSenha.push(promoterSemSenhaCompleto);
        }
    });
    return listaPromoterSemSenha

}

export async function getPromoter(cpfORcnpj: string) {
    const data = await prisma.promoter.findMany({
        where: {
            OR: [
                { cpf: cpfORcnpj },
                { cnpj: cpfORcnpj }
            ]
        },
        include: {
            usuario: true,
            eventos: true,
            endereco: true,
        },
        orderBy: [{
            id: "desc"
        }
        ],
    })

    if (data[0] === null) throw new usuarioNaoEncontrado('Promoter com esse CPF não foi encontrado')

    const { usuario, ...promoterSemSenha } = data[0];
    const promoterSemSenhaCompleto = {
        ...promoterSemSenha,
        usuario: {
            ...usuario,
            senha: undefined // Exclui a propriedade "senha" do objeto interno "usuario"
        }
    }

    return promoterSemSenhaCompleto

}

export async function inserirPromoter(promoter: Promoter) {

    if (promoter === null) {
        return null
    } else {
        try {
            const promoterDATA = await prisma.promoter.create({
                data: {
                    usuario: {
                        create: {
                            nome: promoter.usuario.nome,
                            email: promoter.usuario.email,
                            senha: promoter.usuario.senha
                        }
                    },
                    cpf: promoter.cpf,
                    cnpj: promoter.cnpj,
                    status: promoter.status,
                    data_nasc: promoter.data_nasc,
                    telefone: promoter.telefone,
                    endereco: {
                        create: {
                            rua: promoter.endereco.rua,
                            numero: promoter.endereco.numero,
                            bairro: promoter.endereco.bairro,
                            cidade: promoter.endereco.cidade,
                            estado: promoter.endereco.estado,
                            cep: promoter.endereco.cep,
                            complemento: promoter.endereco.complemento
                        }
                    }
                }
            })

            trocarDestinatario(promoter.usuario.email)
            await transporter.sendMail({
                ...mailOptions,
                subject: 'Verificando Conta Wilbor',
                text: 'Email vindo diretamente do mado do backend',
                html: '<h1>MAGO DO BACKEND</h1><p>Email enviado pelo mago do backend' +
                    ' quando sua conta foi criada no melhor site do universo. Sinta-se' +
                    ' honrado de estar recebendo o email do mago do beck-end Pedro VI</p>'
            })
            return promoterDATA

        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    if (e.message.split(' ')[8] === '`Usuario_email_key`') {
                        throw new emailDuplicado("esté email já existe nos registros.")
                    } else if (e.message.split(' ')[8] === '`Administrador_cpf_key`') {
                        throw new cpfDuplicado("esté cpf já existe nos registros.")
                    }
                }
            }
        }

    }
}


export async function edicaoPromoter(tipoDeEdicao: string, novoDadoAlterado: string, cpfORcnpjDoPromoter: string) {
    if (tipoDeEdicao === 'trocar status') {
        try {
            const promoter = await getPromoter(cpfORcnpjDoPromoter)
            if (promoter !== null) {
                const promoterAtualizado = await prisma.promoter.update({
                    where: { id: promoter.id },
                    data: { status: novoDadoAlterado },
                });
                console.log("PROMOTER NA LIB: ", promoterAtualizado)
                return promoterAtualizado
            }
        } catch (e) {
            console.error('Erro ao atualizar o evento:', e);
            return null
        }
    }
}

