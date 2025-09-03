import React from "react";
import Navbar from "@/components/Navigation/NavBar";
import { Toaster } from "sonner";
import Footer from "@/components/Footer/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" richColors={true} />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Layout;
