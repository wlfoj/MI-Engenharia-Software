"use client";

import { ThemeProvider, Typography } from "@material-tailwind/react";
import { PromoterRegistrationContext } from "../../contexts/PromoterRegistrationContext";
import { StepperContext } from "../../contexts/StepperContext";
import React from "react";
import PromoteRegSteps from "./PromoterRegStepper";
 

export default function PromoterRegistration() {
  const [infoCompanyForm, setInfoCompanyForm] = React.useState({
    name: "",
    CPF: "",
    CNPJ: "",
    phone: "",
  })

  const [infoAdressForm, setInfoAdressForm] = React.useState({
    CEP: "",
      state: "",
      city: "",
      district: "",
      street: "",
      number: "",
      complement: "",
  })

  const [infoAcessForm, setInfoAcessForm] = React.useState({
    email: "",
    password: "",
  })

  const [infoStepper, setInfoStepper] = React.useState({
    activeStep: 0
  })


  return (
    <ThemeProvider>
      <StepperContext.Provider value={{ infoStepper, setInfoStepper }}>
        <PromoterRegistrationContext.Provider value={{ infoCompanyForm, setInfoCompanyForm, infoAdressForm, setInfoAdressForm,infoAcessForm, setInfoAcessForm}} >
          <div className="w-full h-[90%] flex justify-center p-4">
            <div className="flex flex-col items-center w-[500px] h-fit rounded-lg bg-gray-200">
              <Typography variant="h2" className="text-[#404c76] mt-6 ml-4">
                Seja um promoter!
              </Typography>
              <Typography variant="small" className="text-[#404c76] mb-4 ml-4">
                Cadastre-se no sistema para vender seus ingressos.
              </Typography>
              <PromoteRegSteps />  
            </div>
          </div>
        </PromoterRegistrationContext.Provider>
      </StepperContext.Provider>
    </ThemeProvider>
  );
}
