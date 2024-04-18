import AuthContext from "../context/AuthContext"

export default function SiteLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
            <AuthContext>
                {children}
            </AuthContext>
      </>
    )
  }