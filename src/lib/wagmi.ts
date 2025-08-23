import { createConfig, http } from "wagmi";
import { mainnet, polygon, arbitrum, optimism, base, bsc } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id";

// Create config only once using a singleton pattern with hot reload support
let wagmiConfigInstance: ReturnType<typeof createConfig> | null = null;

// Store in global for hot reload persistence during development
declare global {
  // eslint-disable-next-line no-var
  var __wagmiConfig: ReturnType<typeof createConfig> | undefined;
}

export const createWagmiConfig = (): ReturnType<typeof createConfig> => {
  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (isDev
    ? "http://localhost:3000"
    : "https://crypto-hub-gray.vercel.app");

  if (isDev && globalThis.__wagmiConfig) {
    return globalThis.__wagmiConfig;
  }

  if (wagmiConfigInstance) {
    return wagmiConfigInstance;
  }

  try {
    wagmiConfigInstance = createConfig(
      getDefaultConfig({
        walletConnectProjectId: projectId,
        appName: "CryptoPlatform",
        appDescription:
          "Advanced cryptocurrency analytics and portfolio management platform",
        appUrl: baseUrl, // ✅ Matches deployed domain in prod
        appIcon: `${baseUrl}/favicon.ico`,
        chains: [mainnet, polygon, arbitrum, optimism, base, bsc],
        transports: {
          [mainnet.id]: http(),
          [polygon.id]: http(),
          [arbitrum.id]: http(),
          [optimism.id]: http(),
          [base.id]: http(),
          [bsc.id]: http(),
        },
      })
    );

    if (isDev) {
      globalThis.__wagmiConfig = wagmiConfigInstance;
    }

    return wagmiConfigInstance;
  } catch (error) {
    console.warn("WalletConnect initialization warning:", error);

    return (
      wagmiConfigInstance ||
      globalThis.__wagmiConfig ||
      createConfig(
        getDefaultConfig({
          walletConnectProjectId: "demo-project-id",
          appName: "Fallback",
          chains: [mainnet],
          transports: {
            [mainnet.id]: http(),
          },
        })
      )
    );
  }
};

