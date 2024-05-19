import {createContext} from "react";

interface StepperContextType {
  infoStepper: { 
    activeStep: number
  };
  setInfoStepper: React.Dispatch<React.SetStateAction<{ 
    activeStep: number
  }>>;
}

  
  export const StepperContext = createContext<StepperContextType>({
    infoStepper: { 
      activeStep: 0
    },
    setInfoStepper: () => {},
  });