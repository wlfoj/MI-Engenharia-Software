"use client"
import FormSecurityData from "../../../components/Promoter/formSecurityData";
import FormPersonalData from "../../../components/Promoter/formPersonalData";
import {useState,useEffect} from "react";
import { useSession } from "next-auth/react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Typography,
  } from "../../../components/ClientSide";
import { Spinner } from "@material-tailwind/react";


enum lifepoint {
    LOADING,
    ERROR,
    READY,
}



export default function PromoterPage() {
    // Para controle do Tabs
    const [type, setType] = useState("personal");
    // Objeto com dados do promoter a serem passados
    const [dataPromoter, setDataPromoter] = useState<any | null>(null);
    // Controlando o status do ciclo de vida do componente
    const [statusComponent, setStatusComponent] = useState<lifepoint>(lifepoint.LOADING);


    const {data: session} = useSession();
    const cpfORcnpj = session?.user?.id;
	const email = session?.user.email;

    useEffect(() => {
        const fetchData = async () => {
            // Só chama a api se já tiver obtido os dados do cpf ou cnpj
            if (cpfORcnpj && email){
                try {
                    // const response2 = await fetch(`/api/promoter`);
                    // const jsonData2 = await response2.json();
                    // console.log(jsonData2)


                    const response = await fetch(`/api/promoter/${cpfORcnpj}`);
                    const jsonData = await response.json();
                    setDataPromoter(jsonData);
                    setStatusComponent(lifepoint.READY)
                  } catch (error) {
                    setStatusComponent(lifepoint.ERROR)
                  }
            }
        };
        fetchData();
      }, [cpfORcnpj]);

    return(
        <>
            {/** Se o componente estiver com todos os dados para exibição */}
            {statusComponent == lifepoint.READY &&  
                <div className='w-full h-full flex items-center justify-center'>  
                    <div  className='box-gray w-full h-[90%] md:h-[80%] md:w-[50%] gap-6 flex flex-col justify-center items-center overflow-auto bg-white rounded-xl mt-20 md:mt-36  mb-20'>
                        <Tabs value={type} >
                            <TabsHeader className="rounded-none border-b border-blue-gray-50 bg-transparent"
                            indicatorProps={{
                            className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-5 bg-blue-500/10 shadow-none text-blue-500",
                            }}>
                                <Tab value="personal" onClick={() => { setType("personal") }}>
                                    <Typography className="text-base font-bold" >Pessoal</Typography> 
                                </Tab>
                                <Tab value="security" onClick={() => { setType("security") }}>
                                    <Typography className="text-base font-bold" >Segurança</Typography> 
                                </Tab>
                            </TabsHeader>

                            <TabsBody>
                                <TabPanel className="h-full overflow-auto" value="personal">
                                    <FormPersonalData user={dataPromoter}/>
                                </TabPanel>
                                <TabPanel className="h-full overflow-auto" value="security">
                                    <FormSecurityData email={email}/>
                                </TabPanel>
                            </TabsBody>
                        </Tabs>
                    </div>
                </div>
            }

            {/** Se ainda estiver aguardando a resposta da api */}
            {statusComponent == lifepoint.LOADING && 
                <div className='w-[100vw] h-[100vh] flex items-center justify-center background-load'>
                    <div className="box-gray min-w-[300px] min-h-[300px] flex flex-col items-center justify-center">
                        <b><p className="mb-20 mx-auto">Carregando</p></b>
                        <Spinner className="h-24 w-24" />
                    </div>
                </div>   
            }

            {/** Se houver algum erro na api */}
            {statusComponent == lifepoint.ERROR && 
                <div className='w-[100vw] h-[100vh] flex items-center justify-center background-load'>
                    <div className="box-gray min-w-[300px] min-h-[300px] flex flex-col items-center justify-center">
                        <b><p className="mb-10 mx-auto">ERRO</p></b>
                        <p>Tivemos problemas, tente novamente mais tarde</p>
                    </div>
                </div>   
            }
        </>
    )
}