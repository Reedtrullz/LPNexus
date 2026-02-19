# lib/ - AGENTS.md

**Purpose:** Utility libraries organized by domain (web3, api, calculations)

## STRUCTURE

```
lib/
├── web3/               # Multi-chain wallet infrastructure
│   ├── wagmiConfig.ts  # EVM chains + RainbowKit (8 chains)
│   ├── viemClients.ts  # RPC clients with fallbacks
│   └── solanaAdapter.ts # Solana Wallet Provider
├── api/                # External data sources
│   └── subgraphs.ts    # Uniswap V3 subgraph queries
├── calculations/       # Mathematical engines
│   ├── impermanentLoss.ts    # V3 IL formulas
│   ├── enhancedIL.ts         # Smart entry + volatility
│   └── monteCarloSimulator.ts # Simulation engine
└── utils.ts            # Shared helpers (cn, formatters)
```

## CONVENTIONS

### Web3
- wagmi config uses `getDefaultConfig` from RainbowKit
- 8 chains: ethereum, arbitrum, base, optimism, polygon, bsc, avalanche, zkSync
- Solana uses `@solana/wallet-adapter-react`

### API
- Subgraph URLs indexed by chain name
- GraphQL queries as template literals
- Error handling with fallback to empty arrays

### Calculations
- Pure functions only (no side effects)
- Based on Uniswap V3 whitepaper
- Monte Carlo uses GBM price simulation

## WHERE TO LOOK

| Task | File |
|------|------|
| Add EVM chain | `web3/wagmiConfig.ts` |
| Change RPC | `web3/viemClients.ts` |
| New subgraph query | `api/subgraphs.ts` |
| IL formula tweak | `calculations/impermanentLoss.ts` |
| Simulation logic | `calculations/monteCarloSimulator.ts` |
| Format helpers | `utils.ts` |

## ANTI-PATTERNS

- **NEVER** hardcode API keys (use env vars)
- **NEVER** call subgraphs without error handling
- **ALWAYS** use BigInt for token amounts

## FORMULA REFERENCES

- IL calculation: Uniswap V3 Whitepaper Section 6.3
- Tick/Price: `price = 1.0001^tick`
- GBM: `dS/S = μdt + σdW`

## DEPENDENCIES

- viem (Ethereum interaction)
- wagmi (React hooks for Web3)
- @solana/web3.js (Solana)
- lightweight-charts (Price data)
