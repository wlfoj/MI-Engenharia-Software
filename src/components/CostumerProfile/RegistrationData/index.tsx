import React from "react";
import { Typography, Avatar } from "../../ClientSide";
import { CldImage } from 'next-cloudinary';
import FileUploader from "../../nuvem";

type Props = {
    cType: any
}


export default function RegistrationData({ cType }: Props) {

    

    return (
        <div className="flex flex-col  w-full items-center justify-center md:min-h-[50rem] gap-4 ">
            <div className="bg-white flex flex-col w-[100%] md:w-[50%] h-[30rem]  items-center justify-center gap-4 overflow-auto rounded-lg">
            <div className="flex items-center justify-center overflow-hidden h-36 w-36 rounded-full cursor-pointer">
              <CldImage  width="1800" height="1800" src={cType?.perfil_foto ? `${cType?.perfil_foto}` : "placeholder_y6fumc"} alt="teste" />
              
            </div>
            <FileUploader/>
                <div className="flex flex-col gap-1">
                    <Typography className="text-base font-semibold text-center sm:text-lg">Nome: {cType?.usuario?.nome}</Typography>
                    <Typography className="text-base font-semibold text-center sm:text-lg">CPF: {cType?.cpf.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1.***.***-$4")}</Typography>
                    <Typography className="text-base font-semibold text-center sm:text-lg">Email: {cType?.usuario?.email}</Typography>
                    <Typography className="text-base font-semibold text-center sm:text-lg">Data de Nasc.: { cType?.data_nasc.replace(/^(\d{4})-(\d{2})-(\d{2}).*/, '$3/$2/$1')}</Typography>
                    <Typography className="text-base font-semibold text-center sm:text-lg">Telefone: {cType?.telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3')}</Typography>
                </div>
            </div>
        </div>
    )
}