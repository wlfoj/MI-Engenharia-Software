import { useContext } from "react";
import { PromoterRegistrationContext } from "../contexts/PromoterRegistrationContext";

export default function UsePromoterRegistrationContext() {
  const { infoCompanyForm, setInfoCompanyForm, infoAdressForm, setInfoAdressForm,infoAcessForm, setInfoAcessForm } = useContext(PromoterRegistrationContext);
  return { infoCompanyForm, setInfoCompanyForm, infoAdressForm, setInfoAdressForm,infoAcessForm, setInfoAcessForm };
}
