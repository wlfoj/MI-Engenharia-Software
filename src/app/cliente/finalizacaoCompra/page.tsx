import CardCartao from "@/components/FinalizacaoCompra/cardCartao/cardBackGround"
import CardIngresso from "@/components/FinalizacaoCompra/cardIngressos/cardBackGround"
import CardPreco from "@/components/FinalizacaoCompra/cardPrecos/cardBackGround"
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext"

export default function finalizacaoCompra() {
    return (

        <div className="flex items-center justify-center h-full w-full container mx-auto py-28 ">
            <div className="grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-8  lg:grid-cols-8  ">
                <div className="col-span-4 row-span-4 sm:h-52 md:w-72 h-full lg:h-96 w-96 rounded-lg ">
                    <ShoppingCartProvider>
                        <CardIngresso />
                    </ShoppingCartProvider>
                </div>
                <div className="col-span-4 row-span-2 sm:h-28 md:w-64 h-40 lg:h-40 w-full rounded-lg ">
                    <CardCartao />
                </div>
                <div className="col-span-4  row-span-2 sm:h-36 md:w-64 h-52 lg:h-52 w-full rounded-lg ">
                    <ShoppingCartProvider>
                        <CardPreco />
                    </ShoppingCartProvider>
                </div>

            </div>
        </div>

    )
}