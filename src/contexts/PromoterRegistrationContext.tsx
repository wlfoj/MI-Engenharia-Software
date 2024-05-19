import {createContext} from "react";

interface PromoterRegistrationContextType {
  infoCompanyForm: { 
    name: string,
    CPF: string,
    CNPJ: string,
    phone: string,
  };
  infoAdressForm: {
    CEP: string,
    state: string,
    city: string,
    district: string,
    street: string,
    number: string,
    complement: string,
  }
  infoAcessForm: {
    email: string,
    password: string,
  }

  setInfoCompanyForm: React.Dispatch<React.SetStateAction<{ 
    name: string,
    CPF: string,
    CNPJ: string,
    phone: string
  }>>;
  setInfoAdressForm: React.Dispatch<React.SetStateAction<{ 
    CEP: string,
    state: string,
    city: string,
    district: string,
    street: string,
    number: string,
    complement: string,
  }>>;
  setInfoAcessForm: React.Dispatch<React.SetStateAction<{ 
    email: string,
    password: string,
  }>>;

}

  
  export const PromoterRegistrationContext = createContext<PromoterRegistrationContextType>({
    infoCompanyForm: { 
      name: "",
      CPF: "",
      CNPJ: "",
      phone: "",
    },
    infoAdressForm: {
      CEP: "",
      state: "",
      city: "",
      district: "",
      street: "",
      number: "",
      complement: "",
    },
    infoAcessForm: { 
      email: "",
      password: "",
    },
  
    setInfoCompanyForm: () => {},
    setInfoAdressForm: () => {},
    setInfoAcessForm: () => {},

  });