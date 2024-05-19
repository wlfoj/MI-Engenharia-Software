import {createContext} from "react";

interface PayContextType {
  infoCard: { 
    cardNumber: string,
    name: string,
    date: string,
    cvv: string,
    fucus: boolean
  };
  setInfoCard: React.Dispatch<React.SetStateAction<{ 
    cardNumber: string,
    name: string,
    date: string,
    cvv: string,
    fucus: boolean
  }>>;
}

  
  export const PayContext = createContext<PayContextType>({
    infoCard: { cardNumber: "" ,
    name: "",
    date: "",
    cvv: "",
    fucus: false},
    setInfoCard: () => {},
  });
  

