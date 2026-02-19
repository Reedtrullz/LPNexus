import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WatchedAddress = {
  address: string;
  chain: string;
  type: "wallet" | "watch";
  label?: string;
};

interface WalletState {
  connectedAddresses: WatchedAddress[];
  addAddress: (address: WatchedAddress) => void;
  removeAddress: (address: string) => void;
  clearAddresses: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      connectedAddresses: [],
      addAddress: (address) =>
        set((state) => ({
          connectedAddresses: [
            ...state.connectedAddresses.filter((a) => a.address !== address.address),
            address,
          ],
        })),
      removeAddress: (address) =>
        set((state) => ({
          connectedAddresses: state.connectedAddresses.filter((a) => a.address !== address),
        })),
      clearAddresses: () => set({ connectedAddresses: [] }),
    }),
    {
      name: "lp-nexus-wallets",
    }
  )
);
