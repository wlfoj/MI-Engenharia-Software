import { useContext } from "react";
import { PayContext } from "../contexts/payContext";

export default function UPayContext() {
  const { infoCard, setInfoCard } = useContext(PayContext);
  return { infoCard, setInfoCard };
}

