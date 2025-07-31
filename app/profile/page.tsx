"use client";
import { Suspense } from "react";
import Profile from "./Profile";

export default function ProfileWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile />
    </Suspense>
  );
}
