import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { Promoter } from "./promoter";
import { getPromoter } from "./promoter";

export type Eventos = Prisma.PromiseReturnType<typeof getEventos>;
export type Evento = {
  nome: string,
  horaInicio: string,
  horaFim: string,
  descricao: string,
  banner: string,
  id_endereco: number,
  id_promoter: string,
  status: string,
  endereco: {
    bairro: string,
    cep: string,
    cidade: string,
    estado: string,
    numero: number,
    rua: string,
    complemento: string
  }
  lotacoes: [
    lotacao: {
      id_perfil: number,
      id_setor: number,
      quantidade: number,
      valorTotal: number
    }
  ]
};

export type edicaoEventoTipo = {
  tipo: string,
  novoDado: string,
  idDoEvento: number
}

export async function getEventos() {
  const data = await prisma.evento.findMany({
    include: {
      endereco: true,
      promoter: true,
      lotacao: true,
    },
    orderBy: [{
      id: "desc"
    }
    ],
  })

  return data
}

export async function getEvento(id: number) {
  const data = await prisma.evento.findUnique({
    where: {
      id: id,
    },
    include: {
      endereco: true,
      promoter: true,
      lotacao: {
        include: {
          perfil: true,
          setor: true
        }
      }
    },
  });

  return data;
}

export async function inserirEvento(evento: Evento) {

  if (evento === null) {
    return null
  } else {
    const promoter = await getPromoter(evento.id_promoter)
    if (promoter !== null) {

      const endereco = await prisma.endereco.create({
        data: {
  
          bairro: evento.endereco.bairro,
          cep: evento.endereco.cep,
          cidade: evento.endereco.cidade,
          estado: evento.endereco.estado,
          numero: evento.endereco.numero,
          rua: evento.endereco.rua,
          complemento: evento.endereco.complemento
  
        }
      })
      console.log(endereco);
      
      const eventoDATA = await prisma.evento.create({
        data: {
          nome: evento.nome,
          horaInicio: new Date(evento.horaInicio),
          horaFim: new Date(evento.horaFim),
          descricao: evento.descricao,
          banner: evento.banner,
          id_endereco: endereco.id,
          id_promoter: promoter.id,
          status: evento.status,
        }
      })
      console.log(eventoDATA)
      evento.lotacoes.map(async (lotacao) => {
        await prisma.lotacao.create({
          data: {
            id_evento: eventoDATA.id,
            id_perfil: lotacao.id_perfil,
            id_setor: lotacao.id_setor,
            quantidade: lotacao.quantidade,
            valorTotal: lotacao.valorTotal
          }
        })
        console.log(lotacao)
      })
  
      return eventoDATA
    }
    return null
  }
}

export async function edicaoEvento(tipoDeEdicao: string, novoDadoAlterado: string, idEvento: number) {
  if (tipoDeEdicao === 'trocar status') {
    try {
      const evento = await prisma.evento.update({
        where: { id: idEvento },
        data: { status: novoDadoAlterado },
      });
      console.log("EVENTO NA LIB: ", evento)
      return evento
    } catch (error) {
      console.error('Erro ao atualizar o evento:', error);
      return null
    }
  }
}