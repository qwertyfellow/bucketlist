import React from 'react'
import Navbar from '@/components/Navigation/NavBar';
import { Toaster } from 'sonner';

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Toaster position="top-right" richColors={true}/>
        <Navbar />
        {children}
    </div>
  )
}

export default Layout;

