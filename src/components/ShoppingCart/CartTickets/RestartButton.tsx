'use client'
import {useShoppingCart } from "@/contexts/ShoppingCartContext"
import {Button} from '@/components/ClientSide'

export default function RestartButton(){
    const {restartCart} = useShoppingCart();
    return(
        <div>
            <Button onClick={()=> restartCart()}>Reiniciar carrinho</Button>
        </div>
    )
}