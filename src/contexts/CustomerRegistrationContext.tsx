import {createContext} from "react";

interface CustomerRegistrationContextType {
  infoPersonalForm: { 
    name: string,
    birthDate: string,
    CPF: string,
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
  setInfoPersonalForm: React.Dispatch<React.SetStateAction<{ 
    name: string,
    birthDate: string,
    CPF: string,
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

  
  export const CustomerRegistrationContext = createContext<CustomerRegistrationContextType>({
    infoPersonalForm: { 
      name: "",
      birthDate: "",
      CPF: "",
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
    setInfoPersonalForm: () => {},
    setInfoAdressForm: () => {},
    setInfoAcessForm: () => {},
  });