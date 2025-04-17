// app/layout.tsx
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Relax Home Massage',
  };
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <div className="flex flex-col flex-1 h-full">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
