"use client";

import { useState } from "react";
import { ChevronDown, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TOKENS, type TokenId } from "@/lib/app-data";

function formatBalance(value: number, unit: TokenId) {
  if (unit === "USDT") {
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} USDT`;
  }
  return `${value.toFixed(4)} ${unit}`;
}

type WalletControlsProps = {
  selectedToken: TokenId;
  onTokenChange: (id: TokenId) => void;
  walletOpen: boolean;
  onWalletOpenChange: (open: boolean) => void;
  compact?: boolean;
};

export function WalletControls({
  selectedToken,
  onTokenChange,
  walletOpen,
  onWalletOpenChange,
  compact = false,
}: WalletControlsProps) {
  const [depositAmount, setDepositAmount] = useState("100");
  const token = TOKENS.find((item) => item.id === selectedToken) ?? TOKENS[0];

  return (
    <>
      <div className="flex h-10 items-stretch border border-gunmetal bg-volcanic">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-2.5 text-sm outline-none hover:bg-ash focus-visible:ring-1 focus-visible:ring-mint">
            <span className="size-1.5 bg-mint shadow-[0_0_8px_var(--mint)]" />
            <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-acid">
              {token.id}
            </span>
            {!compact ? (
              <span className="hidden font-mono text-[13px] font-medium tabular-nums text-offwhite sm:inline">
                {formatBalance(token.balance, token.id)}
              </span>
            ) : null}
            <ChevronDown className="size-3.5 text-faded" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-56">
            <DropdownMenuLabel>Select token</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={selectedToken}
              onValueChange={(value) => onTokenChange(value as TokenId)}
            >
              {TOKENS.map((item) => (
                <DropdownMenuRadioItem key={item.id} value={item.id}>
                  <span className="flex w-full items-center justify-between gap-6">
                    <span className="font-mono text-[11px] tracking-[0.12em]">
                      {item.id}
                      <span className="ml-2 font-sans text-xs tracking-normal text-faded">
                        {item.label}
                      </span>
                    </span>
                    <span className="font-mono text-xs tabular-nums text-mint">
                      {item.id === "USDT"
                        ? item.balance.toLocaleString()
                        : item.balance.toFixed(4)}
                    </span>
                  </span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          type="button"
          onClick={() => onWalletOpenChange(true)}
          className="h-10 rounded-none px-3"
        >
          <Wallet className="size-4" />
          <span className={compact ? "sr-only" : "hidden sm:inline"}>Wallet</span>
        </Button>
      </div>

      <Dialog open={walletOpen} onOpenChange={onWalletOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Wallet</DialogTitle>
            <DialogDescription>
              Deposit {token.id} into the volcanic vault. Ready for a Web3 connector.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <div className="border border-gunmetal bg-volcanic px-3 py-3">
              <p className="font-mono text-[10px] tracking-[0.2em] text-faded uppercase">
                Available {token.id}
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-mint [text-shadow:0_0_12px_var(--mint)]">
                {formatBalance(token.balance, token.id)}
              </p>
            </div>
            <label className="grid gap-1.5 text-sm">
              <span className="font-mono text-[10px] tracking-[0.18em] text-faded uppercase">
                Deposit amount
              </span>
              <input
                value={depositAmount}
                onChange={(event) => setDepositAmount(event.target.value)}
                className="h-10 border border-gunmetal bg-volcanic px-3 font-mono text-offwhite outline-none placeholder:text-faded focus:border-acid"
                placeholder="0.00"
              />
            </label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onWalletOpenChange(false)}
            >
              Close
            </Button>
            <Button type="button" onClick={() => onWalletOpenChange(false)}>
              Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
