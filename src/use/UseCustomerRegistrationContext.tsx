import { useContext } from "react";
import { CustomerRegistrationContext } from "../contexts/CustomerRegistrationContext";

export default function UseCustomerRegistrationContext() {
  const { infoPersonalForm, setInfoPersonalForm, infoAdressForm, setInfoAdressForm,infoAcessForm, setInfoAcessForm } = useContext(CustomerRegistrationContext);
  return { infoPersonalForm, setInfoPersonalForm, infoAdressForm, setInfoAdressForm,infoAcessForm, setInfoAcessForm };
}
