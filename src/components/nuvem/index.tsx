'use client'

import { CldUploadWidget } from 'next-cloudinary';
import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Button } from '../ClientSide';



export default function FileUploader() {
    const [imageId, setImageId] = useState("");
    const { data: session } = useSession();

    function refreshPage() {
        window.location.reload();
    }

    const uploadImg = async () => {
        const data = new FormData();
        data.append("file", imageId);
        data.append("cpf", `${session?.user?.id}`);
        const res = await axios.post("/api/image/profile", data
        );
    }

    return (
        <>
        <CldUploadWidget uploadPreset="xvnync8u" onClose={refreshPage}>
            {({ open, results, widget }) => {
                function handleOnClick(e: any) {
                    e.preventDefault();
                    open();
                }
                if (results) {
                    //@ts-ignore
                    if (results?.event === 'success') {
                        //@ts-ignore
                        console.log(results?.info);
                        //@ts-ignore
                        setImageId(results?.info?.public_id);
                        uploadImg();
                    }

                }

                return (
                    <Button size='md' onClick={handleOnClick}>
                        Alterar Foto
                    </Button>
                );
            }}
        </CldUploadWidget>
        </>
    )
}
