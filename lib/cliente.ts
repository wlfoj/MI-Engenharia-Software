import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { cpfDuplicado, emailDuplicado, usuarioNaoEncontrado } from "./erros";
import { mailOptions, transporter, trocarDestinatario } from "./nodemailer";

export type Clientes = Prisma.PromiseReturnType<typeof getClientes>;
export type Cliente = {
  cpf: string,
  telefone: string,
  data_nasc: Date,
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
  cartao: {
    num_cartao: string,
    dono_cartao: string,
    data_vencimento: string,
    cvv: string,
  }
};
export type edicaoClienteTipo = {
  tipo: string,
  novoDado: string,
  cpfDoUsuario: string
}

export async function getClientes() {
  const data = await prisma.cliente.findMany({
    include: {
      endereco: true,
      usuario: true,
      cartao: true,
      compras: {
        include: {
          ingressos: true,
        }
      },
    },
    orderBy: [{
      id: "desc"
    }
    ],
  })
  const listaClienteSemSenha: any = []
  data.map((u) => {
    if (u !== null) {
      const { usuario, ...clienteSemSenha } = u;
      const clienteSemSenhaCompleto = {
        ...clienteSemSenha,
        usuario: {
          ...usuario,
          senha: undefined // Exclui a propriedade "senha" do objeto interno "usuario"
        }
      }
      listaClienteSemSenha.push(clienteSemSenhaCompleto);
    }
  });

  return listaClienteSemSenha
}

export async function getCliente(cpf: string) {
  const data = await prisma.cliente.findUnique({
    where: {
      cpf: cpf,
    },
    include: {
      endereco: true,
      usuario: true,
      cartao: true,
      compras: {
        include: {
          ingressos: true,
        }
      }
    },
  });
  if (data === null) throw new usuarioNaoEncontrado('Cliente com esse CPF não foi encontrado')

  const { usuario, ...clienteSemSenha } = data;
  const clienteSemSenhaCompleto = {
    ...clienteSemSenha,
    usuario: {
      ...usuario,
      senha: undefined // Exclui a propriedade "senha" do objeto interno "usuario"
    }
  }
  return clienteSemSenhaCompleto;

}

export async function inserirCliente(cliente: Cliente) {

  if (cliente === null) {
    return null
  } else {
    try {

      const clienteDATA = prisma.cliente.create({
        data: {
          usuario: {
            create: {
              nome: cliente.usuario.nome,
              email: cliente.usuario.email,
              senha: cliente.usuario.senha
            }
          },
          endereco: {
            create: {
              bairro: cliente.endereco.bairro,
              cep: cliente.endereco.cep,
              cidade: cliente.endereco.cidade,
              estado: cliente.endereco.estado,
              numero: cliente.endereco.numero,
              rua: cliente.endereco.rua,
              complemento: cliente.endereco.complemento
            }
          },
          cpf: cliente.cpf,
          data_nasc: cliente.data_nasc,
          telefone: cliente.telefone,

        }
      })
      const { usuario, ...clienteSemSenha } = clienteDATA;
      const clienteSemSenhaCompleto = {
        ...clienteSemSenha,
        usuario: {
          ...usuario,
          senha: undefined // Exclui a propriedade "senha" do objeto interno "usuario"
        }
      }

      trocarDestinatario(cliente.usuario.email)
      await transporter.sendMail({
          ...mailOptions,
          subject: 'Verificando Conta Wilbor',
          text: 'Email vindo diretamente do mado do backend',
          html: '<h1>MAGO DO BACKEND</h1><p>Email enviado pelo mago do backend' +
          ' quando sua conta foi criada no melhor site do universo. Sinta-se' +
          ' honrado de estar recebendo o email do mago do beck-end Pedro VI</p>'
      })
      
      return clienteSemSenhaCompleto


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

export async function edicaoCliente(tipoDeEdicao: string, novoDadoAlterado: string, cpfCliente: string) {

}