import { formatUnits } from "viem";

interface Deposit {
  amount0: bigint;
  amount1: bigint;
  timestamp: number;
}

interface Prices {
  price0: number;
  price1: number;
}

/**
 * Calculate smart entry price using weighted average from all deposits
 * Weights by USD value at time of deposit (current prices used as proxy)
 * Full subgraph deposit history integration in Phase 5
 */
export function calculateSmartEntryPrice(
  deposits: Deposit[],
  currentPrices: Prices
): number {
  if (deposits.length === 0) return currentPrices.price0;

  let totalWeight = 0;
  let weightedPriceSum = 0;

  deposits.forEach((deposit) => {
    const amount0Num = Number(formatUnits(deposit.amount0, 18));
    const amount1Num = Number(formatUnits(deposit.amount1, 18));

    const value0 = amount0Num * currentPrices.price0;
    const value1 = amount1Num * currentPrices.price1;
    const totalValue = value0 + value1;

    if (totalValue > 0) {
      const depositPrice = value1 / amount1Num;
      weightedPriceSum += depositPrice * totalValue;
      totalWeight += totalValue;
    }
  });

  return totalWeight > 0 ? weightedPriceSum / totalWeight : currentPrices.price0;
}

/**
 * Calculate fee capture efficiency based on time-in-range and volatility
 * Formula: timeInRange * (1 - volatilityFactor)
 * Higher efficiency = better fee generation relative to range width
 */
export function calculateFeeCaptureEfficiency(
  timeInRange: number,
  volatility: number
): number {
  const volatilityFactor = Math.min(volatility * 0.003, 0.5);
  const efficiency = timeInRange * (1 - volatilityFactor);
  return Math.round(Math.max(0, Math.min(100, efficiency)));
}

/**
 * Calculate volatility-adjusted ROI
 * Accounts for IL risk scaled by market volatility
 * Formula: roi - (ilPercent * volatility * 0.4)
 * Negative values indicate position underperforms risk-adjusted HODL
 */
export function calculateVolatilityAdjustedROI(
  roi: number,
  ilPercent: number,
  volatility: number
): number {
  const riskAdjustment = Math.abs(ilPercent) * volatility * 0.4;
  return roi - riskAdjustment;
}

/**
 * Calculate price from tick index
 * Uniswap V3: price = 1.0001^tick
 */
export function tickToPrice(tick: number): number {
  return Math.pow(1.0001, tick);
}

/**
 * Calculate tick from price
 * Inverse of tickToPrice: tick = log(price) / log(1.0001)
 */
export function priceToTick(price: number): number {
  return Math.log(price) / Math.log(1.0001);
}

/**
 * Calculate fee APR from daily fees and TVL
 * Formula: (dailyFees * 365) / tvl * 100
 */
export function calculateFeeAPR(dailyFees: number, tvl: number): number {
  if (tvl === 0) return 0;
  return (dailyFees * 365) / tvl * 100;
}

/**
 * Estimate optimal range width based on volatility
 * Higher volatility = wider range needed to stay in-range
 * Returns multiplier for current price (e.g., 0.95 = 5% below, 1.05 = 5% above)
 */
export function estimateOptimalRange(
  volatility: number,
  confidence: number = 0.95
): { lowerMultiplier: number; upperMultiplier: number } {
  const rangeWidth = volatility * 2;
  const zScore = confidence === 0.95 ? 1.96 : confidence === 0.99 ? 2.576 : 1.645;

  return {
    lowerMultiplier: 1 - rangeWidth * zScore,
    upperMultiplier: 1 + rangeWidth * zScore,
  };
}
