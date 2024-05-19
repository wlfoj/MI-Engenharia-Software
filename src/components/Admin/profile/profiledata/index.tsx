import { Avatar, Typography } from "@material-tailwind/react"
import React from "react"

export default function AdminData() {

    const [userData] = React.useState({
        cpf: "955.XXX.XXX-69",
        nome: "Pedro",
        email: "pedro200@hotmail.com",
        senha: "pedropedro99",
        super_adm: "Sim"

    })


return (
    <div className="pt-2 bg-white flex flex-col items-center justify-center gap-4 overflow-auto rounded-lg">
        <Avatar className="cursor-pointer" src="/img/profile/placeholder.jpg" alt="avatar" size="xxl" />
        <div className="flex flex-col gap-1">
            <Typography className="text-base font-semibold text-center sm:text-lg">Nome: {userData.nome}</Typography>
            <Typography className="text-base font-semibold text-center sm:text-lg">CPF: {userData.cpf}</Typography>
            <Typography className="text-base font-semibold text-center sm:text-lg">Email: {userData.email}</Typography>
            <Typography className="text-base font-semibold text-center sm:text-lg">Super Administrador: {userData.super_adm}</Typography>
        </div>
    </div>
  )
}