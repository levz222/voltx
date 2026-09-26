"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LIVE_BETS } from "@/lib/app-data";
import { cn } from "@/lib/utils";

function formatPayout(value: number) {
  if (value <= 0) return "-";
  return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

export function LiveBetsTable() {
  return (
    <section className="overflow-hidden border border-gunmetal bg-ash">
      <div className="flex items-center justify-between border-b border-gunmetal px-4 py-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.28em] text-faded uppercase">
            Tape
          </p>
          <h2 className="font-heading text-2xl leading-none font-bold tracking-wide text-offwhite uppercase">
            Live bets
          </h2>
        </div>
        <span className="flex items-center gap-2 font-mono text-[10px] font-medium tracking-[0.18em] text-mint uppercase">
          <span className="size-1.5 animate-pulse bg-mint shadow-[0_0_8px_var(--mint)]" />
          Live
        </span>
      </div>
      <Table>
        <TableHeader className="bg-volcanic/60">
          <TableRow className="hover:bg-transparent">
            <TableHead>Game</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Bet Amount</TableHead>
            <TableHead>Multiplier</TableHead>
            <TableHead className="text-right">Payout</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LIVE_BETS.map((bet) => {
            const won = bet.payout > 0;
            return (
              <TableRow
                key={bet.id}
                className={cn(won && "bg-mint/4 shadow-[inset_2px_0_0_var(--mint)]")}
              >
                <TableCell className="font-sans text-sm font-medium text-offwhite">
                  {bet.game}
                </TableCell>
                <TableCell className="text-faded">{bet.player}</TableCell>
                <TableCell className="text-faded">{bet.time}</TableCell>
                <TableCell className="tabular-nums text-offwhite">
                  {bet.betAmount}
                </TableCell>
                <TableCell
                  className={cn(
                    "tabular-nums",
                    won ? "text-acid" : "text-faded"
                  )}
                >
                  {bet.multiplier}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right tabular-nums",
                    won
                      ? "font-semibold text-mint [text-shadow:0_0_10px_var(--mint)]"
                      : "text-faded"
                  )}
                >
                  {formatPayout(bet.payout)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
