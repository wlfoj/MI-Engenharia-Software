import CardPrecoTotal from "../cardIngressoPreco"

export default function CardPreco(){ 
    return(
        <div className="container mx-auto">
            <div className ="bg-white overflow-y-auto overflow-x-hidden sm:h-36 md:w-64  h-52 lg:h-52 w-96 rounded-lg ">
                <h6 className="font-semibold px-2">Resumo Ingressos</h6>


                <CardPrecoTotal/>


            </div>
            
        </div>
    )
}