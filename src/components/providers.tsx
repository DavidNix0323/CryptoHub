"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { WagmiProvider } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { createWagmiConfig } from "@/lib/wagmi";
import { useAuthStore } from "@/store/authStore";
import { patchWalletTelemetry } from "@/lib/walletPatches";
import { ErrorBoundary } from "react-error-boundary";

patchWalletTelemetry(); // ✅ Must run before Wagmi config instantiation

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 3,
        retryDelay: (attemptIndex) =>
          Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        retry: 1,
      },
    },
  });

function AuthInitializer() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return null;
}

function WagmiErrorFallback({ error }: { error: Error }) {
  console.error("❌ Wagmi crashed:", error);
  return <div>Wallet error. Try refreshing or reconnecting.</div>;
}

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  console.info("🛡️ Providers initialized");

  const queryClient = useMemo(() => createQueryClient(), []);
  const wagmiConfig = useMemo(() => {
    console.info("⚙️ Wagmi config creation started");
    const config = createWagmiConfig();
    console.info("✅ Wagmi config created");
    return config;
  }, []);

  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) {
      console.warn("Providers already initialized, skipping re-initialization");
      return;
    }

    isInitialized.current = true;

    return () => {
      isInitialized.current = false;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <ErrorBoundary FallbackComponent={WagmiErrorFallback}>
          <WagmiProvider config={wagmiConfig}>
            <ConnectKitProvider
              theme="auto"
              mode="auto"
              options={{
                initialChainId: 0,
                enforceSupportedChains: false,
                disclaimer: undefined,
              }}
            >
              <AuthInitializer />
              {children}
            </ConnectKitProvider>
          </WagmiProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
