"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from 'react-hot-toast'

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.MouseEvent) => {
        if (!email || !password || !confirmPassword) {
            toast.error("Please fill all the fields")
            return
        }
        if (password !== confirmPassword) {
            toast.error("Password and confirm password not match")
            return
        }
        try {
            const response = await axios.post("/api/auth/register", {
                email,
                password
            })
            if (response.data.error) {
                throw new Error(response.data.error || "Registeration failed")
            }
            console.log(response.data)
            toast.success("Registeration successfully")
            router.push("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <Card className="w-[350px] shadow-2xl rounded-2xl bg-black border border-gray-800">
                <CardHeader>
                    <CardTitle className="text-center text-xl text-white">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-200">Email</Label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-black border border-gray-700 text-white placeholder-gray-500"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-200">Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                className="bg-black border border-gray-700 text-white placeholder-gray-500"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-200">Confirm Password</Label>
                            <Input
                                type="password"
                                placeholder="Confirm your password"
                                className="bg-black border border-gray-700 text-white placeholder-gray-500"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer" onClick={handleSubmit}>
                            Register
                        </Button>

                        <p className="text-center text-gray-400">
                            Already have an account?{" "}
                            <Link className="underline text-blue-400 hover:text-blue-300" href={"/login"}>
                                Login
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

}