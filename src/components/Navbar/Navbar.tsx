"use client"
import Container from './Container'
import Select from './SelectContainer';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { IconButton, Badge } from '../ClientSide';
import { BellIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import NavList from './Adm/NavListADM';
import NoLoginMenu from './NoLoginMenu';
import SinginButton from '../SinginButton';
import { ProfileMenu } from './ProfileMenu';
import Logo from './Logo';
import Search from './Search';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ProfileMenuPromoter from './Promoter/ProfileMenuPromoter';



/* Deixando isso aqui só pra não quebrar o codigo por agora*/
type Props = {
    navbarType: string
}

const Navbar = ({ navbarType }: Props) => {
    const { data: session } = useSession();
    /*Pfv usar UseEffect ou outra coisa pois o codigo abaixo foi escrito por Pedro, ou seja, está errado. */
    if (session && session.user) {
        if (session.user.role === 'cliente') {

            return (
                <div className='w-full top-0 fixed bg-white z-50 shadow-sm rounded-b-lg'>
                    <div className='p-1 border-b-[2px] rounded-b-lg'>
                        <div className="2xl:px-[3rem] flex flex-row items-center justify-between gap-0 md:gap-1">
                            <Link href={'/'} className='flex items-center justify-center'><Logo /></Link>
                            <Search />
                            <div>
                                <div className='gap-0.5 md:gap-5 flex flex-row justify-center items-center'>
                                    <div>
                                        <Link href={'/cliente/shoppingCart'}>
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                className="ml-0 mr-2">
                                                <ShoppingCartIcon className="h-6 w-6 sm:h-8 md:w-8" />
                                            </IconButton>
                                        </Link>
                                    </div>

                                    <ProfileMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (session.user.role === 'promoter') {
            return (
                <div className='w-full top-0 fixed bg-white z-50 shadow-sm rounded-b-lg'>
                    <div className='p-1 border-b-[2px] rounded-b-lg'>
                        <div className="2xl:px-[3rem]  flex flex-row items-center justify-between gap-0.5 md:gap-1">
                            <Link href={'/promoter/eventos'} className='flex items-center justify-center'><Logo /></Link>
                            <div>
                                <div className='gap-0.5 md:gap-5 flex flex-row justify-center items-center'>
                                    <div>
                                        <a href='/promoter/eventos'><button className="bg-[#ffffff] text-light-blue-900 text-lg hover:bg-blue-gray-300 px-4 py-2 rounded-md">Meus eventos</button></a>
                                        <a href='/events/event-registration'><button className="bg-[#ffffff] text-light-blue-900 text-lg hover:bg-blue-gray-300 px-4 py-2 rounded-md">Criar evento</button></a>
                                    </div>
                                    <ProfileMenuPromoter />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (session.user.role === 'administrador') {
            return (
                <div className='w-full top-0 fixed bg-white z-50 shadow-sm rounded-b-lg'>
                    <div className='p-1 border-b-[2px] rounded-b-lg'>
                        <div className="lg:px-[20px] flex flex-row items-center justify-between gap-0.5 md:gap-1">
                            <Link href={'/administrador/eventos'}><Logo /></Link>
                            <NavList />
                            <div className=' md:gap-5 flex flex-row justify-center items-center'>
                                <div>
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                        className="ml-0 mr-2">
                                            <Badge>
                                                <BellIcon className="h-8 w-8" />
                                            </Badge>
                                    </IconButton>
                                </div>
                                <div className="w-[100px]">
                                    <ProfileMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    return (

        <div className='w-full top-0 fixed bg-white z-50 shadow-sm rounded-b-lg'>
            <div className='p-1 border-b-[2px] rounded-b-lg'>
                <div className=" flex flex-row items-center justify-between gap-3 md:gap-1">
                    <Link href={'/'}><Logo /></Link>
                    <Search />
                    <NoLoginMenu></NoLoginMenu>
                    <Link href={'/auth/promoter-registration'} className='md:flex items-center justify-center hidden'> <button className="bg-[#ffffff] text-light-blue-900 text-md hover:bg-blue-gray-300 px-4 py-2 rounded-md">Seja um promoter</button> </Link>
                    <Link href={'/auth/customer-registration'} className='md:flex items-center justify-center hidden'><button className="bg-[#ffffff] text-light-blue-900 text-md hover:bg-blue-gray-300 px-4 py-2 rounded-md">Cadastre-se</button> </Link>
                    <SinginButton />
                </div>
            </div>
        </div>
    )

}

/* Funcionamento da navbar com Select /*

/* const Navbar = ({navbarType}: Props) => {
    return(
        <div className='w-full fixed bg-white z-50 shadow-sm rounded-b-lg'>
             <div className='py-4 border-b-[2px] rounded-b-lg'>
                <Container>
                    <Select  navbarType={navbarType}/>
                </Container>
             </div>
        </div>
    )
}

 */

export default Navbar;
