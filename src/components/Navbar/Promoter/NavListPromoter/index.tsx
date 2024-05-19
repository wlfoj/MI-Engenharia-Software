import React from "react";
import {
  Typography,
  MenuItem,
} from "../../../ClientSide";

const navListItems = [
    {
      label: "Eventos",
      href: '/eventosPromoter'
    },
    {
      label: "Novo Evento",
      href: '/event-registration'
    },
  ];
  
export default function NavListPromoter() {
    return (
      <ul className="mb-4 mt-2 flex flex-col gap-1 sm:gap-2 md:gap-4 lg:gap-10 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        {navListItems.map(({ label,href}, key) => (
          <Typography
            key={label}
            as="a"
            href={href}
            variant="small"
            color="blue-gray"
            className="font-semibold"
          >
            <MenuItem className="flex items-center gap-2 sm:text-basemd:text-xl lg:rounded-full">
              {label}
            </MenuItem>
          </Typography>
          
        ))}
      </ul>
    );
  }