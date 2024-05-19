import {Card, CardHeader, CardBody, Typography, Button} from "@/components/ClientSide";
import Link from "next/link";

type Props = {
    imagemEvento: string,
    nomeEvento: string,
    dataEvento: string,
    localEvento: string,
    evento: number
}


const EditarStatusEv = {
  tipo: 'trocar status',
  novoDado: 'suspenso',
  idDoEvento: 1
}



export default function CardEventoAdm({imagemEvento, nomeEvento, dataEvento, localEvento, evento}: Props) {
  async function CallChangeStats(){
    const jaison = JSON.stringify({
    tipo: EditarStatusEv.tipo,
    novoDado: EditarStatusEv.novoDado,
    idDoEvento: evento
    })
    
    const res = await fetch("/api/evento", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: jaison
    })
    
    if (res.ok) {
        const data = await res.json()
        console.log(JSON.stringify(data)) 
        console.log("AQUII:", res)
    } else {
      console.log("DEU BO")
        }
      }

  return (

    <Card className="mt-0 w-[320px] h-[288px] shadow-black/40 col-span-12 md:col-span-6 xl:col-span-4"> 
      <CardHeader floated={false} color="blue-gray" className="relative h-60 mx-0 mt-0">
        <Link href={`/event-details/${evento}`}><img src={imagemEvento} alt="img-blur-shadow" className="object-fill h-full w-full"/></Link>
      </CardHeader>
      <CardBody className="p-5 pt-4 pb-2">
        <Typography variant="h5" color="blue-gray" className="mb-1 truncate font-semibold text-base">
          {nomeEvento} {/* nomeEvento */} 
        </Typography>
        <Typography className="text-xs">
            {dataEvento} {/* dataEvento */}
        </Typography>
        <Typography className="text-xs">
          {localEvento}  {/* localEvento */} 
        </Typography>
        <hr className="my-1 border-blue-gray-50" />
        <div className="flex flex-row gap-2">
        <Button type='submit' className="bg-roxo-wil m-auto flex gap-y-4 rounded-full p-2" onClick={CallChangeStats}>
          Suspender Evento
          </Button>
        <Button type="submit"  className="bg-roxo-wil m-auto flex gap-y-4 rounded-full p-2">
          Excluir Evento
        </Button> 
        </div>
      </CardBody>
    </Card>
    
  );
}

