/**
 * Impermanent Loss calculations for concentrated liquidity positions
 * Based on Uniswap V3 whitepaper: https://uniswap.org/whitepaper-v3.pdf
 */

/**
 * Calculate IL for a V3 position compared to HODL
 * @param sqrtP0 - Entry sqrt price (sqrt(token1/token0))
 * @param sqrtP1 - Current sqrt price
 * @returns IL as a decimal (e.g., -0.05 = 5% loss)
 */
export function calculateIL(sqrtP0: number, sqrtP1: number): number {
  if (sqrtP0 === 0 || sqrtP1 === 0) return 0;

  const ratio = sqrtP1 / sqrtP0;
  const il = (2 * ratio) / (1 + ratio) - 1;

  return il;
}

/**
 * Calculate IL for a specific liquidity position
 * @param liquidity - Position liquidity amount
 * @param sqrtP0 - Entry sqrt price
 * @param sqrtP1 - Current sqrt price
 * @param price1 - Current price of token1 in USD
 * @returns IL in USD and percentage
 */
export function calculatePositionIL(
  liquidity: bigint,
  sqrtP0: number,
  sqrtP1: number,
  price1: number
): { ilUSD: number; ilPercent: number } {
  const ilDecimal = calculateIL(sqrtP0, sqrtP1);
  const ilPercent = ilDecimal * 100;

  const liquidityNum = Number(liquidity) / 1e18;
  const ilUSD = liquidityNum * price1 * Math.abs(ilDecimal);

  return { ilUSD, ilPercent };
}

/**
 * Estimate time-in-range percentage
 * Simplified calculation based on current position in range
 * Full historical calculation requires price history (Phase 4)
 */
export function estimateTimeInRange(
  lowerTick: number,
  upperTick: number,
  currentTick: number
): number {
  const range = upperTick - lowerTick;
  const position = currentTick - lowerTick;

  if (currentTick < lowerTick) return 0;
  if (currentTick > upperTick) return 0;

  const timeInRange = Math.round((position / range) * 100);
  return Math.min(100, Math.max(0, timeInRange));
}

/**
 * Convert tick to price
 * price = 1.0001^tick
 */
export function tickToPrice(tick: number): number {
  return Math.pow(1.0001, tick);
}

/**
 * Convert sqrtPriceX96 to price
 * sqrtPriceX96 is Q96.64 format from Uniswap V3
 */
export function sqrtPriceX96ToPrice(sqrtPriceX96: bigint): number {
  const Q96 = BigInt(2) ** BigInt(96);
  const sqrtPrice = Number(sqrtPriceX96) / Number(Q96);
  return sqrtPrice * sqrtPrice;
}

/**
 * Calculate position value from liquidity and price
 */
export function calculatePositionValue(
  liquidity: bigint,
  sqrtPrice: number,
  tickLower: number,
  tickUpper: number,
  price0: number,
  price1: number
): { value0: number; value1: number; totalUSD: number } {
  const L = Number(liquidity);
  const P = sqrtPrice * sqrtPrice;
  const Pa = Math.pow(1.0001, tickLower);
  const Pb = Math.pow(1.0001, tickUpper);

  let amount0 = 0;
  let amount1 = 0;

  if (P <= Pa) {
    amount0 = L * (1 / Math.sqrt(Pa) - 1 / Math.sqrt(Pb));
    amount1 = 0;
  } else if (P >= Pb) {
    amount0 = 0;
    amount1 = L * (Math.sqrt(Pb) - Math.sqrt(Pa));
  } else {
    amount0 = L * (1 / Math.sqrt(P) - 1 / Math.sqrt(Pb));
    amount1 = L * (Math.sqrt(P) - Math.sqrt(Pa));
  }

  const value0 = amount0 * price0;
  const value1 = amount1 * price1;

  return {
    value0,
    value1,
    totalUSD: value0 + value1,
  };
}
