'use client'
import { useSession } from "next-auth/react";
import React from "react"

export default function testes() {
  const {data: session} = useSession()
  if (session && session.user.role === "cliente"){
    console.log(session.user.role)
    return (
      
      <div className="pt-[110px] pb-5 bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200">
        <div className="flex flex-col lg:flex-row-reverse lg:gap-3 lg:justify-center lg:items-start items-center w-[98vw] min-h-[8rem] m-10">
          <div className="mt-3">
              <p>TU É CLIENTE</p>
          </div>
        </div>
      </div>
    )
  }
  else if (session && session.user.role !== "cliente"){
    return (
      
      <div className="pt-[110px] pb-5 bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200">
        <div className="flex flex-col lg:flex-row-reverse lg:gap-3 lg:justify-center lg:items-start items-center w-[98vw] min-h-[8rem] m-10">
          <div className="mt-3">
              <p>TU NÃO É CLIENTE</p>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      
      <div className="pt-[110px] pb-5 bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200">
        <div className="flex flex-col lg:flex-row-reverse lg:gap-3 lg:justify-center lg:items-start items-center w-[98vw] min-h-[8rem] m-10">
          <div className="mt-3">
              <p>TU NÃO TA LOGADO</p>
          </div>
        </div>
      </div>
    )
  }
  
};