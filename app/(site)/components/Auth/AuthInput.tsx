import clsx from "clsx"

interface AuthInputProps {
    type: string,
    placeholder: string,
    error?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AuthInput({ type, placeholder, error, onChange }: AuthInputProps) {


    return(
        <input 
            id={type}
            type={type} 
            name={type}
            placeholder={placeholder}
            className={clsx(
                "w-full lg:w-1/2 mb-2 outline-pink-500 rounded-md px-2 py-2",
                error && "border-red-200 border-2 outline-red-300"
            )}
            onChange={onChange}
        />
    )
}