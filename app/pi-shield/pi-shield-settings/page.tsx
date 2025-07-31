"use client";
import { Suspense } from "react";
import PiShieldSettings from "./PiShieldSettings";

export default function PiShieldSettingsWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PiShieldSettings />
    </Suspense>
  );
}
