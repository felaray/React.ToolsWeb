import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "工具集合 | Next.js Application",
  description: "各種實用工具集合",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        {/* 預載入主要工具組件 */}
        <link 
          rel="preload" 
          href="/tool/firebase-login" 
          as="fetch" 
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
