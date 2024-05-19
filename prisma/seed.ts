import { PrismaClient } from '@prisma/client'
import { data } from 'autoprefixer';
import { create } from 'domain';
const prisma = new PrismaClient()

async function main() {

  await prisma.compra.deleteMany()
  await prisma.ingresso.deleteMany()
  await prisma.lotacao.deleteMany()
  await prisma.evento.deleteMany()
  await prisma.promoter.deleteMany()
  await prisma.cliente.deleteMany()
  await prisma.administrador.deleteMany()
  await prisma.usuario.deleteMany()
  await prisma.endereco.deleteMany()
  await prisma.cartao_Credito.deleteMany()
  await prisma.setor.deleteMany()
  await prisma.perfil.deleteMany()

  /* ADMINISTRADOR 1 */
  const adm1 = await prisma.administrador.create({
    data: {
      cpf: "95545192069",
      super_adm: true,
      usuario: {
        create: { 
        nome: "Pedro",
        email: "pedro200@hotmail.com",
        senha: "pedropedro99"}
      }
    }
  })

  /* ADMINISTRADOR 2 */
  const adm2 = await prisma.administrador.create({
    data: {
      cpf: "27770383099",
      super_adm: false,
      usuario: {
        create: {
          nome: "Nalbert",
          email: "nalbert100@gmail.com",
          senha: "nalbert123"
        }
      }
    }
  })

  /* PERFIS DE INGREO */
  const perfilInteira = await prisma.perfil.create({
    data: {
      nome: "Inteira"
    }
  })

  const perfilMeia = await prisma.perfil.create({
    data: {
      nome: "Meia"
    }
  })

  const perfilGratuita = await prisma.perfil.create({
    data: {
      nome: "Gratuita"
    }
  })

  /* SETORES DE INGREÇO */
  const setorVip = await prisma.setor.create({
    data: {
      nome: "Vip"
    }
  })

  const setorCamarote = await prisma.setor.create({
    data: {
      nome: "Camarote"
    }
  })
  
  const setorBackstage = await prisma.setor.create({
    data: {
      nome: "Backstage"
    }
  })

  /* PROMOTER 1 */
  const promoter1 = await prisma.promoter.create({
    data: {
      usuario: {
        create: {
          nome: "Rafeael Tosta",
          email: "tostinha123@yahoo.com",
          senha: "Tosta1134"
        }
      },
      cpf: "45267413020",
      status: "aprovado",
      data_nasc: new Date(),
      telefone: "6523848514",
      endereco: {
        create: {
          rua: "Rua da Paz",
          numero: 123,
          bairro: "Centro",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01010-010",
          complemento: "Apartamento 42"
       }
      }
    }
  })

  //Criação de Enderço do Evento
  const endereco1 = await prisma.endereco.create({
    data: {
      "rua": "Avenida das Flores",
      numero: 1234,
      bairro: "Jardim das Tulipas",
      cidade: "São Paulo",
      estado: "SP",
      cep: "04567-890",
      complemento: "Apartamento 56"
    }
  })

  const endereco2 = await prisma.endereco.create({
    data: {
      rua: "Rua da Paz",
      numero: 100,
      bairro: "Jardim das Flores",
      cidade: "São Paulo",
      estado: "SP",
      cep: "04535-070",
      complemento: "Apto 501"
   }
  })

  const endereco3 = await prisma.endereco.create({
    data: {
      rua: "Avenida Senador Teotônio Vilela",
      numero: 400,
      bairro: "Jardim Malia I",
      cidade: "São Paulo",
      estado: "SP",
      cep: "04792-090",
      complemento: "Autódromo de Interlagos"
    }
  })

  const endereco4 = await prisma.endereco.create({
    data: {
      rua: "Avenida Luís Viana Filho",
      numero: 1590,
      bairro: "Itapuã",
      cidade: "Salvador",
      estado: "BA",
      cep: "41730-101",
      complemento: "Parque de Exposições"
    }
  })



   /* PROMOTER 2 */
   const promoter2 = await prisma.promoter.create({
    data: {
      usuario: {
        create: {
          nome: "Luan Gabirel",
          email: "luanzito@gmaiil.com",
          senha: "1234"
        }
      },
      cpf: "72417917033",
      status: "aprovado",
      data_nasc: new Date(),
      telefone: "9136945571",
      endereco: {
        create: {
          rua: "Rua dos Girassóis",
          numero: 123,
          bairro: "Jardim das Flores",
          cidade: "Curitiba",
          estado: "PR",
          cep: "80000-000",
          complemento: ""
          }
      }
    }
  })

   /* PROMOTER 3 */
   const promoter3 = await prisma.promoter.create({
    data: {
      usuario: {
        create: {
          nome: "Borger Manuel",
          email: "borgerzada@outlook.com",
          senha: "123456"
        }
      },
      cpf: "58429911014",
      status: "aprovado",
      data_nasc: new Date(),
      telefone: "8536231962",
      endereco: {
        create: {
          rua: "Rua das Flores",
          numero: 123,
          bairro: "Jardim Botânico",
          cidade: "Porto Alegre",
          estado: "RS",
          cep: "90210-123",
          complemento: "Apartamento 401"
          }
      }
    }
  })

  //Criação do Evento
  const evento1 = await prisma.evento.create({
    data: {
      nome: "Djavan Turnê D 2023",
      horaInicio: new Date("2023-07-30 19:00"),
      horaFim: new Date("2023-07-30 23:00"),
      descricao: "Depois de encerrar o ano de 2022 com participações marcantes em importantes festivais, Djavan volta aos palcos em 2023 com uma longa série de shows da turnê ‘D’!",
      banner: "/img/event-banner/show_djavan.jpeg",
      status: 'disponivel',
      id_promoter: promoter1.id,
      id_endereco: endereco1.id
    }
  })

  const evento2 = await prisma.evento.create({
    data: {
      nome: "Festinha de Tosta",
      horaInicio: new Date("2023-06-01 18:00"),
      horaFim: new Date("2023-01-06 22:00"),
      descricao: "Uma festa que ira ver Tosta",
      banner: "/img/event-banner/festinha-tosta.jpg",
      status: 'suspenso',
      id_promoter: promoter3.id,
      id_endereco: endereco2.id
    }
  })

  const evento3 = await prisma.evento.create({
    data: {
      nome: "Rock in Rio",
      horaInicio: new Date("2023-09-29 17:00"),
      horaFim: new Date("2023-09-30 02:00"),
      descricao: "O Rock in Rio está de volta para mais uma edição épica. Prepare-se para vivenciar dias incríveis de música, diversão e energia inigualável. O festival trará artistas nacionais e internacionais renomados, com performances emocionantes e shows memoráveis. Desfrute de uma experiência única no coração do Rio de Janeiro, na Cidade do Rock, com uma atmosfera vibrante e uma diversidade musical que atende a todos os gostos e estilos.",
      banner: "/img/event-banner/rock-in-rio.jpg",
      status: "disponível",
      id_promoter: promoter1.id,
      id_endereco: endereco2.id

    }
  })

  const evento4 = await prisma.evento.create({
    data: {
      nome: "Lollapalooza Brasil",
      horaInicio: new Date("2023-11-04 15:00"),
      horaFim: new Date("2023-11-04 00:00"),
      descricao: "O Lollapalooza Brasil está de volta com um line-up imperdível de artistas nacionais e internacionais. Prepare-se para um fim de semana incrível no Autódromo de Interlagos, em São Paulo, repleto de música, arte e entretenimento. Explore diferentes gêneros musicais, desde o rock e pop até a música eletrônica e alternativa.",
      banner:"/img/event-banner/lollapalooza.jpg",
      status: "disponível",
      id_promoter: promoter2.id,
      id_endereco: endereco3.id
    }
  })

  const evento5 = await prisma.evento.create({
    data: {
      nome: "Festival de Verão Salvador",
      horaInicio: new Date("2023-12-10 18:00"),
      horaFim: new Date("2023-12-11 04:00"),
      descricao: "O Festival de Verão Salvador é o lugar onde a alegria encontra a música. Desfrute de dias ensolarados, praia e shows incríveis no Parque de Exposições, em Salvador. Com uma mistura de ritmos como axé, sertanejo, pagode e música eletrônica, o festival promete agitar o público com artistas renomados.",
      banner: "/img/event-banner/festival-de-verao.jpg",
      status: "disponível",
      id_promoter: promoter1.id,
      id_endereco: endereco4.id
    }
  })

  //Lotações do Evento
  const lotacao1 = await prisma.lotacao.create({
    data: {
      id_evento: evento1.id,
      id_perfil: perfilInteira.id,
      id_setor: setorVip.id,
      quantidade: 100,
      valorTotal: 200
    }
  })

  const lotacao2 = await prisma.lotacao.create({
    data: {
      id_evento: evento1.id,
      id_perfil: perfilMeia.id,
      id_setor: setorVip.id,
      quantidade: 100,
      valorTotal: 100
    }
  })
  

  const lotacao3 = await prisma.lotacao.create({
    data: {
      id_evento: evento2.id,
      id_perfil: perfilInteira.id,
      id_setor: setorVip.id,
      quantidade: 100,
      valorTotal: 200
    }
  })

  const lotacao4 = await prisma.lotacao.create({
    data: {
      id_evento: evento2.id,
      id_perfil: perfilMeia.id,
      id_setor: setorVip.id,
      quantidade: 100,
      valorTotal: 100
    }
  })

  const lotacao5 = await prisma.lotacao.create({
    data: {
      id_evento: evento2.id,
      id_perfil: perfilInteira.id,
      id_setor: setorCamarote.id,
      quantidade: 300,
      valorTotal: 500
    }
  })

  const lotacao6 = await prisma.lotacao.create({
    data: {
      id_evento: evento2.id,
      id_perfil: perfilMeia.id,
      id_setor: setorCamarote.id,
      quantidade: 100,
      valorTotal: 250
    }
  })

  //evento 3

  const lotacao7 = await prisma.lotacao.create({
    data: {
      id_evento: evento3.id,
      id_perfil: perfilMeia.id,
      id_setor: setorCamarote.id,
      quantidade: 500,
      valorTotal: 250
    }
  })

  const lotacao8 = await prisma.lotacao.create({
    data: {
      id_evento: evento3.id,
      id_perfil: perfilInteira.id,
      id_setor: setorCamarote.id,
      quantidade: 500,
      valorTotal: 500
    }
  })

  const lotacao9 = await prisma.lotacao.create({
     data: {
      id_evento: evento3.id,
      id_perfil: perfilInteira.id,
      id_setor: setorVip.id,
      quantidade: 200,
      valorTotal: 1000
    }
  })

  //evento 4
  const lotacao10 = await prisma.lotacao.create({
     data: {
      id_evento: evento4.id,
      id_perfil: perfilInteira.id,
      id_setor: setorVip.id,
      quantidade: 200,
      valorTotal: 650
    }
  })

    const lotacao11 = await prisma.lotacao.create({
     data: {
      id_evento: evento4.id,
      id_perfil: perfilMeia.id,
      id_setor: setorVip.id,
      quantidade: 200,
      valorTotal: 325
    }
  })

  //evento 5

    const lotacao12 = await prisma.lotacao.create({
     data: {
      id_evento: evento5.id,
      id_perfil: perfilInteira.id,
      id_setor: setorVip.id,
      quantidade: 100,
      valorTotal: 300
    }
  })

    const lotacao13 = await prisma.lotacao.create({
     data: {
      id_evento: evento5.id,
      id_perfil: perfilMeia.id,
      id_setor: setorVip.id,
      quantidade: 100,
      valorTotal: 150
    }
  })

    const lotacao14 = await prisma.lotacao.create({
     data: {
      id_evento: evento5.id,
      id_perfil: perfilInteira.id,
      id_setor: setorCamarote.id,
      quantidade: 200,
      valorTotal: 400
    }
  })

    const lotacao15 = await prisma.lotacao.create({
     data: {
      id_evento: evento3.id,
      id_perfil: perfilGratuita.id,
      id_setor: setorBackstage.id,
      quantidade: 50,
      valorTotal: 0
    }
  })

  
   /* PROMOTER 4 */
   const promoter4 = await prisma.promoter.create({
    data: {
      usuario: {
        create: {
          nome: "Seu Jorge",
          email: "jorge@gmaiil.com",
          senha: "123456789"
        }
      },
      cpf: "28419554006",
      status: "suspenso",
      data_nasc: new Date(),
      telefone: "6838738801",
      endereco: {
        create: {
          rua: "Rua dos Jasmins",
          numero: 12,
          bairro: "Jardim das Flores",
          cidade: "São Paulo",
          estado: "SP",
          cep: "04567-890",
          complemento: "Apto 42"
        }
      }
    }
  })

  /* CLEINTE 1 */
  const cliente1 = await prisma.cliente.create({
    data: {
      cpf: '66668230016',
      telefone: '6926587229',
      data_nasc: new Date(),
      usuario: {
        create: {
          nome: "Jorge Amado",
          email: "seujorgeamado@yahoo.com",
          senha: "1234"
        }
      },
      endereco: {
        create: {
          rua: "Rua da Consolação",
          numero: 1000,
          bairro: "Consolação",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01302-907",
          complemento: "Apt 501"
        }  
      },
      cartao: {
        create: {
          num_cartao: "123123123123",
          dono_cartao: "Juliano Folenta",
          data_vencimento: "2023",
          cvv: "123",
        }
      }
    }
  })

  //Criando compra do Cliente
  const compra1 = await prisma.compra.create({
    data: {
      id_cliente: cliente1.id,
      data_hora: new Date(),
      ingressos: {
          createMany: {
            data:[ {
              valor_pago: 200,
              id_lotacao: lotacao1.id
            }, {
              valor_pago: 200,
              id_lotacao: lotacao1.id
            }]
          }
        }
      }
  })
  
  /* CLEINTE 2 */
  const cliente2 = await prisma.cliente.create({
    data: {
      cpf: '66668240016',
      telefone: '5926587229',
      data_nasc: new Date(),
      usuario: {
        create: {
          nome: "Josivaldo da Silva",
          email: "meuemail@yahoo.com",
          senha: "1234232"
        }
      },
      endereco: {
        create: {
          rua: "Rua Barão de Itapetininga",
          numero: 37,
          bairro: "República",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01042-000",
          complemento: "Sala 12"
       }
       
      },
      cartao: {
        create: {
          num_cartao: "9999999999999999",
          dono_cartao: "Josivaldo da Silva",
          data_vencimento: "245",
          cvv: "444",
        }
      }
    }
  })

  const compra2 = await prisma.compra.create({
    data: {
      id_cliente: cliente2.id,
      data_hora: new Date(),
      ingressos: {
          create: {
              valor_pago: 200,
              id_lotacao: lotacao1.id
          }
        }
      }
  })

  /* CLEINTE 3 */
  const cliente3 = await prisma.cliente.create({
    data: {
      cpf: '62807982085',
      telefone: '6725361968',
      data_nasc: new Date(),
      usuario: {
        create: {
          nome: "Andre Rodrigues",
          email: "andrezito@yahoo.com",
          senha: "123"
        }
      },
      endereco: {
        create: {
          rua: "Rua Barão de Itapetininga",
          numero: 150,
          bairro: "República",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01042-000",
          complemento: "Sala 12"
       }
       
      },
      cartao: {
        create: {
          num_cartao: "1111111111111111",
          dono_cartao: "Josemar Almeida",
          data_vencimento: "2055",
          cvv: "333",
        }
      }
    }
  })

  const cliente4 = await prisma.cliente.create({
    data: {
      cpf: '66168230016',
      telefone: '6906587229',
      data_nasc: new Date(),
      usuario: {
        create: {
          nome: "Jorge Amado",
          email: "seuxxxamado@yahoo.com",
          senha: "1234"
        }
      },
      endereco: {
        create: {
          rua: "Rua da Consolação",
          numero: 1000,
          bairro: "Consolação",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01302-907",
          complemento: "Apt 501"
        }  
      },
    }
  })

} main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

/*Parabéns 
professor
você
chegou ao
FIM!!!! */
