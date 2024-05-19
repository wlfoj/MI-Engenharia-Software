import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button, 
} from "../ClientSide";

import Link from "next/link";
 

type Props = {
  imagem: string,
  nome: string,
  data: string,
  local: string,
  evento: number
} 


export default function CardEventoPromoter({imagem, nome, data, local, evento}: Props ) {
  return (
    <Card className="mt-0 w-[320px] h-[288px] shadow-black/40 col-span-12 md:col-span-6 xl:col-span-4"> 
      <CardHeader floated={false} color="blue-gray" className="relative h-60 mx-0 mt-0">
        <img src={imagem} alt="img-blur-shadow" className="object-fill h-full w-full"/>
      </CardHeader>
      <CardBody className="p-5 pt-4 pb-2">
        <Typography variant="h5" color="blue-gray" className="mb-1 truncate font-semibold text-base">
          {nome} {/* nomeEvento */} 
        </Typography>
        <Typography className="text-xs">
            {data} {/* dataEvento */}
        </Typography>
        <Typography className="text-xs">
          {local}  {/* localEvento */} 
        </Typography> 
        <Button className="bg-roxo-wil font-sans h-[40px] w-[130px] mt-auto p-0">
          Editar 
        </Button>
      </CardBody>
    </Card>
  );
}

