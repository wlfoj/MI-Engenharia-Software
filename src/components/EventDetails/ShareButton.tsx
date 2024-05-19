'use client'

import { useState } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { MdOutlineShare } from "react-icons/md";
 
export default function ShareButton() {
    const [openAlert, setOpenAlert] = useState(false);
 
    const copyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
    }

    const buttonAction = () => {
        setOpenAlert(true);
        copyLink();
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
    }


  return (
      <>
        <Button size="md" className="bg-roxo-wil flex items-center gap-3 rounded-full" onClick={buttonAction}>
            <MdOutlineShare size={'1rem'}/>
            Compartilhar
        </Button>

        <Alert
          open={openAlert}
          color="green"
          className="max-w-[20%] absolute bottom-5"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
        >
          <p className="font-normal">
            Link Copiado
          </p>
        </Alert>
      </>
    );
}