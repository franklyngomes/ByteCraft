"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  const pathname = usePathname()
  const hideLayout = pathname === "/signin" || pathname === "/signup"
  return (
    <QueryClientProvider client={queryClient}>
      {!hideLayout && <Header/>}
      {children}
      {!hideLayout && <Footer/>}
    </QueryClientProvider>
  );
};
export default Provider;
