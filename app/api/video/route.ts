import Video, { Videotype } from "@/app/models/video";
import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const param = req.nextUrl.searchParams;
        const search = param.get("num")
        await connectToDB()
        if (search == "num") {
            const getVideo = await Video.find({id: param});
            if(!getVideo){
                return NextResponse.json({
                    message : "No video found"
                },{status : 400})
            }
            return NextResponse.json(getVideo)
        }
        else {
            
            const getAllVideo = await Video.find({}).sort({ createdAt: -1 }).lean()
            if (!getAllVideo || getAllVideo.length === 0) {
                return NextResponse.json([], { status: 200 })
            }
            return NextResponse.json(getAllVideo, { status: 200 })
        }

    } catch (error) {
        return NextResponse.json({
            error: "failed to fetch videos"
        }, {
            status: 500
        })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
        }

        await connectToDB()

        const body: Videotype = await req.json()

        if (!body.title || !body.description || !body.thumbnailUrl || !body.videoUrl) {
            return NextResponse.json({ error: "video does not contain neccesary data" }, { status: 400 })
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            }
        }

        const video = await Video.create(videoData)

        return NextResponse.json(video)

    } catch (error) {
        return NextResponse.json({ error: "video creation failed" }, { status: 500 })
    }
}