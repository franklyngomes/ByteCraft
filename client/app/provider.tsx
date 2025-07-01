"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  const pathname = usePathname()
  const hideLayout = pathname === "/signin" || pathname === "/signup" || pathname === "/verify-email" || pathname === "/forgot-password" || pathname === "/reset-password"
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      {!hideLayout && <Header/>}
      {children}
      {!hideLayout && <Footer/>}
    </QueryClientProvider>
  );
};
export default Provider;
