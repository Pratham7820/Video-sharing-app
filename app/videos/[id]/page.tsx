"use client"
import { Videotype } from "@/app/models/video";
import { Video } from "@imagekit/next";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VideoPage() {
    const param = useSearchParams();
    const search = param.get("num")
    const [video, setVideo] = useState<Videotype>();
    useEffect(() => {
        const getVideo = async () => {
            const response = await axios.get(`/api/videos/?num=${search}`)
            if (!response) {
                toast.error("Video cant be watched")
            }
            setVideo(response.data)
        }
        getVideo();
    }, [])
    return (
        <div className="text-white">
            {video ? <Video 
                    src={video.videoUrl}
                    /> :
            <div className="flex justify-center items-center text-white">
                <h2 >No Videos exist</h2>
                <Link href={"/"}>Go to home page</Link>
            </div> 
            }
        </div>
    )
}