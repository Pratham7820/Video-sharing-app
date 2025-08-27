"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Videotype } from "../models/video";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Image } from "@imagekit/next";

export default function Dashboard() {
    const [video, setVideo] = useState<Videotype[]>([])

    useEffect(() => {
        const getAllVideo = async () => {
            try {
                const response = await axios.get("/api/video")
                if (!response) {
                    toast.error("Cannot fetch Videos")
                    return
                }
                setVideo(response.data)
            } catch (error) {
                toast.error("Internal Server Error")
                console.log(error)
            }
        }
        getAllVideo()
    }, [])

    return (
        <div className="pt-23 pl-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-black min-h-screen">
            {video.length === 0 && (<div>
                No video exist
            </div>)}
            {video.map((videos, index) => (
                <Link key={videos.id?.toString() || index} href={`/videos?num=${videos.id}`}>
                    <Card className="w-[320px] bg-black border border-gray-800 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-900 transition mb-6">

                        <div className="relative w-full aspect-video">
                            <Image
                                src={`${videos.videoUrl}//ik-thumbnail.jpg`}
                                className="w-full h-full object-cover"
                                alt = "thumbnail image"
                                width = "320"
                                height = "150"
                            />
                        </div>

                        <CardContent className="p-3">
                            <h2 className="text-white text-sm font-semibold leading-snug line-clamp-2">
                                {videos.title}
                            </h2>
                            <p className="text-gray-400 text-xs line-clamp-2">
                                {videos.description}
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}