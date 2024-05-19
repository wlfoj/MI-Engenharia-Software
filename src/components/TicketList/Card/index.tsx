import {Card, CardHeader, CardBody, Typography} from "@/components/ClientSide";
import { ClockIcon, InformationCircleIcon, MapIcon, MapPinIcon, PrinterIcon } from "@heroicons/react/24/outline";

type Props = {
    imagemEvento: string,
    nomeEvento: string,
    dataEvento: string,
    localEvento: string,
    evento: string
}
 
export default function CardEventoAdm({imagemEvento, nomeEvento, dataEvento, localEvento, evento}: Props) {
  return (
    <Card className="mt-0 w-[320px] h-[288px] shadow-black/40 col-span-12 md:col-span-6 xl:col-span-4 "> 
      <CardHeader floated={false} color="blue-gray" className="relative h-60 mx-0 mt-0">
        <a href={evento}><img src={imagemEvento} alt="img-blur-shadow" className="object-fill h-full w-full"/></a>
      </CardHeader>
      <CardBody className="p-5 pt-4 pb-2">
        <Typography variant="h5" color="blue-gray" className="mb-1 truncate font-semibold text-base">
          {nomeEvento} {/* nomeEvento */} 
        </Typography>
        <hr className="border-[#dadada] border-1 py-2"/>
        <Typography className="flex text-xs">
          <ClockIcon className="w-4 h-4 -mt-px" />
          {dataEvento} {/* dataEvento */}
        </Typography>
        <Typography className="flex text-xs">
          <MapPinIcon className="w-4 h-4 -mt-px" />
          {localEvento}  {/* localEvento */} 
        </Typography>
        <hr className="border-[#dadada] border-1 py-2"/>
        <Typography className="flex text-xs">
          <PrinterIcon className="w-4 h-4 -mt-px" />
          Imprimir
        </Typography>
      </CardBody>
    </Card>
  );
}