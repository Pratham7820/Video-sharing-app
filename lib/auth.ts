import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDB } from "./db"
import User from "@/app/models/user"
import bcrypt from "bcryptjs"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email or password missing")
                }
                try {
                    await connectToDB()
                    const user = await User.findOne({ email: credentials.email })

                    if (!user) {
                        throw new Error("No user found")
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password)

                    if (!isValid) {
                        throw new Error("Invalide password")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email
                    }

                } catch (error) {
                    throw error
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ token, session }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages : {
        signIn : "/login",
        error : "/login"
    },
    session : {
        strategy : "jwt",
        maxAge : 30 * 24 * 60 * 60
    },
    secret : process.env.NEXTAUTH_SECRET
}