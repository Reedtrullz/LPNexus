import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatNumber(
  value: number | string,
  options: {
    decimals?: number;
    prefix?: string;
    suffix?: string;
    compact?: boolean;
  } = {}
): string {
  const { decimals = 2, prefix = "", suffix = "", compact = false } = options;
  
  const num = typeof value === "string" ? parseFloat(value) : value;
  
  if (isNaN(num)) return `${prefix}0${suffix}`;
  
  if (compact && Math.abs(num) >= 1e9) {
    return `${prefix}${(num / 1e9).toFixed(decimals)}B${suffix}`;
  }
  if (compact && Math.abs(num) >= 1e6) {
    return `${prefix}${(num / 1e6).toFixed(decimals)}M${suffix}`;
  }
  if (compact && Math.abs(num) >= 1e3) {
    return `${prefix}${(num / 1e3).toFixed(decimals)}K${suffix}`;
  }
  
  return `${prefix}${num.toFixed(decimals)}${suffix}`;
}

export function formatCurrency(
  value: number | string,
  currency = "USD",
  options: { decimals?: number; compact?: boolean } = {}
): string {
  const { decimals = 2, compact = false } = options;
  
  const num = typeof value === "string" ? parseFloat(value) : value;
  
  if (isNaN(num)) return currency === "USD" ? "$0.00" : `0 ${currency}`;
  
  const prefix = currency === "USD" ? "$" : "";
  const suffix = currency !== "USD" ? ` ${currency}` : "";
  
  return formatNumber(num, { decimals, prefix, suffix, compact });
}

export function formatPercent(
  value: number | string,
  options: { decimals?: number; includeSign?: boolean } = {}
): string {
  const { decimals = 2, includeSign = true } = options;
  
  const num = typeof value === "string" ? parseFloat(value) : value;
  
  if (isNaN(num)) return "0.00%";
  
  const sign = includeSign && num > 0 ? "+" : "";
  return `${sign}${num.toFixed(decimals)}%`;
}
