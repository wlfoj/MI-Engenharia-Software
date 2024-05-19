'use client'
import { Button } from '@/components/ClientSide';
import { useShoppingCart } from "@/contexts/ShoppingCartContext"
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Alert } from '@material-tailwind/react';
import { useState } from 'react';

export default function CartButton(){

    const [openAlert, setOpenAlert] = useState(false);
    const {addToCart} = useShoppingCart()


    const buttonAction = () => {
        addToCart();
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
    }


    return(
        <div>
            <Button type="submit" onClick={() => buttonAction()} className="bg-roxo-wil m-auto flex gap-3 rounded-full p-2">
                Adicionar ao carrinho
            </Button> 

             <Alert
                open={openAlert}
                color="green"
                className="absolute max-w-fit mt-2"
                icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
            >
            <p className="font-normal">
                Ingressos adicionados ao carrinho
            </p>
            </Alert>
            
        </div>
    )
}