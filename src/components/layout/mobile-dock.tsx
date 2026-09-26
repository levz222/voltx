"use client";

import { Joystick, Menu, Search, Trophy, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LobbyTab } from "@/lib/app-data";

type MobileDockProps = {
  lobbyTab: LobbyTab;
  onMenu: () => void;
  onSearch: () => void;
  onWallet: () => void;
  onTabChange: (tab: LobbyTab) => void;
};

export function MobileDock({
  lobbyTab,
  onMenu,
  onSearch,
  onWallet,
  onTabChange,
}: MobileDockProps) {
  const items = [
    { id: "menu", label: "Menu", icon: Menu, action: onMenu, active: false },
    { id: "search", label: "Search", icon: Search, action: onSearch, active: false },
    { id: "wallet", label: "Wallet", icon: Wallet, action: onWallet, active: false },
    {
      id: "casino",
      label: "Casino",
      icon: Joystick,
      action: () => onTabChange("casino"),
      active: lobbyTab === "casino",
    },
    {
      id: "sports",
      label: "Sports",
      icon: Trophy,
      action: () => onTabChange("sports"),
      active: lobbyTab === "sports",
    },
  ] as const;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gunmetal bg-ash pb-[max(0.25rem,env(safe-area-inset-bottom))] md:hidden">
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          const wallet = item.id === "wallet";
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={item.action}
                className={cn(
                  "relative flex w-full flex-col items-center gap-1 py-2.5 font-mono text-[9px] font-medium tracking-[0.14em] uppercase",
                  wallet
                    ? "text-acid"
                    : item.active
                      ? "text-mint"
                      : "text-faded"
                )}
              >
                {item.active ? (
                  <span className="absolute inset-x-3 top-0 h-[2px] bg-mint" />
                ) : null}
                <Icon className="size-4" />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
