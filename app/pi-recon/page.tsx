"use client";
import { Suspense } from "react";
import PiRecon from "./PiRecon";

export default function PiReconWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PiRecon />
    </Suspense>
  );
}
