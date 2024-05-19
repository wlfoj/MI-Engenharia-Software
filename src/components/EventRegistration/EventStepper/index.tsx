
import React from "react";
import { Stepper, Step, Typography } from "../../ClientSide";
import {
  PhotoIcon,
  NewspaperIcon,
  MapIcon,
  CalendarDaysIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import AdressForm from "../AdressForm";
import BasicinformationForm from "../BasicInformationForm";
import DescriptionForm from "../DescriptionForm";
import DateForm from "../DateForm";
import TicketForm from "../TicketForm"
import UseStepperContext from "../../../use/UseStepperContext";
import RegistrationFinish from "../RegistrationFinish";

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AdressForm />;
    case 1:
      return <BasicinformationForm />;
    case 2:
      return <DescriptionForm />;
    case 3:
        return <DateForm />;
    case 4:
        return <TicketForm />;
    case 5:
      return <RegistrationFinish />;
    default:
      throw new Error('Unknown step');
  }
}

export default function RegistrationSteps() {
  const { infoStepper} = UseStepperContext();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full px-14 h-[75px] mt-6">
        <Stepper
          activeStep={infoStepper.activeStep}
          activeLineClassName="bg-[#404c76]"
        >
          <Step activeClassName="bg-[#404c76] ring-[#404c76]/50" completedClassName="bg-[#404c76]">
            <MapIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                className = {infoStepper.activeStep >= 0 ? "text-[#404c76]" : "text-[#B0BEC5]"}
              >
                Localização
              </Typography>
            </div>
          </Step>
          <Step activeClassName="bg-[#404c76] ring-[#404c76]/50" completedClassName="bg-[#404c76]">
            <PhotoIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                className = {infoStepper.activeStep >= 1 ? "text-[#404c76]" : "text-[#B0BEC5]"}
              >
                Informações básicas
              </Typography>
            </div>
          </Step>
          <Step activeClassName="bg-[#404c76] ring-[#404c76]/50" completedClassName="bg-[#404c76]">
            <NewspaperIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                className = {infoStepper.activeStep >= 2 ? "text-[#404c76]" : "text-[#B0BEC5]"}
              >
                Descrição
              </Typography>
            </div>
          </Step>
          <Step activeClassName="bg-[#404c76] ring-[#404c76]/50" completedClassName="bg-[#404c76]">
            <CalendarDaysIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                className = {infoStepper.activeStep >= 3 ? "text-[#404c76]" : "text-[#B0BEC5]"}
              >
                Data e horário
              </Typography>
            </div>
          </Step>
          <Step activeClassName="bg-[#404c76] ring-[#404c76]/50" completedClassName="bg-[#404c76]">
            <TicketIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                className = {infoStepper.activeStep >= 4 ? "text-[#404c76]" : "text-[#B0BEC5]"}
              >
                Ingressos
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
