"use client";
import { Suspense } from "react";
import Documentation from "./Documentation";

export default function DocumentationWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Documentation />
    </Suspense>
  );
}
