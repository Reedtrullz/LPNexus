# components/ - AGENTS.md

**Purpose:** React component library with shadcn/ui base + custom DeFi components

## STRUCTURE

```
components/
├── ui/               # shadcn/ui primitive components
│   ├── button.tsx
│   ├── card.tsx
│   ├── slider.tsx
│   └── ...           # Badge, Tooltip, Tabs, Skeleton
├── wallet/           # Wallet connection
│   └── WalletMultiSelector.tsx
├── positions/        # LP position displays
│   └── PositionCard.tsx
├── simulator/        # IL Simulator UI
│   └── ILSimulator.tsx
├── charts/           # Chart wrappers
│   └── PricePathChart.tsx
└── common/           # Shared elements
    └── Logo.tsx
```

## CONVENTIONS

### shadcn/ui Components
- Use `class-variance-authority` for variants
- Export both component and `xxxVariants` helper
- Support `asChild` prop for composition
- Style with Tailwind, use `cn()` utility

### Custom Components
- Props interface always exported
- Framer Motion for animations (`whileHover`, `animate`)
- Lucide React for icons
- Glassmorphism: `bg-zinc-950/80 border-zinc-800`

### Component Template
```tsx
"use client";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function Component({ className }: Props) {
  return <div className={cn("base-classes", className)} />;
}
```

## WHERE TO LOOK

| Add | Location |
|-----|----------|
| New shadcn component | `ui/` - copy from shadcn registry |
| Wallet-related | `wallet/` |
| Position display | `positions/` |
| Chart types | `charts/` |
| Shared branding | `common/` |

## ANTI-PATTERNS

- **NEVER** import server-only code in components (no fs, no db)
- **NEVER** use default exports (always named)
- **ALWAYS** add `"use client"` if using hooks or browser APIs
- **ALWAYS** forward ref when wrapping interactive elements

## DEPENDENCIES

- Radix UI primitives (via shadcn)
- Framer Motion for animations
- Lucide React for icons
- Lightweight Charts for price data
