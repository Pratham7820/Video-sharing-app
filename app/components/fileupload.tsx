"use client"
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadType } from "../upload/page";

interface fileUploadType {
    onSuccess : (res:uploadType) => void,
    onProgress : (progress:number) => void,
    fileType : "video" | "image"
}


const Fileupload = ({ onSuccess , onProgress , fileType } : fileUploadType) => {
    const [uploading,setUplaoding] = useState(false)
    const [error,setError] = useState<string | null>(null)

    const validateFile = (file : File) => {
        if(fileType === "video"){
            if(!file.type.startsWith("video/")){
                setError("Please upload a valid file")
            }
            if(file.size > 100 * 1024 * 1024){
                setError("File size should be less than 100MB")
            }
        }
        return true
    }

    const handleFileChange = async(e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file || !validateFile(file)) return

        setUplaoding(true)
        setError(null)

        try {
            const response = await axios.get("/api/auth/imagekit-auth")
            const res = await upload({
                file,
                fileName : file.name,
                publicKey : process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                signature : response.data.authParams.signature,
                expire : response.data.authParams.expire,
                token : response.data.authParams.token,
                onProgress : (event) => {
                    if(event.lengthComputable){
                        const percent = (event.loaded/event.total) * 100
                        onProgress(Math.round(percent))
                    }
                }
            })
            const thumbnailUrl = res.url + "/ik-thumbnail.jpg"
            console.log(thumbnailUrl)
            onSuccess(res)
            toast.success("Video uploaded")
        } catch (error) {
            console.error(error)
        } finally {
            setUplaoding(false)
        }
    }


    return (
        <>
            <label className="block text-gray-200 mb-1">Choose File</label>
            <input className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 
                         file:text-sm file:font-semibold 
                         file:bg-blue-600 file:text-white 
                         hover:file:bg-blue-700"
            type="file"  onChange={handleFileChange} />
            {uploading && 
                <div className="text-white">
                   <Loader className="animate-spin"/>Uploading...
                </div>
            }
        </>
    );
};

export default Fileupload;