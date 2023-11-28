import { Inter } from 'next/font/google'
import "@styles/global.css"
import Navbar from '@components/Navbar'
import Providers from '@components/Providers'

export const metadata = {
  title: 'PromptGenie',
  description: 'Your gateway to AI-powered creativity – effortlessly generate unique prompts for writing, brainstorming, and content creation.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.ico'/>
      </head>
      <body>
        <Providers>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar/>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
