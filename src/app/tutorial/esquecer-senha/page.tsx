"use client"
import React, { useState } from "react"
import { edicaoClienteTipo } from "../../../../lib/cliente";
import { edicaoEventoTipo } from "../../../../lib/evento";
import { edicaoUsuarioTipo } from "../../../../lib/usuario";

export default function testes() {

  async function testeEsquecerSenha() {
    const res = await fetch("/api/usuario/esqueceu-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: "phaalmeida1@gmail.com"})
    })
  }



  return (
    <div className="pt-[100px] pb-5 bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200 ">
      <div className="flex flex-col lg:flex-row-reverse lg:gap-3 lg:justify-center lg:items-start items-center w-[98vw] min-h-[8rem] m-10">

        <div>
          <button onClick={testeEsquecerSenha} className="bg-[#ffffff] text-black-900 text-lg hover:bg-blue-gray-300 px-4 py-2 rounded-md">Esqueceu</button>
        </div>


      </div>
    </div>
  );
};
