"use client";
import { Suspense } from "react";
import PiAnalytics from "./PiAnalytics";

export default function PiCheckoutWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PiAnalytics />
    </Suspense>
  );
}
