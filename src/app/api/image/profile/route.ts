import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma"


export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const cpf = formData.get("cpf") as string | null;
    const file = formData.get("file") as string | null;

    try {
        
        if (cpf && file) {
          const updateAvatar = await prisma.cliente.update({
            where: {
              cpf: cpf
            },
            data: {
              perfil_foto: `${file}`,
              }
          })
        }
    
        return NextResponse.json({ fileUrl: `${file}` });
      } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
}