
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "../../ClientSide";
  import Link from 'next/link';
  import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
   
  export default function EventCard(props: any) {
    return (
      <Card className="flex-row m-[5px] h-[128px] md:h-[185px]">
        <CardHeader shadow={false} floated={false} className="w-2/5 h-w shrink-0 m-0 rounded-r-none">
          <img 

            src= {props.imagem} 
            alt="image" 
            className="w-full h-full object-cover"
          />
        </CardHeader>

        <CardBody className="flex flex-col w-full p-1">
          <h6 color="[#404C76]" className="font-semibold text-center text-[16px] md:text-[24px] lg:text-[28px] uppercase overflow-hidden">{props.children}</h6>
          
          <div className="flex flex-col">
            <div color="gray" className="flex flex-col ml-4 mb-3 justify-center font-bold text-[14px] md:text-[18px]">
              <div className="flex">
                <img src="/icons/fi-br-calendar.png" className="mr-1 mb-1 h-[14px] md:h-[24px] lg:h-[28px] w-h" />
                {props.data}
              </div>
              <div className="flex">
                <img src="/icons/fi-br-location-alt.png" className="mr-1 mb-1 h-[14px] md:h-[24px] lg:h-[28px] w-h"/>
                {props.local}
              </div>
            </div>

            <div className="flex h-full justify-center items-center mx-auto">
              
              <Link href= {`/event-details/${props.id}`}>
                <Button className="bg-purple-800 h-[40px] w-[130px] mt-auto p-0">
                  Ver detalhes
                </Button>
              </Link>
            </div>
          </div>

        </CardBody>
      </Card>
    );
  }