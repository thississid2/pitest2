"use client";
import { Suspense } from "react";
import PiAPIIntegration from "./PiAPIIntegration";

export default function PiAPIIntegrationWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PiAPIIntegration />
    </Suspense>
  );
}
