"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import toast from "react-hot-toast"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    })
    if (result?.error) {
      toast.error(result.error)
    }
    else {
      router.push("/")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-[350px] shadow-2xl rounded-2xl bg-black border border-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-xl text-white">Login</CardTitle>
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

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer" onClick={handleSubmit}>
              Login
            </Button>

            <p className="text-center text-gray-400">
              Don’t have an account?{" "}
              <Link className="underline text-blue-400 hover:text-blue-300" href={"/register"}>
                Register
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
