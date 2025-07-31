"use client";
import { Suspense } from "react";
import PiCheckout from "./PiCheckout";

export default function PiCheckoutWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PiCheckout />
    </Suspense>
  );
}
