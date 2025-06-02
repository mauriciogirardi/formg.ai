import { defaultBackgroundColor } from '@/constants'

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main
      className="w-full min-h-screen "
      style={{
        backgroundColor: defaultBackgroundColor,
      }}
    >
      {children}
    </main>
  )
}
