"use client";
import { Suspense } from "react";
import HelpAndSupport from "./HelpAndSupport";

export default function HelpAndSupportWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HelpAndSupport />
    </Suspense>
  );
}
