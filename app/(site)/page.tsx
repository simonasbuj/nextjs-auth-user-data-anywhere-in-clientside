'use client'
import { useSession } from "next-auth/react"
import { useState } from "react"
import AuthForm from "./components/Auth/AuthForm"


export default function Home() {

    const [data, setData] = useState({
        email: "fake@fake.com",
        password: "123"
    })
    const session = useSession()


    return (
        <div className="text-center min-h-screen flex flex-col items-center justify-center px-2">
            <h1>It's been done</h1>
            <p>logged in user: <span className="font-bold">{session?.data?.user?.email}</span></p>
            <p>logged in user status: <span className="font-bold">{session.status}</span></p>
            <p>logged in user id: <span className="font-bold">{session.data?.user?.id}</span></p>
            <p>logged in user username: <span className="font-bold">{session.data?.user?.fullData.username}</span></p>
            <p>my variable: <span className="font-bold">{session.data?.user?.username_v2}</span></p>
            
            <AuthForm />
            
        </div>
    )
}