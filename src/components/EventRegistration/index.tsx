'use client'

import { Typography } from "@/components/ClientSide";
import { EventRegistrationContext } from "../../contexts/EventRegistrationContext";
import { StepperContext } from "../../contexts/StepperContext";
import React from "react";
import RegistrationSteps from "@/components/EventRegistration/EventStepper";
 

export default function EventRegistration() {
  const [infoAdressForm, setInfoAdressForm] = React.useState({
    placeName: "",
    CEP: "",
    state: "",
    city: "",
    district: "",
    street: "",
    number: "",
    complement: "",
  })

  const [infoBasicInformationForm, setInfoBasicInformationForm] = React.useState({
    name: "",
    image: "",
  })

  const [infoDescriptionForm, setInfoDescriptionForm] = React.useState({
    Description: "",
  })

  const [infoDateForm, setInfoDateForm] = React.useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  })

  const [infoTicketForm, setInfoTicketForm] = React.useState({
    sector: "",
    profile: "",
    amount: "",
    price: "",
  })
  

  const [infoStepper, setInfoStepper] = React.useState({
    activeStep: 0
  })


  return (
      <StepperContext.Provider value={{ infoStepper, setInfoStepper }}>
        <EventRegistrationContext.Provider value={{ infoAdressForm, setInfoAdressForm, infoBasicInformationForm, setInfoBasicInformationForm,infoDescriptionForm, setInfoDescriptionForm, infoDateForm, setInfoDateForm, infoTicketForm, setInfoTicketForm}} >
          <div className="w-300 h-[90%] flex justify-center container mx-auto py-28">
            <div className="flex flex-col items-center w-[1000px] h-fit rounded-lg bg-gray-200">
              <Typography variant="h2" className="text-[#404c76] mt-6">
                Criar Evento
              </Typography>
              <RegistrationSteps />  
            </div>
          </div>
        </EventRegistrationContext.Provider>
      </StepperContext.Provider>
  );
}
