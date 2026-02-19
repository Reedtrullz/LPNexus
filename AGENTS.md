# LP Nexus - AGENTS.md

**Generated:** 2026-02-19
**Project:** DeFi LP Tracking Platform
**Stack:** Next.js 15 + React 19 + TypeScript + wagmi/viem + Solana

## OVERVIEW
LP Nexus is a multi-chain liquidity pool tracking dashboard with interactive IL simulation, Grok AI chat, and real-time position tracking. Supports EVM chains and Solana.

## STRUCTURE
```
lp-nexus/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx           # Landing + Dashboard (auto-switch)
│   ├── layout.tsx         # Root providers
│   ├── simulator/         # IL Simulator page
│   ├── dashboard/        # Protected dashboard routes
│   │   └── positions/    # Position detail pages
│   └── api/               # API routes
│       ├── grok/         # Grok AI proxy
│       └── health/        # Health check
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   ├── wallet/           # Multi-chain wallet connection
│   ├── positions/        # Position cards + detail
│   ├── simulator/         # IL Simulator UI
│   ├── charts/           # TradingView lightweight-charts
│   ├── common/           # Logo, shared elements
│   ├── Navbar.tsx       # Navigation
│   ├── Sidebar.tsx       # Collapsible dashboard sidebar
│   ├── GrokChat.tsx     # AI chat sidebar
│   └── AnimatedOrbs.tsx # Hero background animation
├── lib/
│   ├── web3/            # wagmi config + viem clients + Solana
│   ├── api/             # Subgraph queries (Uniswap V3)
│   └── calculations/     # IL math + Monte Carlo engine
├── hooks/                # usePositions, usePositionDetail
├── store/               # Zustand wallet store
├── types/                # Position, Token, Chain types
└── e2e/                 # Playwright tests
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Landing page | `app/page.tsx` | Auto-switches to dashboard when wallet connected |
| Dashboard | `app/page.tsx` | Shows KPIs, positions, Grok chat |
| Simulator | `app/simulator/page.tsx` | Monte-Carlo with volatility slider |
| Web3 config | `lib/web3/wagmiConfig.ts` | 8 chains configured |
| Position fetching | `hooks/usePositions.ts` | TanStack Query + subgraphs |
| IL calculations | `lib/calculations/` | V3 whitepaper formulas |
| Grok AI proxy | `app/api/grok/route.ts` | xAI API proxy |
| Wallet connect | `components/wallet/` | RainbowKit + Solana |

## CONVENTIONS

### Component Pattern
```tsx
interface Props { }
export function Component({ }: Props) { }
```

### Web3 Pattern
- wagmi for EVM chains via RainbowKit
- Solana Wallet Adapter for Solana
- viem for RPC calls

### Styling
- Tailwind CSS with CSS variables
- Dark mode default (#050507 base)
- Glassmorphism: `glass` class with backdrop blur

### State Management
- Zustand for wallet connections (persisted)
- TanStack Query for server state (15s refresh)
- React state for UI only

## ANTI-PATTERNS

- **NEVER** commit `.env` files
- **NEVER** use `as any` or `@ts-ignore`
- **NEVER** mix server/client logic without "use client"
- **ALWAYS** use `cn()` utility for class merging

## COMMANDS

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run test         # Vitest unit tests
npm run e2e          # Playwright E2E tests
```

## NOTES

- Subgraph queries use TheGraph (API key recommended)
- Monte Carlo runs client-side (1000 paths)
- PWA configured with @ducanh2912/next-pwa
- Grok AI requires GROK_API_KEY env var
