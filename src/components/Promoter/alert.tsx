import React from "react";
import { Alert, Typography } from "@material-tailwind/react";
import { InformationCircleIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
 
export function AlertNotFound() {
  const [open, setOpen] = React.useState(true);
 
  return (
    <div className="pop-b-r">
    <Alert
      open={open}
      className="max-w-screen-md"
      color="amber"
      icon={  <InformationCircleIcon strokeWidth={2} className="h-6 w-6"/>}
      onClose={() => setOpen(false)}
    >
      <Typography variant="h5" color="white">
        Você errou sua senha atual
      </Typography>
    </Alert>
  </div>
  );
}


export function AlertSucess(props: any) {

  const [open, setOpen] = React.useState(true);
 
  return (
    <div className="pop-b-r">
      <Alert
        open={open}
        color="green"
        className="max-w-screen-md"
        icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
        onClose={() => setOpen(false)}
      >
        <Typography variant="h5" color="white">
          Senha alterada com sucesso
        </Typography>
      </Alert>
    </div>
  );
}

export function AlertError() {
  const [open, setOpen] = React.useState(true);
 
  return (
    <div className="pop-b-r">
    <Alert
      open={open}
      color="red"
      className="max-w-screen-md"
      icon={<ExclamationTriangleIcon className="h-6 w-6" />}
      onClose={() => setOpen(false)}
    >
      <Typography variant="h5" color="white">
        Ocorreu um erro no servidor
      </Typography>
    </Alert>
  </div>
  );
}