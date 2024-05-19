import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { usuarioNaoEncontrado } from "./erros";
import { mailOptions, transporter, trocarDestinatario } from "./nodemailer";

export type Usuario = Prisma.PromiseReturnType<typeof getUsuario>;
export type edicaoUsuarioTipo = {
  tipo: string,
  novoDado: string,
  emailDoUsuario: string
}
export type alterarSenhaType = {
  email: string,
  senhaAntiga: string,
  senhaNova: string,
}

export async function verificarEmailESenha(email: string, senha: string) {
  const user = await prisma.usuario.findUnique({
    where: {
      email: email,
    },
    include: {
      adm: true,
      promoter: true,
      cliente: true
    }
  });

  if (user && user.senha === senha) {
    if (user.adm !== null) {
      const userWithoutPass = {
        name: user.nome,
        email: user.email,
        role: "administrador",
        id: user.adm.cpf
      }
      return userWithoutPass
    } else if (user.promoter !== null) {
      if (user.promoter && user.promoter.cnpj !== null) {
        const userWithoutPass = {
          name: user.nome,
          email: user.email,
          role: "promoter",
          id: user.promoter.cnpj
        }
        return userWithoutPass
      } else if (user.promoter && user.promoter.cpf !== null) {
        const userWithoutPass = {
          name: user.nome,
          email: user.email,
          role: "promoter",
          id: user.promoter.cpf
        }
        return userWithoutPass
      }

    } else if (user.cliente !== null) {
      const userWithoutPass = {
        name: user.nome,
        email: user.email,
        role: "cliente",
        id: user.cliente.cpf
      }
      return userWithoutPass
    }
  } else {
    throw new usuarioNaoEncontrado('Login falhou, email ou senha errados.')
  }
}

export async function getUsuario(email: string) {
  const data = await prisma.usuario.findUnique({
    where: {
      email: email,
    },
    include: {
      adm: true,
      promoter: true,
      cliente: true
    }
  });
  if (data === null) throw new usuarioNaoEncontrado('Usuario com esse email não foi encontrar')

  const { senha, ...usuarioSemSenha } = data;
  return usuarioSemSenha


}

export async function edicaoUsuario(tipoDeEdicao: string, novoDadoAlterado: string, emailUsuario: string) {
  if (tipoDeEdicao === 'trocar nome') {
    try {
      const user = await prisma.usuario.update({
        where: { email: emailUsuario },
        data: { nome: novoDadoAlterado },
      });
      console.log('Usuario atualizado:', user);
      return user
    } catch (e) {
      console.log("Deu error: ", e)
    }
  }
}

// =============================================TRECHO ADEQUADO================================================================= //
export async function findUserByEmailPass(pass: string, email: string) {
	// Busca um user com base no email e senha
	const user = await prisma.usuario.findFirst({
		where: {
		  email: email,
		  senha: pass
		},
		include: {
		  adm: true,
		  promoter: true,
		  cliente: true
		}
	});
	return user;
}

export async function updatePass(senhaAntiga: string, novaSenha: string, emailUsuario: string) {
	// Busca o usuário no banco de dados
	const res = await findUserByEmailPass(senhaAntiga, emailUsuario);
	// Se não existir, retorna null
	if (!res || res == undefined){
		throw new usuarioNaoEncontrado("A senha atual está incorreta")
	}
	// Se existir, chama a atualização de senha
	const user = await prisma.usuario.update({
		where: { email: emailUsuario },
		data: { senha: novaSenha },
	});
	return user
}
// ========================================================================================================================= //



export async function alterarSenha(senhaAntiga: string, novaSenha: string, emailUsuario: string) {
  try {
    await verificarEmailESenha(emailUsuario, senhaAntiga)
    const user = await prisma.usuario.update({
      where: { email: emailUsuario },
      data: { senha: novaSenha },
    });
    console.log('Usuario atualizado:', user);
    return user
  } catch (e) {
    if (e instanceof usuarioNaoEncontrado){
      throw e
    }
  }
}

export async function esqueceuSenha(emailUsuario: string) {

  const user = await prisma.usuario.findUnique({
    where: {
      email: emailUsuario
    },
  })

  if (user === null) throw new usuarioNaoEncontrado('Esse email não possui registro no sistema')
  trocarDestinatario(emailUsuario)
  await transporter.sendMail({
      ...mailOptions,
      subject: 'Esqueceu a senha da conta Wilbor',
      text: 'Email vindo diretamente do mado do backend',
      html: '<h1>MAGO DO BACKEND</h1><p>Email enviado pelo mago do backend' +
      ' quando sua conta foi criada no melhor site do universo. Sinta-se' +
      ' honrado de estar recebendo o email do mago do beck-end Pedro VI' +
      'Sua senha esquecida é '+ user.senha + '</p>'
  })
  return user.senha
  

}