"use client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Header() {
    const { data : session , status} = useSession()
    return (
        <div className="flex justify-between p-5 items-center bg-gray-900 text-white fixed w-full">
            <h2 className="text-xl flex gap-3 items-center"><Link href={"/"}><Home /></Link>Video Sharing Webapp</h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild><Button className="border rounded-full hover:cursor-pointer"><User /></Button></DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black text-white mr-2">
                    {status !== "authenticated" ? <>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href="/login">Login</Link></DropdownMenuItem>
                    </> : <>
                        <DropdownMenuLabel>Hello {session.user.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href="/upload">Upload</Link></DropdownMenuItem>
                        <DropdownMenuItem><div onClick={() => signOut()}>Log out</div></DropdownMenuItem>
                    </>
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}