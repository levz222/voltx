"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WalletControls } from "@/components/wallet/wallet-controls";
import type { TokenId } from "@/lib/app-data";

type AppHeaderProps = {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  selectedToken: TokenId;
  onTokenChange: (id: TokenId) => void;
  walletOpen: boolean;
  onWalletOpenChange: (open: boolean) => void;
};

export function AppHeader({
  onToggleSidebar,
  onOpenSearch,
  selectedToken,
  onTokenChange,
  walletOpen,
  onWalletOpenChange,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-gunmetal bg-ash px-3 md:px-4">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-acid via-mint to-transparent" />

      <div className="flex min-w-0 items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-offwhite hover:text-mint"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </Button>
        <div className="flex items-center gap-2.5">
          <span className="relative grid size-8 place-items-center border border-gunmetal bg-volcanic">
            <span className="absolute top-0 right-0 size-1.5 bg-acid" />
            <svg viewBox="0 0 16 16" className="size-4 text-acid" aria-hidden>
              <path
                d="M9.2 1 3 9.2h4.2L6.4 15 13 6.6H8.6L9.2 1Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <div className="hidden leading-none sm:block">
            <p className="font-heading text-[22px] font-extrabold tracking-[0.14em] text-offwhite">
              VOLT<span className="text-acid">X</span>
            </p>
            <p className="mt-0.5 font-mono text-[9px] tracking-[0.32em] text-faded uppercase">
              Volcanic floor
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onOpenSearch}
          className="hidden md:inline-flex"
          aria-label="Search"
        >
          <Search className="size-4" />
        </Button>

        <WalletControls
          selectedToken={selectedToken}
          onTokenChange={onTokenChange}
          walletOpen={walletOpen}
          onWalletOpenChange={onWalletOpenChange}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Notifications"
        >
          <span className="relative">
            <Bell className="size-4" />
            <span className="absolute -top-0.5 -right-0.5 size-1.5 bg-mint shadow-[0_0_8px_var(--mint)]" />
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none focus-visible:ring-1 focus-visible:ring-mint">
            <Avatar>
              <AvatarFallback>LX</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-44">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gunmetal" />
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Transactions</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
