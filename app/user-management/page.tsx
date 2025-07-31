"use client";
import { Suspense } from "react";
import UserManagement from "./UserManagement";

export default function UserManagementWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserManagement  />
    </Suspense>
  );
}
