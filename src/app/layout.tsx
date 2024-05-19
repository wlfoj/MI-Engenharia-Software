import React from 'react';
import '../styles/globals.css';
import Navbar from '../components/Navbar/Navbar';
import Providers from '@/components/Providers';





export const metadata = {
  title: 'WilTickets',
  description: 'Site de venda de ingressos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-br">
      <body className="bg-gradient-to-br from-indigo-300 via-purple-800 to-blue-200 h-auto min-h-full">  {/* md:h-max xl:h-max 2xl:h-max h-max*/}
          <Providers>
            <Navbar navbarType={'noLogin'}/>
            {children}
          </Providers>
      </body>
    </html>
  )
}
