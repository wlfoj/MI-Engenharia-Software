import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { Lotacao } from "@prisma/client"; 

function lotacoesDoSetor(listaLotacoes: any, idDoSetor: number) {
    return listaLotacoes.filter((lotacao: any) => {
        return lotacao.id_setor === idDoSetor
    })
}


export default function Preco(props: any){

    const { cartItems } = useShoppingCart()
    
    let setores: number[] = []
    setores = props.lotacoes?.reduce((resultado: number[], lot: Lotacao) => {
        if (!resultado?.includes(lot.id_setor)) {
            resultado?.push(lot.id_setor);
        }
        return resultado;
    }, [])

    const valorTotal = setores?.reduce((total, id) => {
        const lotacoes = lotacoesDoSetor(props.lotacoes, id);
        return total + lotacoes.reduce((valor: any, lot: any) => {
            return valor + ((cartItems.find((it) => it.id === lot.id)?.quantidade || 0) * lot.valorTotal)
        }, 0)
    }, 0) 

    return(
        <p className="p className=font-sans text-[8px] sm:px-64 md:px-32 ">{(valorTotal)?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
    )
}