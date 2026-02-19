import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  arbitrum,
  optimism,
  base,
  polygon,
  bsc,
  avalanche,
  zkSync,
} from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

if (!projectId) {
  console.warn("WalletConnect Project ID is not set");
}

export const wagmiConfig = getDefaultConfig({
  appName: "LP Nexus",
  projectId,
  chains: [
    mainnet,
    arbitrum,
    optimism,
    base,
    polygon,
    bsc,
    avalanche,
    zkSync,
  ],
  ssr: true,
});

export const supportedChains = [
  mainnet,
  arbitrum,
  optimism,
  base,
  polygon,
  bsc,
  avalanche,
  zkSync,
];

export const chainIdToName: Record<number, string> = {
  1: "ethereum",
  42161: "arbitrum",
  10: "optimism",
  8453: "base",
  137: "polygon",
  56: "bsc",
  43114: "avalanche",
  324: "zksync",
};

export const chainNameToId: Record<string, number> = {
  ethereum: 1,
  arbitrum: 42161,
  optimism: 10,
  base: 8453,
  polygon: 137,
  bsc: 56,
  avalanche: 43114,
  zksync: 324,
};
