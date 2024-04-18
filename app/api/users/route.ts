import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"

export async function POST(request: NextRequest) {
    const { username, email, password } = await request.json()
    const hashedPassword = await bcrypt.hash(password, 12)

    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                username: username
            },
        })

        const responseBody = {
            message: "New User Created",
            createdUser: user
        }

        return NextResponse.json(responseBody)
    } catch (error) {
        console.log(error, "Creating new user failed with error: " + error + "sb end")
        return NextResponse.json({"error": error}, {status: 500})
    }
}