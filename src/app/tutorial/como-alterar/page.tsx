"use client"
import React, { useState } from "react"
import { edicaoClienteTipo } from "../../../../lib/cliente";
import { edicaoEventoTipo } from "../../../../lib/evento";
import { alterarSenhaType, edicaoUsuarioTipo } from "../../../../lib/usuario";
import { edicaoPromoterTipo } from "../../../../lib/promoter";
import { edicaoEnderecoTipo } from "../../../../lib/endereco";

export default function testes() {

  const exemploJsonAlterarSenha: alterarSenhaType = {
    email: 'luanzito@gmaiil.com',
    senhaAntiga: 'eunaoseitrocarsenha',
    senhaNova: '12345',
  }

  const exemploJsonAlterarEndereco: edicaoEnderecoTipo = {
    rua: "RUAZINHA",
    numero: 132,
    bairro: "BAIRRINHO",
    cidade: "CIDADEZINHA",
    estado: "ESTADINHO",
    cep: "9283939",
    complemento: "COMPLEMENTINHO",
    identificadorDoDono: '66668230016',
    tipoDoUsuario: 'cliente'
  }

  const exemploJsonAlterarStatusPromoter: edicaoPromoterTipo = {
    tipo: 'trocar status',
    novoDado: 'aprovado',
    cpfORcnpj: '28419554006'
  }

  const exemploJsonEditarStatusEvento: edicaoEventoTipo = {
    tipo: 'trocar status',
    novoDado: 'suspenso',
    idDoEvento: 1
  }

  async function editarSenha() {
    const jaison = JSON.stringify({
      email: exemploJsonAlterarSenha.email,
      senhaAntiga: exemploJsonAlterarSenha.senhaAntiga,
      senhaNova: exemploJsonAlterarSenha.senhaNova
    })

    console.log("Exemplo de como o JSON para edição de senha de um Cliente deve ser feito:\n" +
      jaison)

    const res = await fetch("/api/usuario/alterar-senha", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jaison
    })

    if (res.ok) {
      const data = await res.json()
      setJsonPraTela(JSON.stringify(data))
      console.log(data)
    } else {
      setJsonPraTela("DEU BO")
    }

  }

  async function editarStatusEvento() {
    const jaison = JSON.stringify({
      tipo: exemploJsonEditarStatusEvento.tipo,
      novoDado: exemploJsonEditarStatusEvento.novoDado,
      idDoEvento: exemploJsonEditarStatusEvento.idDoEvento
    })

    console.log("Exemplo de como o JSON para edição staus de um Evento deve ser feito:\n" +
      jaison)

    const res = await fetch("/api/evento", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jaison
    })

    if (res.ok) {
      const data = await res.json()
      setJsonPraTela(JSON.stringify(data))
      console.log("AQUII:", res)
    } else {
      setJsonPraTela("DEU BO")
    }

  }

  async function editarEndereco() {
    const jaison = JSON.stringify({
      rua: exemploJsonAlterarEndereco.rua,
      numero: exemploJsonAlterarEndereco.numero,
      bairro: exemploJsonAlterarEndereco.bairro,
      cidade: exemploJsonAlterarEndereco.cidade,
      estado: exemploJsonAlterarEndereco.estado,
      cep: exemploJsonAlterarEndereco.cep,
      complemento: exemploJsonAlterarEndereco.complemento,
      identificadorDoDono: exemploJsonAlterarEndereco.identificadorDoDono,
      tipoDoUsuario: exemploJsonAlterarEndereco.tipoDoUsuario

    })

    console.log("Exemplo de como o JSON para edição de um Endereco do CLIENTE deve ser feito:\n" +
      jaison)

    const res = await fetch("/api/endereco", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jaison
    })

    if (res.ok) {
      const data = await res.json()
      setJsonPraTela(JSON.stringify(data))
      console.log("AQUII:", res)
    } else {
      setJsonPraTela("DEU BO")
    }

  }

  async function editarStatusPromoter() {
    const jaison = JSON.stringify({
      tipo: exemploJsonAlterarStatusPromoter.tipo,
      novoDado: exemploJsonAlterarStatusPromoter.novoDado,
      cpfORcnpj: exemploJsonAlterarStatusPromoter.cpfORcnpj
    })

    console.log("Exemplo de como o JSON para edição staus de um PROMOTER deve ser feito:\n" +
      jaison)

    const res = await fetch("/api/promoter", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jaison
    })

    if (res.ok) {
      const data = await res.json()
      setJsonPraTela(JSON.stringify(data))
      console.log("AQUII:", res)
    } else {
      setJsonPraTela("DEU BO")
    }

  }

  const [jsonPraTela, setJsonPraTela] = useState('LOCAL ONDE O JSON CRIADO SERA EXIBIDO PARA SERVIR DE EXEMPLO')

  return (
    <div className="pt-[100px] pb-5 bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200 ">
      <div className="flex flex-col lg:flex-row-reverse lg:gap-3 lg:justify-center lg:items-start items-center w-[98vw] min-h-[8rem] m-10">

        <div>
          <button onClick={editarSenha} className="bg-[#ffffff] text-black-900 text-lg hover:bg-blue-gray-300 px-4 py-2 rounded-md">Alterar senha</button>
        </div>
        <div>
          <button onClick={editarStatusEvento} className="bg-[#ffffff] text-black-900 text-lg hover:bg-blue-gray-300 px-4 py-2 rounded-md">Editar Status Evento</button>
        </div>
        <div>
          <button onClick={editarStatusPromoter} className="bg-[#ffffff] text-black-900 text-lg hover:bg-blue-gray-300 px-4 py-2 rounded-md">Editar Status Promoter</button>
        </div>
        <div>
          <button onClick={editarEndereco} className="bg-[#ffffff] text-black-900 text-lg hover:bg-blue-gray-300 px-4 py-2 rounded-md">Editar Endereco</button>
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