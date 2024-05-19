import nodemailer from "nodemailer"

const email = 'wilburtosta@gmail.com'
const pass = 'ezcvmxgqvwywouhx'

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass
    }
})

export const mailOptions = {
    from: email,
    to: email
}

export function trocarDestinatario(destinatario: string){
    mailOptions.to = destinatario
}