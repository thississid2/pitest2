"use client";
import { Suspense } from "react";
import Home from "./HomePage";

export default function HomePageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
