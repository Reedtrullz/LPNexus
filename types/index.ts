/**
 * LP Nexus Type Definitions
 */

// Chain definitions
export type ChainId = 
  | 1      // Ethereum
  | 42161  // Arbitrum
  | 10     // Optimism
  | 8453   // Base
  | 137    // Polygon
  | 56     // BSC
  | 43114  // Avalanche
  | 324;   // zkSync

export type ChainName = 
  | "ethereum"
  | "arbitrum"
  | "optimism"
  | "base"
  | "polygon"
  | "bsc"
  | "avalanche"
  | "zksync";

export interface Chain {
  id: ChainId;
  name: ChainName;
  displayName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorers: string[];
  logoUrl: string;
}

// Token definitions
export interface Token {
  address: string;
  chainId: ChainId;
  symbol: string;
  name: string;
  decimals: number;
  logoUrl?: string;
  priceUsd?: number;
}

// LP Position types
export type Protocol = 
  | "uniswap-v3"
  | "uniswap-v2"
  | "sushiswap"
  | "pancakeswap"
  | "curve"
  | "balancer"
  | "raydium-clmm"
  | "orca-whirlpool";

export type PositionStatus = "active" | "closed" | "out-of-range" | "inactive";

export interface Position {
  id: string;
  protocol: Protocol;
  chainId: ChainId;
  owner: string;
  
  // Tokens
  token0: Token;
  token1: Token;
  
  // Liquidity amounts
  liquidity: string;
  amount0: string;
  amount1: string;
  amount0Usd: number;
  amount1Usd: number;
  totalValueUsd: number;
  
  // Price range (for concentrated liquidity)
  tickLower?: number;
  tickUpper?: number;
  priceLower?: number;
  priceUpper?: number;
  currentPrice: number;
  
  // Fees
  fees0: string;
  fees1: string;
  feesUsd: number;
  uncollectedFees0?: string;
  uncollectedFees1?: string;
  uncollectedFeesUsd?: number;
  
  // P&L
  depositedAmount0: string;
  depositedAmount1: string;
  depositedValueUsd: number;
  pnlUsd: number;
  pnlPercent: number;
  
  // IL metrics
  impermanentLossPercent: number;
  hodlValueUsd: number;
  
  // Metadata
  status: PositionStatus;
  createdAt: number;
  closedAt?: number;
  lastUpdatedAt: number;
  
  // Pool info
  poolAddress: string;
  feeTier: number;
  apr?: number;
  apy?: number;
}

// Portfolio summary
export interface PortfolioSummary {
  totalValueUsd: number;
  totalDepositedUsd: number;
  totalPnlUsd: number;
  totalPnlPercent: number;
  totalFeesUsd: number;
  totalUncollectedFeesUsd: number;
  activePositions: number;
  closedPositions: number;
  protocols: Protocol[];
  chainIds: ChainId[];
}

// Wallet types
export type WalletType = "evm" | "solana";

export interface ConnectedWallet {
  type: WalletType;
  address: string;
  chainId?: ChainId;
  connector?: string;
}

// Chart data
export interface PricePoint {
  timestamp: number;
  price: number;
}

export interface PositionHistory {
  timestamp: number;
  valueUsd: number;
  feesUsd: number;
  pnlUsd: number;
}

// Simulation types
export interface SimulationParams {
  token0: Token;
  token1: Token;
  depositAmount: number;
  priceRange: {
    lower: number;
    upper: number;
  };
  duration: number; // days
  volatility: number; // annualized
  feeTier: number;
}

export interface SimulationResult {
  expectedFees: number;
  expectedIl: number;
  expectedPnl: number;
  scenarios: {
    price: number;
    value: number;
    pnl: number;
  }[];
}

// API response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}
