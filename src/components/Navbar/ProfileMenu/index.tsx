'use client';
import React, {useState , useEffect} from "react";

import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "../../ClientSide";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  PowerIcon,
  HomeIcon,
  BanknotesIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CldImage } from 'next-cloudinary';




const profileMenuItems = [

  {
    label: "Pagina inicial",
    icon: HomeIcon,
    href: '/'
  },
  {
    label: "Meu Perfil",
    icon: UserCircleIcon,
    href: '/profile/costumer',
  },
  {
    label: "Meus Ingressos",
    icon: TicketIcon,
    href: '/profile/costumer/ticket-list',
  },
  {
    label: "Histórico",
    icon: InboxArrowDownIcon,
    href: '#',
  },
  {
    label: "Mudar Senha",
    icon: Cog6ToothIcon,
    href: '/profile/changepassword',
  },

];

interface Data {
  id: number;
  perfil_foto: string | null;
  cpf: string;
  data_nasc: string;
  id_usuario: number;
  id_cartao: number;
  id_endereco: number;
  telefone: string;
  endereco: {
    id: number;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    complemento: string;
  };
  usuario: {
    id: number;
    nome: string;
    email: string;
    senha: string;
  };
  cartao: {
    id: number;
    num_cartao: string;
    dono_cartao: string;
    data_vencimento: string;
    cvv: string;
  };
  compras: any[];
}

export function ProfileMenu() {
  const { data: session } = useSession();



  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const [data, setData] = useState<Data | null>(null);

  console.log(session)
  const cpf = session?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof cpf === 'undefined') {
          // Se o cpf for undefined, aguarde 1 segundo e chame a função novamente
          setTimeout(fetchData, 1000);
          return;
        }
        const response = await fetch(`/api/cliente/${cpf}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [cpf,data?.perfil_foto]);

  if (session && session.user && session.user.email) {
    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className=" flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <div className="flex items-center justify-center overflow-hidden h-12 w-12 rounded-full">
              <CldImage className='rounded-full' width="200" height="200" src={data?.perfil_foto ? `${data?.perfil_foto}` : "placeholder_y6fumc"} alt="teste" />
            </div>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                }`}
            />
          </Button>
        </MenuHandler>

        <MenuList className="p-1">
          <div className="border-transparent p-2.5 cursor-pointer w-full bg-[#404C76] flex justify-center gap-2 rounded">

            <Typography
              as="span"
              variant="h5"
              className="font-normal"
              color="black"
            >
              {session.user.name}
            </Typography>
          </div>
          {profileMenuItems.map(({ label, icon, href }, key) => {
            return (
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded`}
              >
                <Link href={href} className='flex flex-row gap-2'>
                  {React.createElement(icon, {
                    className: `h-6 w-6`,
                    strokeWidth: 2,
                  })}
                  <Typography
                    as="span"
                    variant="h5"
                    className="font-normal"
                    color={"inherit"}
                  >
                    {label}
                  </Typography>
                </Link>
              </MenuItem>
            );
          })}

          <MenuItem onClick={() => { signOut({ callbackUrl: '/' }); }} className='border-transparent p-2.5 cursor-pointer w-full bg-white flex gap-2 rounded hover:bg-red-500'>
            {React.createElement(PowerIcon, {
              className: `h-6 w-6 text-red-500`,
            })}
            <Typography
              as="span"
              variant="h5"
              className="font-normal"
              color="red"
            >
              Sair
            </Typography>
          </MenuItem>

        </MenuList>
      </Menu>
    );
  }
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5"
        >
          <Avatar
            variant="circular"
            size="lg"
            alt="Profile"
            className="border border-blue-500 p-0.5"
            src="/img/profile/placeholder.jpg" />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem>
          {React.createElement(BanknotesIcon, {
            className: `h-6 w-6 `,
          })}
          <Typography
            as="span"
            variant="h5"
            className="font-normal"
            color="red"
          >
            {session && session.user ? "Name" : 'Carregando...'}
          </Typography>
        </MenuItem>
        {profileMenuItems.map(({ label, icon, href }, key) => {
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded`}
            >
              <Link href={href} className='flex flex-row gap-2'>
                {React.createElement(icon, {
                  className: `h-6 w-6`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="h5"
                  className="font-normal"
                  color={"inherit"}
                >
                  {label}
                </Typography>
              </Link>
            </MenuItem>
          );
        })}

        <MenuItem onClick={() => { signOut({ callbackUrl: '/' }); }} className='border-transparent p-2.5 cursor-pointer w-full bg-white flex gap-2 rounded hover:bg-red-500'>
          {React.createElement(PowerIcon, {
            className: `h-6 w-6 text-red-500`,
          })}
          <Typography
            as="span"
            variant="h5"
            className="font-normal"
            color="red"
          >
            Sair
          </Typography>
        </MenuItem>

      </MenuList>
    </Menu>
  );
}
