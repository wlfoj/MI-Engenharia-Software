import TotalCart from "@/components/ShoppingCart/TotalCart"
import ListTickets from "@/components/ShoppingCart/ListTickets"
import { ShoppingCartProvider} from "@/contexts/ShoppingCartContext"
import RestartButton from "@/components/ShoppingCart/CartTickets/RestartButton"


export default function Cart() {
    
    return (
        <ShoppingCartProvider>
        <div className="pt-[110px] pb-5 bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200">
            <div className="flex flex-col lg:flex-row-reverse lg:gap-3 lg:justify-center lg:items-start items-center w-[98vw] min-h-[8rem] m-10">

                <div className="mt-3">
                    <TotalCart></TotalCart>
                </div>

                <div >
                    <div>
                        <ListTickets></ListTickets>
                    </div>
                </div>
            </div>
        </div>
        </ShoppingCartProvider>
    )
}