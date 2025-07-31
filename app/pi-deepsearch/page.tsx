"use client";
import { Suspense } from "react";
import PiDeepSearchHome from "../pi-deepsearch/PiDeepsearchHome";

export default function PiDeepSearchHomeWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PiDeepSearchHome />
    </Suspense>
  );
}
