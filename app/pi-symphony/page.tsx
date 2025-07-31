"use client";
import { Suspense } from "react";
import PiSymphonyHome from "./PiSymphonyHome";

export default function PiSymphonyHomeWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PiSymphonyHome />
    </Suspense>
  );
}

