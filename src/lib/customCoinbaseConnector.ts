import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

type TelemetryPatchable = {
  telemetryService?: {
    loadTelemetryScript?: () => void;
  };
};

export const patchWalletTelemetry = () => {
  const sdkProto = CoinbaseWalletSDK.prototype as unknown as TelemetryPatchable;

  if (sdkProto?.telemetryService?.loadTelemetryScript) {
    sdkProto.telemetryService.loadTelemetryScript = () => {
      console.info("🚫 Telemetry suppressed");
    };
  }
};



