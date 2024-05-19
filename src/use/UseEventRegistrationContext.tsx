import { useContext } from "react";
import { EventRegistrationContext } from "../contexts/EventRegistrationContext";

export default function UseEventRegistrationContext() {
  const { infoAdressForm, setInfoAdressForm, infoBasicInformationForm, setInfoBasicInformationForm, infoDescriptionForm, setInfoDescriptionForm, infoDateForm, setInfoDateForm, infoTicketForm, setInfoTicketForm } = useContext(EventRegistrationContext);
  return { infoAdressForm, setInfoAdressForm, infoBasicInformationForm, setInfoBasicInformationForm, infoDescriptionForm, setInfoDescriptionForm, infoDateForm, setInfoDateForm, infoTicketForm, setInfoTicketForm };
}
