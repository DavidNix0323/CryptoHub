import { CoinbaseWalletConnector } from "@wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "@wagmi/connectors/metaMask";
import { WalletConnectConnector } from "@wagmi/connectors/walletConnect";
import { coinbaseWalletSDK } from "./coinbaseWalletSDK";

export const connectors = [
  new MetaMaskConnector({ options: { shimDisconnect: true } }),
  new WalletConnectConnector({
    options: {
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
      metadata: {
        name: "CryptoPlatform",
        description: "Advanced crypto analytics",
        url: process.env.NEXT_PUBLIC_APP_URL!,
        icons: [`${process.env.NEXT_PUBLIC_APP_URL}/favicon.ico`],
      },
    },
  }),
  new CoinbaseWalletConnector({
    options: {
      coinbaseWalletSDK,
      jsonRpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_ID",
    },
  }),
];
