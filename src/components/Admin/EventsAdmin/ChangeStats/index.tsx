import { useState } from "react"

const EditarStatusEv = {
    tipo: 'trocar status',
    novoDado: 'suspenso',
    idDoEvento: 1
  }


export default function editarStatusEvento(evento: number){

    async function calledSuspension(){
        const jaison = JSON.stringify({
        tipo: EditarStatusEv.tipo,
        novoDado: EditarStatusEv.novoDado,
        idDoEvento: evento
        })

        const res = await fetch("/api/evento", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: jaison
        })
        const [jsonPraTela, setJsonPraTela] = useState('LOCAL ONDE O JSON CRIADO SERA EXIBIDO PARA SERVIR DE EXEMPLO')
        if (res.ok) {
            const data = await res.json()
            setJsonPraTela(JSON.stringify(data)) 
            console.log("AQUII:", res)
        } else {
            setJsonPraTela("DEU BO")
        }
        }
    }

    