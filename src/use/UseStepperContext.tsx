import { useContext } from "react";
import { StepperContext } from "../contexts/StepperContext";

export default function UseStepperContext() {
  const { infoStepper, setInfoStepper } = useContext(StepperContext);
  return { infoStepper, setInfoStepper };
}
