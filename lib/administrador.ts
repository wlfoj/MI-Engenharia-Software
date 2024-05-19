import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { cpfDuplicado, emailDuplicado, usuarioNaoEncontrado } from "./erros";
import { mailOptions, transporter, trocarDestinatario } from "./nodemailer";


export type Administradores = Prisma.PromiseReturnType<typeof getAdministradores>;
export type Administrador = {
  cpf: string,
  super_adm: boolean,
  usuario: {
    nome: string,
    email: string,
    senha: string
  }
};



export async function getAdministradores() {
  const data = await prisma.administrador.findMany({
    include: {
      usuario: true,
    },
    orderBy: [{
      id: "desc"
    }
    ],
  })

  const listaAdministradorSemSenha: any = []
  data.map((u) => {
    if (u !== null) {
      const { usuario, ...AdministradorSemSenha } = u;
      const AdministradorSemSenhaCompleto = {
        ...AdministradorSemSenha,
        usuario: {
          ...usuario,
          senha: undefined // Exclui a propriedade "senha" do objeto interno "usuario"
        }
      }
      listaAdministradorSemSenha.push(AdministradorSemSenhaCompleto);
    }
  });

  return listaAdministradorSemSenha
}

export async function getAdministrador(cpf: string) {
  const data = await prisma.administrador.findUnique({
    where: {
      cpf: cpf,
    },
    include: {
      usuario: true
    },
  });

  if (data === null) throw new usuarioNaoEncontrado('Administrador com esse CPF não foi encontrado')

  const { usuario, ...AdministradorSemSenha } = data;
  const AdministradorSemSenhaCompleto = {
    ...AdministradorSemSenha,
    usuario: {
      ...usuario,
      senha: undefined // Exclui a propriedade "senha" do objeto interno "usuario"
    }
  }

  return AdministradorSemSenhaCompleto;

  return null
}

export async function inserirAdministrador(adm: Administrador) {
  if (adm === null) {
    return null
  } else {
    try {
      const administradorDATA = await prisma.administrador.create({
        data: {
          usuario: {
            create: {
              nome: adm.usuario.nome,
              email: adm.usuario.email,
              senha: adm.usuario.senha
            }
          },
          cpf: adm.cpf,
          super_adm: adm.super_adm
        }
      })
      trocarDestinatario(adm.usuario.email)
      await transporter.sendMail({
          ...mailOptions,
          subject: 'Verificando Conta Wilbor',
          text: 'Email vindo diretamente do mago do backend',
          html: '<h1>MAGO DO BACKEND</h1><p>Email enviado pelo mago do backend' +
          ' quando sua conta foi criada no melhor site do universo. Sinta-se' +
          ' honrado de estar recebendo o email do mago do beck-end Pedro VI</p>'
      })
      return administradorDATA
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
