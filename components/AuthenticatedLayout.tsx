"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/ui/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar/sidebarContext";
import AnimatedBlobs from "@/components/AnimatedBlobs";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sidebar for login page
  const isLoginPage = pathname === "/login";

  // Handle redirects on client side
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, isLoginPage, router]);

  if (isLoading) {
    return (
      <>
        <AnimatedBlobs />
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (isLoginPage) {
    return (
      <>
        <AnimatedBlobs />
        <main className="flex-1 min-h-screen relative z-10">{children}</main>
      </>
    );
  }

  if (!isAuthenticated) {
    // Show loading while redirecting
    return (
      <>
        <AnimatedBlobs />
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimatedBlobs />
      <div className="flex min-h-screen relative z-10">
        <SidebarProvider>
          <Sidebar />
          <main className="flex-1 min-h-screen p-6">{children}</main>
        </SidebarProvider>
      </div>
    </>
  );
}
