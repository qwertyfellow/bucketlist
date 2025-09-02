import React from 'react'
import Navbar from '@/components/Navigation/NavBar';
import { Toaster } from 'sonner';
import Footer from '@/components/Footer/Footer';

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Toaster position="top-right" richColors={true}/>
        <Navbar />
        {children}
        <Footer />
    </div>
  )
}

export default Layout;

