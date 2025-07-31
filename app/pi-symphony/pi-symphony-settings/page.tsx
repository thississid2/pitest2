"use client";
import { Suspense } from "react";
import PiSymphonySettingsPage from "./PiSymphonySettings";

export default function PiSymphonySettingsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PiSymphonySettingsPage />
    </Suspense>
  );
}
