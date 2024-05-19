import React from "react";
import { Stepper, Step, Button, Typography } from "../../ClientSide";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
  MapIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import PersonalForm from "../PersonalForm";
import AdressForm from "../AdressForm";
import AcessForm from "../AcessForm";
import UseStepperContext from "../../../use/UseStepperContext";
import RegistrationFinish from "../RegistrationFinish";
import CompanyForm from "@/components/PromoterRegistration/CompanyForm";
 

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <PersonalForm />;
    case 1:
      return <AdressForm />;
    case 2:
      return <AcessForm />;
    case 3:
      return <RegistrationFinish />;
    default:
      throw new Error('Unknown step');
  }
}

export default function RegistrationSteps() {
  const { infoStepper} = UseStepperContext();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full px-16 h-[75px] mt-6">
        <Stepper
          activeStep={infoStepper.activeStep}
          activeLineClassName="bg-[#404c76]"
        >
          <Step activeClassName="bg-[#404c76] ring-[#404c76]/50" completedClassName="bg-[#404c76]">
            <UserIcon className="h-5 w-5"/>
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                className = {infoStepper.activeStep >= 0 ? "md:text-[#404c76] text-transparent" : "md:text-[#B0BEC5] text-transparent"}
              >
                Dados Pessoais
              </Typography>
            </div>
          </Step>
          <Step activeClassName="bg-[#404c76] ring-[#404c76]/50" completedClassName="bg-[#404c76]">
            <MapIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                className = {infoStepper.activeStep >= 1 ? "md:text-[#404c76] text-transparent" : "md:text-[#B0BEC5] text-transparent"}
              >
                Endereço
              </Typography>
            </div>
          </Step>
          <Step activeClassName="bg-[#404c76] ring-[#404c76]/50" completedClassName="bg-[#404c76]">
            <ShieldCheckIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                className = {infoStepper.activeStep >= 2 ? "md:text-[#404c76] text-transparent" : "md:text-[#B0BEC5] text-transparent"}
              >
                Dados de Acesso
              </Typography>
            </div>
          </Step>
        </Stepper>
      </div>
      {getStepContent(infoStepper.activeStep)}
    </div>
  );
}

function makeStyles(arg0: () => { root: { "& .MuiStepIcon-active": { color: string; }; "& .MuiStepIcon-completed": { color: string; }; "& .Mui-disabled .MuiStepIcon-root": { color: string; }; }; }) {
  throw new Error("Function not implemented.");
}
