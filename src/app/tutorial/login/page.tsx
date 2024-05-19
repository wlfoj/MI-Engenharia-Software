"use client"
import SinginButton from "@/components/SinginButton";
import { useSession } from "next-auth/react";
import React, { useState } from "react"
import { Usuario } from "../../../../lib/usuario";

const puxarApi = async (email: string) => {
  const res = await fetch(`http://localhost:3000/api/usuario/${email}`)
  const data = await res.json()
  return data
}

export default async function testes() {
  const {data: session} = useSession()
  if (session && session.user.email){
    const data: Usuario = await puxarApi(session.user.email)
    if (data !== null){
      console.log("ASDASDASDASDASDASDASDASDASD: ", data.nome)
      return (

        <div className="pt-[110px] pb-5 bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200">
          <div className="flex flex-col lg:flex-row-reverse lg:gap-3 lg:justify-center lg:items-start items-center w-[98vw] min-h-[8rem] m-10">
            <div className="mt-3">
                <p>ASDASD</p>
                <p className="w-[100rem] h-[100rem]">{data.nome}</p>
                 <p>ASDASD</p>
            </div>
          </div>
        </div>
      );
    }

  }
  return (

    <div className="pt-[110px] pb-5 bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200">
      <div className="flex flex-col lg:flex-row-reverse lg:gap-3 lg:justify-center lg:items-start items-center w-[98vw] min-h-[8rem] m-10">
        <div className="mt-3">
            <p>ASDASD</p>
             <p>ASDASD</p>
        </div>
      </div>
    </div>
  );
};