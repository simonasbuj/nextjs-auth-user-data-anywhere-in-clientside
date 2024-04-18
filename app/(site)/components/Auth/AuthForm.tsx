import { useEffect, useState } from "react";
import AuthButton from "./AuthButton";
import { signIn, signOut } from "next-auth/react";
import AuthInput from "./AuthInput";


export default function AuthForm() {

    const [formData, setFormData] = useState({ email: "", password: "" })
    const [loginError, setloginError] = useState("")

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`Change is happening. Input name: ${event.target.name}, new value: ${event.target.value}`)
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleLogin = () => {
        console.log("login from handle, email used is " + formData.email)
        setloginError("")
        signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false
        })
        .then((callback) => {
            if (callback?.ok == true) {
                console.log("LOGED IN SUCCESFULLY")
                setloginError("")
            } else if (callback?.error) {
                console.log("LOGING IN FAILED with error: " + callback?.error)
                console.log(callback)
                const error = callback.error
                setloginError(error)
            }
        })
    }

    const handleLogout = () => {
        signOut()
    }
    

    useEffect(() => {
        console.log("FORM DATA UPDATED, NEW VALUES: " + formData)
        console.log(formData)
        console.log(!formData.password)
    }, [formData])

    return (
        <div className="w-full md:w-1/2 border-2 border-zinc-400 py-4 rounded-md px-2">  
            <form action="" className="w-full flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
                <AuthInput type="email" placeholder="email@email.com" error={loginError} onChange={handleFormChange}/>
                <AuthInput type="password" placeholder="password" error={loginError} onChange={handleFormChange}/>
                {/* <input 
                    id="email" 
                    type="email" 
                    name="email" 
                    placeholder="email@email.com"
                    className="w-1/2 mb-2 outline-pink-500 rounded-md px-2 py-2" 
                    onChange={handleFormChange}
                />
                <input 
                    id="password" 
                    type="password" 
                    name="password" 
                    placeholder="password"
                    className="w-1/2 mb-2 outline-pink-500 rounded-md px-2 py-2" 
                    onChange={handleFormChange}
                /> */}
                <div className="w-full lg:w-1/2 text-red-300 font-bold mb-1">{loginError}</div>
                <div className="w-full lg:w-1/2">
                    <div className="flex justify-center gap-2">
                        <AuthButton text="Login" onClick={handleLogin} color="bg-pink-500"/>
                        <AuthButton text="Logout" onClick={handleLogout} color="bg-purple-500"/>
                    </div>
                </div>
            </form>
        </div>
        
    )
}