"use client"
import React, { useState } from "react"

export default function testes() {

  const [jsonPraTela, setJsonPraTela] = useState('LOCAL ONDE O JSON CRIADO SERA EXIBIDO PARA SERVIR DE EXEMPLO')

  const adm = {
    nome: 'semsenhaman2',
    cpf: '11090780405',
    email: 'sousemsenhaa@xxxx.com',
    password: '12345',
  }
/*
  const promoter = {
    nome: 'Roberval',
    cpf: '77777777777',
    cpnj: null,
    email: 'asdasdasda@yahoo.com',
    password: '123',
    status: 'aprovado',
    data_nasc: new Date("1990-05-30"),
    telefone: '6523848524',
    rua: "Rua da Paz",
    numero: 123,
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01010-010",
    complemento: "Apartamento 42"
  }*/

  const promoter = {
    nome: 'Luis',
    cpf: '12377777777',
    cpnj: null,
    email: 'luisluis@yahoo.com',
    password: '123123',
    status: 'aprovado',
    data_nasc: new Date("1999-05-30"),
    telefone: '1233848524',
    rua: "Rua da Se",
    numero: 133,
    bairro: "Centro",
    cidade: "ipira",
    estado: "BA",
    cep: "01110-010",
    complemento: "Casa"
  }

  const cliente = {
    nome: 'Roberval',
    cpf: '33333333344',
    email: 'dsdsdsdswwwww@yahoo.com',
    password: '123',
    data_nasc: new Date("1999-05-30"),
    telefone: '6523855524',
    rua: "Rua da Paz",
    numero: 123,
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01010-010",
    complemento: "Apartamento 42",
    num_cartao: "123823123123",
    dono_cartao: "Josivaldin",
    data_vencimento: "2040",
    cvv: "444",
  }

  async function createCliente() {
    const jaison = JSON.stringify({
      cpf: cliente.cpf,
      telefone: cliente.telefone,
      data_nasc: cliente.data_nasc,
      usuario: {
        nome: cliente.nome,
        email: cliente.email,
        senha: cliente.password
      },
      endereco: {
        rua: cliente.rua,
        numero: cliente.numero,
        bairro: cliente.bairro,
        cidade: cliente.cidade,
        estado: cliente.estado,
        cep: cliente.cep,
        complemento: cliente.complemento,
      },
      cartao: {
        num_cartao: cliente.num_cartao,
        dono_cartao: cliente.dono_cartao,
        data_vencimento: cliente.data_vencimento,
        cvv: cliente.cvv,
      }
    })

    /* Mostrando no console do navegador o formato do json usado para enviar os dados para API */
    console.log("Exemplo de como o JSON para criação de um Cliente deve ser feito:\n" +
      jaison)

    /* Enviando de verdade para API */
    const res = await fetch("/api/cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jaison
    })

    if (res.ok) {
      const user = await res.json()
      setJsonPraTela(JSON.stringify(user)) 
      console.log(user)
    } else {
      setJsonPraTela("DEU BO")
    }


  }

  async function createPromoter() {
    const jaison = JSON.stringify({
      cpf: promoter.cpf,
      cnpj: promoter.cpnj,
      status: promoter.status,
      data_nasc: promoter.data_nasc,
      telefone: promoter.telefone,
      usuario: {
        nome: promoter.nome,
        email: promoter.email,
        senha: promoter.password
      },
      endereco: {
        rua: promoter.rua,
        numero: promoter.numero,
        bairro: promoter.bairro,
        cidade: promoter.cidade,
        estado: promoter.estado,
        cep: promoter.cep,
        complemento: promoter.complemento,
      }
    })

    /* Mostrando no console do navegador o formato do json usado para enviar os dados para API */
    console.log("Exemplo de como o JSON para criação de um Promoter deve ser feito:\n" +
      jaison)

    /* Enviando de verdade para API */
    const res = await fetch("/api/promoter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jaison
    })

    if (res.ok) {
      const user = await res.json()
      setJsonPraTela(JSON.stringify(user)) 
      console.log(user)
    } else {
      setJsonPraTela("DEU BO")
    }
  }



  async function createAdministrador() {
    const jaison = JSON.stringify({
      cpf: adm.cpf,
      super_adm: false,
      usuario: {
        nome: adm.nome,
        email: adm.email,
        senha: adm.password
      }
    })

    /* Mostrando no console do navegador o formato do json usado para enviar os dados para API */
    console.log("Exemplo de como o JSON para criação de um Administrador deve ser feito:\n" +
      jaison)
    /* Enviando de verdade para API */
    const res = await fetch("/api/administrador", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpf: adm.cpf,
        super_adm: false,
        usuario: {
          nome: adm.nome,
          email: adm.email,
          senha: adm.password
        }
      })
    })
    if (res.ok) {
      const user = await res.json()
      setJsonPraTela(JSON.stringify(user)) 
      console.log(user)
    } else {
      setJsonPraTela("DEU BO")
    }

  };

  return (
    <div className="pt-[100px] pb-5 bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200 ">
      <div className="flex flex-col lg:flex-row-reverse lg:gap-3 lg:justify-center lg:items-start items-center w-[98vw] min-h-[8rem] m-10">

        <div>
          <button onClick={createAdministrador} className="bg-[#ffffff] text-black-900 text-lg hover:bg-blue-gray-300 px-4 py-2 rounded-md">Criar Administrador</button>
        </div>
        <div>
          <button onClick={createPromoter} className="bg-[#ffffff] text-black-900 text-lg hover:bg-blue-gray-300 px-4 py-2 rounded-md">Criar Promoter</button>
        </div>
        <div>
          <button onClick={createCliente} className="bg-[#ffffff] text-black-900 text-lg hover:bg-blue-gray-300 px-4 py-2 rounded-md">Criar Cliente</button>
        </div>

      </div>
      <div className="bg-[#ffffff] flex flex-col lg:flex-row-reverse lg:gap-3 lg:justify-center lg:items-start items-center w-[98vw] min-h-[8rem] m-10">
        <div>
          <p>{jsonPraTela}</p>
        </div>
      </div>
    </div>
  );
};