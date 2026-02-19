import { createPublicClient, http, fallback } from "viem";
import {
  mainnet,
  arbitrum,
  optimism,
  base,
  polygon,
  bsc,
  avalanche,
  zkSync,
} from "viem/chains";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const infuraKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;

function createRpcUrl(chain: string, provider: "alchemy" | "infura"): string {
  const key = provider === "alchemy" ? alchemyKey : infuraKey;
  if (!key) return "";
  
  const alchemyUrls: Record<string, string> = {
    ethereum: `https://eth-mainnet.g.alchemy.com/v2/${key}`,
    arbitrum: `https://arb-mainnet.g.alchemy.com/v2/${key}`,
    optimism: `https://opt-mainnet.g.alchemy.com/v2/${key}`,
    base: `https://base-mainnet.g.alchemy.com/v2/${key}`,
    polygon: `https://polygon-mainnet.g.alchemy.com/v2/${key}`,
  };
  
  const infuraUrls: Record<string, string> = {
    ethereum: `https://mainnet.infura.io/v3/${key}`,
    arbitrum: `https://arbitrum-mainnet.infura.io/v3/${key}`,
    optimism: `https://optimism-mainnet.infura.io/v3/${key}`,
    base: `https://base-mainnet.infura.io/v3/${key}`,
    polygon: `https://polygon-mainnet.infura.io/v3/${key}`,
    avalanche: `https://avalanche-mainnet.infura.io/v3/${key}`,
  };
  
  return provider === "alchemy" ? alchemyUrls[chain] || "" : infuraUrls[chain] || "";
}

function createTransport(chainName: string) {
  const transports: (ReturnType<typeof http>)[] = [];
  
  const alchemyUrl = createRpcUrl(chainName, "alchemy");
  if (alchemyUrl) {
    transports.push(http(alchemyUrl));
  }
  
  const infuraUrl = createRpcUrl(chainName, "infura");
  if (infuraUrl) {
    transports.push(http(infuraUrl));
  }
  
  // Fallback to public RPC if no API keys
  if (transports.length === 0) {
    return http();
  }
  
  return fallback(transports);
}

export const publicClients = {
  ethereum: createPublicClient({
    chain: mainnet,
    transport: createTransport("ethereum"),
    batch: {
      multicall: true,
    },
  }),
  arbitrum: createPublicClient({
    chain: arbitrum,
    transport: createTransport("arbitrum"),
    batch: {
      multicall: true,
    },
  }),
  optimism: createPublicClient({
    chain: optimism,
    transport: createTransport("optimism"),
    batch: {
      multicall: true,
    },
  }),
  base: createPublicClient({
    chain: base,
    transport: createTransport("base"),
    batch: {
      multicall: true,
    },
  }),
  polygon: createPublicClient({
    chain: polygon,
    transport: createTransport("polygon"),
    batch: {
      multicall: true,
    },
  }),
  bsc: createPublicClient({
    chain: bsc,
    transport: http("https://bsc-dataseed.binance.org"),
    batch: {
      multicall: true,
    },
  }),
  avalanche: createPublicClient({
    chain: avalanche,
    transport: createTransport("avalanche"),
    batch: {
      multicall: true,
    },
  }),
  zksync: createPublicClient({
    chain: zkSync,
    transport: http("https://mainnet.era.zksync.io"),
    batch: {
      multicall: true,
    },
  }),
};

export function getPublicClient(chainId: number) {
  const chainMap: Record<number, keyof typeof publicClients> = {
    1: "ethereum",
    42161: "arbitrum",
    10: "optimism",
    8453: "base",
    137: "polygon",
    56: "bsc",
    43114: "avalanche",
    324: "zksync",
  };
  
  const chainName = chainMap[chainId];
  if (!chainName) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }
  
  return publicClients[chainName];
}
