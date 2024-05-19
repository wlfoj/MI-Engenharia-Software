import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"
import { fi } from "date-fns/locale";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("file") as Blob | null;
  const cpf = formData.get("cpf") as string | null;

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/img/profile/custumer`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    if (cpf && filename) {
      const updateAvatar = await prisma.cliente.update({
        where: {
          cpf: cpf
        },
        data: {
          perfil_foto: `${filename}`,
          }
      })
    }

    return NextResponse.json({ fileUrl: `${relativeUploadDir}/${filename}` });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

