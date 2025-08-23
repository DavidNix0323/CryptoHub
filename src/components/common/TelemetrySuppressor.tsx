"use client";
import { useEffect } from "react";
import { patchWalletTelemetry } from "@/lib/patchCoinbaseTelemetry";


const TelemetrySuppressor = () => {
  useEffect(() => {
    patchWalletTelemetry();
  }, []);

  return null; // No UI, just logic
};

export default TelemetrySuppressor;
