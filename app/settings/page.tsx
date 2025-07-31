"use client";
import { Suspense } from "react";
import Settings from "./Settings";

export default function SettingsWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Settings />
    </Suspense>
  );
}
