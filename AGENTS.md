# LP Nexus - AGENTS.md

**Generated:** 2026-02-19
**Project:** DeFi LP Tracking Platform
**Stack:** Next.js 15 + React 19 + TypeScript + wagmi/viem + Solana

## OVERVIEW
LP Nexus is a multi-chain liquidity pool tracking dashboard with interactive IL simulation. Supports EVM chains (Ethereum, Arbitrum, Base, etc.) and Solana.

## STRUCTURE
```
lp-nexus/
├── app/                    # Next.js 15 App Router
│   ├── (dashboard)/        # Dashboard layout + positions
│   ├── simulator/          # Global simulator route
│   ├── layout.tsx          # Root providers (wagmi, Solana, themes)
│   └── page.tsx            # Landing page
├── components/             # React components
│   ├── ui/                 # shadcn/ui base components
│   ├── wallet/             # Multi-chain wallet connection
│   ├── positions/          # Position cards + detail
│   ├── simulator/          # IL Simulator interactive UI
│   ├── charts/             # TradingView lightweight-charts
│   └── common/             # Logo, shared elements
├── lib/
│   ├── web3/               # wagmi config + viem clients + Solana
│   ├── api/                # Subgraph queries (Uniswap V3)
│   └── calculations/       # IL math + Monte Carlo engine
├── hooks/                  # usePositions, usePositionDetail
├── types/                  # Position, Token, Chain types
├── store/                  # Zustand wallet store
└── e2e/                    # Playwright tests
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new page | `app/(dashboard)/` | Use route groups for layout |
| New UI component | `components/ui/` | Follow shadcn pattern |
| Web3 config | `lib/web3/` | wagmi + Solana adapters |
| Position fetching | `hooks/usePositions.ts` | TanStack Query + subgraphs |
| IL calculations | `lib/calculations/` | V3 whitepaper formulas |
| Price charts | `components/charts/` | lightweight-charts wrapper |
| Wallet connect | `components/wallet/` | Multi-selector modal |

## CONVENTIONS

### Component Pattern
```tsx
// shadcn/ui style
interface Props { }
export function Component({ }: Props) { }
```

### Web3 Pattern
- wagmi for EVM chains via RainbowKit
- Solana Wallet Adapter for Solana
- viem for RPC calls with multicall batching

### Styling
- Tailwind CSS with CSS variables for theming
- Dark mode default (zinc-950 base)
- Glassmorphism: `bg-zinc-950/80 backdrop-blur-xl`

### State Management
- Zustand for wallet connections (persisted)
- TanStack Query for server state (15s refresh)
- React state for UI only

## ANTI-PATTERNS

- **NEVER** commit `.env` files (already in .gitignore)
- **NEVER** use `as any` or `@ts-ignore`
- **NEVER** mix server/client logic in same file without "use client"
- **ALWAYS** use `cn()` utility for class merging
- **ALWAYS** add tooltips for calculation explanations

## COMMANDS

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run test         # Vitest unit tests
npm run e2e          # Playwright E2E tests
```

## NOTES

- Subgraph queries use TheGraph gateway (requires API key for production)
- Monte Carlo runs client-side (10k simulations ~200ms)
- PWA configured with @ducanh2912/next-pwa
- React 19 RC used (update to stable when released)
