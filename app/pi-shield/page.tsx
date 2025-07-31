"use client";
import { Suspense } from "react";
import PiShieldHome from "./PiShieldHome";

export default function PiShieldHomeWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PiShieldHome />
    </Suspense>
  );
}
