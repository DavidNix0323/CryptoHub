import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const coinbaseWalletSDK = new CoinbaseWalletSDK({
  appName: "CryptoPlatform",
  appLogoUrl: `${process.env.NEXT_PUBLIC_APP_URL}/favicon.ico`,
});

// 🔧 Patch telemetry loader if present (not exposed in SDK types)
const sdkWithTelemetry = coinbaseWalletSDK as unknown as {
  telemetryService?: {
    loadTelemetryScript?: () => void;
  };
};

if (sdkWithTelemetry.telemetryService) {
  sdkWithTelemetry.telemetryService.loadTelemetryScript = () => {
    // Suppressed telemetry script
  };
}


