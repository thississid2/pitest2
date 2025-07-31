"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <AuthProvider>
      <AuthenticatedLayout>
        {children}
      </AuthenticatedLayout>
    </AuthProvider>
  );
}
