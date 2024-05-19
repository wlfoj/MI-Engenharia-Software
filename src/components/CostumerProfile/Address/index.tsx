import { Button } from "../../ClientSide";
import Link from "next/link";



type Props = {
    cType: any
  }

  

export default function Addrress( {cType}: Props) {
    

    return (
        <div className="flex justify-center items-center md:min-h-[50rem] ">
            <div className="w-full h-full gap-1 flex flex-col justify-center items-center overflow-auto bg-white">
                <div className="w-[15rem] sm:w-[20rem] lg:w-[30rem]">
                    <label >CEP*:</label>
                    <div className="w-full bg-gray-200 p-2 rounded-xl">{cType?.endereco?.cep}</div>
                </div>
                <div className="w-[15rem] sm:w-[20rem] lg:w-[30rem]">
                    <label>Estado*:</label>
                    <div className="w-full bg-gray-200 p-2 rounded-xl">{cType?.endereco?.estado}</div>
                </div>
                <div className="w-[15rem] sm:w-[20rem] lg:w-[30rem]">
                    <label>Cidade*:</label>
                    <div className="w-full bg-gray-200 p-2 rounded-xl">{cType?.endereco?.cidade}</div>
                </div>
                <div className="w-[15rem] sm:w-[20rem] lg:w-[30rem]">
                    <label>Bairro*:</label>
                    <div className="w-full bg-gray-200 p-2 rounded-xl">{cType?.endereco?.bairro}</div>
                </div>
                <div className="w-[15rem] sm:w-[20rem] lg:w-[30rem]">
                    <label>Rua*:</label>
                    <div className="w-full bg-gray-200 p-2 rounded-xl">{cType?.endereco?.rua}</div>
                </div>
                <div className="w-[15rem] sm:w-[20rem] lg:w-[30rem]">
                    <label>Número*:</label>
                    <div className="w-full bg-gray-200 p-2 rounded-xl">{cType?.endereco?.numero}</div>
                </div>
                <div className="w-[15rem] sm:w-[20rem] lg:w-[30rem]">
                    <label>Complemento:</label>
                    <div className="w-full bg-gray-200 p-2 rounded-xl">{cType?.endereco?.complemento}</div>
                </div>
                <div className="flex items-center justify-center w-[15rem] h-[10rem] sm:w-[20rem] lg:w-[30rem] ">
                    <Link href='/editaddress'><Button> Editar </Button></Link>
                </div>
            </div>
        </div>
    );
}
