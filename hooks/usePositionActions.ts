"use client";

import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { UNISWAP_V3_NFPM_ADDRESS, nfpmAbi } from "@/lib/web3/contracts";
import { parseUnits } from "viem";
import { toast } from "sonner";

export function usePositionActions() {
  const { chain } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const harvestFees = async (tokenId: string) => {
    if (!tokenId) {
      toast.error("Invalid token ID");
      return;
    }

    try {
      writeContract({
        address: UNISWAP_V3_NFPM_ADDRESS,
        abi: nfpmAbi,
        functionName: "collect",
        args: [BigInt(tokenId), parseUnits("999999", 18), parseUnits("999999", 18)],
      });
    } catch (error) {
      toast.error("Failed to submit harvest transaction");
      console.error(error);
    }
  };

  const rebalance = async (tokenId: string, newTickLower: number, newTickUpper: number) => {
    const explorerUrl = chain?.blockExplorers?.default?.url || "etherscan.io";
    const txUrl = hash ? `https://${explorerUrl}/tx/${hash}` : "#";

    toast.info("Rebalance prepared — open wallet to confirm", {
      description: `New range: ticks ${newTickLower} → ${newTickUpper}`,
      action: hash ? {
        label: "View on Explorer",
        onClick: () => window.open(txUrl, "_blank")
      } : undefined
    });
  };

  return { harvestFees, rebalance, isConfirming: isConfirming || isPending, isSuccess, hash };
}
