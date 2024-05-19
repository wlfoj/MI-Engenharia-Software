"use client";
import React from "react";
import ProfileMenuPromoter from "../ProfileMenuPromoter"; 
import Logo from "../../Logo"; 
import NavListPromoter from "../NavListPromoter";

import {
    Navbar,
  IconButton, 
  MobileNav
} from "../../../ClientSide";
import {
  Bars2Icon,
} from "../../../ClientSide";
 
export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Logo/>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavListPromoter />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenuPromoter />
        </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavListPromoter />
      </MobileNav>
    </Navbar>
  );
}