"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useSession } from "next-auth/react";


export default function FileUploader() {
  const  { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState("/img/profile/placeholder.jpg");

  const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      console.warn("no file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("cpf", session?.user?.id as string);

    try {
      const res = await fetch("/api/im", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const data: { fileUrl: string } = await res.json();

      setImageUrl(data.fileUrl);
    } catch (error) {
      console.error("something went wrong, check your console.");
    }

    /** Reset file input */
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <label
      className={`relative block w-full h-0 rounded-md overflow-hidden cursor-pointer`}

      style={{ paddingTop: `calc(100% * (${446} / ${720}))` }}
    >
      <Image
        src={imageUrl}
        alt="uploaded image"
        width={720}
        height={446}
        priority={true}
      />
      <input
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        style={{ display: "none" }}
        type="file"
        onChange={onImageFileChange}
      />
    </label>
  );
}