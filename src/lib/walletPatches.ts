import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const patchWalletTelemetry = () => {
    if (typeof window !== "undefined") {
      const originalFetch = window.fetch;
      window.fetch = function (...args) {
        const url = args[0];
        if (typeof url === "string" && url.includes("cca-lite.coinbase.com/metrics")) {
          console.warn("🚫 Blocked Coinbase metrics POST");
          return Promise.resolve(new Response(null, { status: 204 }));
        }
        return originalFetch.apply(this, args);
      };
    }
  
    const sdkProto = CoinbaseWalletSDK.prototype as unknown as {
      telemetryService?: {
        loadTelemetryScript?: () => void;
      };
    };
  
    if (sdkProto.telemetryService?.loadTelemetryScript) {
      sdkProto.telemetryService.loadTelemetryScript = () => {
        // Suppressed: no cca-lite.coinbase.com/metrics POST
      };
    }
  };
  