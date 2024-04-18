import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route";



export async function GET() {
    const authStatus = await getServerSession(authOptions)
    console.log(authStatus)
    if (!authStatus?.user) {
        return NextResponse.json("UNAUTHORIZED", {status: 401})
    }
    const response = {
        message: "You're AUTHORIZED",
        authObject: authStatus
    }
    return NextResponse.json(response)
}