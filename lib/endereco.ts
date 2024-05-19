import { getCliente } from "./cliente"
import { getPromoter } from "./promoter"
import { prisma } from "./prisma";

export type edicaoEnderecoTipo = {
    rua: string,
    numero: number,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string,
    complemento: string | null,
    identificadorDoDono: string | number, //AQUI COLOCA O CPF OU CNPJ DO DONO DAQUELE ENDEREÇO, SE FOR CLIENTE SÓ COLOCAR O CPF, SE FOR PROMOTER COLOCAR CPF OU CNPJ E SE FOR O EVENTO COLOCA O ID
    tipoDoUsuario: string //AQUI COLOCA O TIPO DO USUARIO, SE ELE È UM CLIENTE OU UM PROMOTER OU UM EVENTO
}

/* NA EDIÇÂO DE ENDERÇO, QUANDO QUISER MANTER UMA PARTE DO ENDEREÇO IGUAL O ANTIGO
BASTA MANDAR UMA STRING VAZIA OU O NUMERO -1 NO OBJETO enderco, como por exemplo alguem quer mudar tudo do enredoço
menor o numero, então na parte de endero.numero você associa o valor -1
ou se alguem quiser mudar tudo menos a rua dele, então na parte de endero.rua você associa uma string vazia */

export async function edicaoEndereco(endereco:edicaoEnderecoTipo) {
    if (typeof(endereco.identificadorDoDono) === 'number') {

    } else {
        if (endereco.tipoDoUsuario === 'cliente') {
            console.log("FUI PRO CLIENTE")
            const cliente = await getCliente(endereco.identificadorDoDono)
            if (cliente !== null) {
                try {
                  const enderecoDoCliente = await prisma.endereco.findUnique({
                    where: {id: cliente.endereco.id},})
                  if (enderecoDoCliente !== null){
                    if (endereco.rua === ''){
                      endereco.rua = enderecoDoCliente.rua
                    }
                    if (endereco.numero === -1) {
                      endereco.numero = enderecoDoCliente.numero
                    }
                    if (endereco.bairro === '') {
                      endereco.bairro = enderecoDoCliente.bairro
                    }
                    if (endereco.cidade === '') {
                      endereco.cidade = enderecoDoCliente.cidade
                    }
                    if (endereco.estado === '') {
                      endereco.estado = enderecoDoCliente.estado
                    }
                    if (endereco.cep === '') {
                      endereco.cep = enderecoDoCliente.cep
                    }
                    if (endereco.complemento === '') {
                      endereco.complemento = enderecoDoCliente.complemento
                    }
                  }
                  const enderecoDoClienteAtualizado = await prisma.endereco.update({
                    where: {id: cliente.endereco.id},
                    data: {
                      rua: endereco.rua,
                      numero: endereco.numero,
                      bairro: endereco.bairro,
                      cidade: endereco.cidade,
                      estado: endereco.estado,
                      cep: endereco.cep,
                      complemento: endereco.complemento,
                    }
                  })
                  return enderecoDoClienteAtualizado
                } catch (e) {
                  console.log("Deu erro: ", e)
                  return null
                }
              }
        } else if (endereco.tipoDoUsuario === 'promoter') {
            const promoter = await getPromoter(endereco.identificadorDoDono)
            if (promoter !== null) {
                try {
                  const enderecoDoPromoter = await prisma.endereco.findUnique({
                    where: {id: promoter.endereco.id},})
                  if (enderecoDoPromoter !== null){
                    if (endereco.rua === null){
                      endereco.rua = enderecoDoPromoter.rua
                    }
                    if (endereco.numero === null) {
                      endereco.numero = enderecoDoPromoter.numero
                    }
                    if (endereco.bairro === null) {
                      endereco.bairro = enderecoDoPromoter.bairro
                    }
                    if (endereco.cidade === null) {
                      endereco.cidade = enderecoDoPromoter.cidade
                    }
                    if (endereco.estado === null) {
                      endereco.estado = enderecoDoPromoter.estado
                    }
                    if (endereco.cep === null) {
                      endereco.cep = enderecoDoPromoter.cep
                    }
                    if (endereco.complemento === null) {
                      endereco.complemento = enderecoDoPromoter.complemento
                    }
                  }
                  const enderecoDoClienteAtualizado = await prisma.endereco.update({
                    where: {id: promoter.endereco.id},
                    data: {
                      rua: endereco.rua,
                      numero: endereco.numero,
                      bairro: endereco.bairro,
                      cidade: endereco.cidade,
                      estado: endereco.estado,
                      cep: endereco.cep,
                      complemento: endereco.complemento,
                    }
                  })
                  return enderecoDoClienteAtualizado
                } catch (e) {
                  console.log("Deu erro: ", e)
                  return null
                }
              }
        }
    } 
   
  }