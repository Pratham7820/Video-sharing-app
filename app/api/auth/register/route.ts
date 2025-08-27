import User from "@/app/models/user";
import { connectToDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try {
        const {email,password} = await req.json()
        if(!email || !password){
            return NextResponse.json(
                {error : "email and password are required"},
                {status : 400}
            )
        }
        await connectToDB()
        
        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json(
                {error : "User already registered"},
                {status : 400}
            )
        }
        await User.create({
            email,
            password
        })
        return NextResponse.json(
            {message : "User succesfully registered"},
            {status : 200}
        )
    } catch (error) {
        console.error("Error in registering",error)
        return NextResponse.json(
            {message : "Error in registering the user"},
            {status : 500}
        )
    }
}