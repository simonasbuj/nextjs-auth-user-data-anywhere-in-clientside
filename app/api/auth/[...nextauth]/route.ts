
import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

import { prisma } from "@/lib/prisma"



export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(credentials) {
                // If email or password is not provided return an error
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials')
                }

                // Fetch user data from db
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                console.log(credentials.password)
                // return error if user doesnt exist in db or if it doesnt have a password (in case of using social login)
                if (!user || !user.password) {
                    throw new Error('Invalid Credentials')
                }

                // if password dont march return an error
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                )
                if (!isCorrectPassword) throw new Error('Invalid Credentials')
                
                // if all is good return user
                return user
            }
        })
    ],
    callbacks : {
        session: async ({ session, token }) => {
            
            const fullData = await prisma.user.findUnique({
                where: {
                    id: token.sub
                }
            })
            if (session?.user) {
              session.user.id = token.sub
              session.user.fullData = fullData
            }

            // another way to add full user data. just make sure to include wanted fiels in jwt calback
            // I think this is a better way, because we dont need to make a second prisma call
            session.user.username_v2 = token.username
            session.someValue = "hi"
            return session;
          },
          jwt: async ({ user, token }) => {
            if (user) {
              token.sub = user.id
              token.username = user.username // another way to add fulldata. just make sure to update interface at next-auth.d.ts
            }

            return token;
          },
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}