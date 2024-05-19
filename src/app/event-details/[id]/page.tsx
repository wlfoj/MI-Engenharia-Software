import { MdCalendarMonth } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ImClock } from "react-icons/im";
import Footer from "@/components/Footer";
import Tickets from '@/components/EventDetails/Tickets';
import moment from "moment";
import 'moment/locale/pt-br';
import ShareButton from "@/components/EventDetails/ShareButton";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
import CartButton from "@/components/EventDetails/CartButton";


moment.locale('pt-br')


async function loadEvent(id: Number) {
    const res = await fetch(`https://backend-wilbortick.vercel.app/api/evento/${id}`, { 
            next: {
                revalidate: 3600 // Atualiza o cache a cada 1h
            } 
        }); 

    return res.json();
}

export default async function Event({params}: {params: { id: number }}) {
   const evento = await loadEvent(params.id);
   const endereco = evento?.endereco;
   const weekDay = moment(evento?.horaInicio).format("dddd");
    return (
        <ShoppingCartProvider>
            <div>
                <div className='flex justify-center'>
                    <img 
                        className='mt-32 w-[95%] lg:h-[500px] m-5 items-center max-w-full h-auto object-fit rounded-lg'
                        src= {evento?.banner}
                        alt='Imagem do evento'
                    />
                </div>

                <div className='mb-10 shadow-2xl mr-6 ml-6 flex-row rounded-lg bg-gray-100 p-10'>
                    <div className='flex flex-col items-center'>
                        <h1 className="text-2xl font-bold m-6">
                            {evento?.nome}
                        </h1>
                        <ShareButton/>
                    </div>

                    <div className="items-center text-sm">
                        <div className="flex flex-wrap mt-8"><MdCalendarMonth className="fill-roxo-wil" size={'1rem'}/>
                        <h3 className="font-semibold ml-2 mr-16 text-blue-gray-900">
                            {weekDay.charAt(0).toUpperCase() + weekDay.slice(1)}, {moment(evento?.horaInicio).format("L")}
                        </h3>
                        </div>
                        <div className="flex flex-wrap mt-5"><ImClock className="fill-roxo-wil" size={'1rem'}/>
                        <h3 className="font-semibold ml-2 mr-5 text-blue-gray-900">
                            {moment(evento?.horaInicio).format("HH:mm")} - {moment(evento?.horaFim).format("HH:mm")}
                        </h3>
                        </div>
                    </div>

                    <div className="flex flex-shrink mt-5 text-sm">
                        <div className="flex flex-wrap"><FaMapMarkerAlt className="fill-roxo-wil" size={'1.2rem'}/></div>
                        <h3 className="font-semibold ml-2 mr-5 text-blue-gray-900">
                            {`${endereco?.rua}, ${endereco?.numero}, ${endereco?.bairro}, ${endereco?.cidade} - ${endereco?.estado}`}
                        </h3>
                    </div>

                    <h2 className='font-bold mt-16 text-blue-gray-900'>Descrição</h2>
                    <div className='lg:flex lg:gap-10 grid mt-2 text-justify justify-between'>

                        <div className='lg:w-[50%] mb-10'>
                            <h3 className='text-blue-gray-900 text-sm'> 
                                {evento?.descricao}
                            </h3> 
                        </div>

                        <div className='shadow-2xl text-center gap-20 grid-cols-3 bg-gray-300 rounded-lg p-3'>

                            {evento?.lotacao.map((lot: any) => (
                                <Tickets key={lot.id}
                                    idLotacao={lot.id}
                                    setor={lot.setor.nome}
                                    perfil={lot.perfil.nome}
                                    valor={lot.valorTotal}
                                    qtdIngressos={lot.quantidade}
                                />
                            ))}

                            <CartButton/>
                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
        </ShoppingCartProvider>
    )
}