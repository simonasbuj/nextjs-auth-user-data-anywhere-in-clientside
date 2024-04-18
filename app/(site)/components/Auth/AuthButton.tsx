import clsx from 'clsx'


interface AuthButtonProps {
    text: string,
    onClick: () => void,
    color: string
} 

export default function AuthButton ({text, onClick, color} : AuthButtonProps) {

    return (
        <button
            onClick={onClick}
            className={clsx(`
            border-2
            py-2
            px-6
            rounded-md
            text-white w-full`,
            text === 'Login' && 'bg-blue-500 hover:bg-blue-600',
            text === 'Logout' && 'bg-pink-500 hover:bg-pink-600'
        )}
        >
            {text}
        </button>
    )
}