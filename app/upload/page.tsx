"use client"
import { useState } from "react";
import Header from "../_components/header";
import Fileupload from "../components/fileupload";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface uploadType {
    url?: string | null,
    thumbnailUrl?: string | null,
    height?: number | null,
    width?: number | null,
}

export default function Upload() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [uploadResponse, setUploadResponse] = useState<uploadType | null>(null)
    const [progressBar, setProgressBar] = useState<number>(0)
    const router = useRouter()

    const SaveVideo = async () => {
        if (!title || !description || !uploadResponse) {
            toast.error("Please fill all the fields")
            return
        }
        try {
            const response = await axios.post("/api/video", {
                title,
                description,
                videoUrl: uploadResponse?.url,
                thumbnailUrl: uploadResponse?.url + "/ikthumbnail.jpg",
            })
            if (!response.data) {
                toast.error("error in publishing video")
                return
            }
            toast.success("Video Published")
            router.push("/")
        } catch (error) {
            console.log(error)
            toast.error("Internal server error")
        }
    }

    return (
        <div className="bg-black h-screen">
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="w-[400px] bg-black border border-gray-800 rounded-2xl shadow-2xl p-6">
                    <h1 className="text-2xl font-semibold text-white text-center mb-6">
                        Upload File
                    </h1>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-200 mb-1">Title</label>
                            <input
                                type="text"
                                placeholder="Enter title"
                                className="w-full px-3 py-2 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-200 mb-1">Description</label>
                            <textarea
                                placeholder="Enter description"
                                rows={4}
                                className="w-full px-3 py-2 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 resize-none"
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <Fileupload onSuccess={(res) => setUploadResponse(res)} onProgress={(progress) => setProgressBar(progress)} fileType={File.name.startsWith("video/*") ? "video" : "image"} />
                        {progressBar > 0 && progressBar < 100 && <div className="w-full bg-gray-800 rounded-full h-3">
                            <div
                                className="bg-blue-600 h-3 rounded-full transition-all"
                                style={{ width: `${progressBar}%` }}
                            ></div>
                        </div>}

                        <button className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium" onClick={SaveVideo}>
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}