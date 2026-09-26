"use client";

import { useState } from "react";
import { Heart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GAMES, SPORTS, type GameCard, type SportCard } from "@/lib/app-data";
import { cn } from "@/lib/utils";

type GameCardGridProps = {
  games?: GameCard[];
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  onQuickPlay?: (game: GameCard) => void;
  emptyTitle?: string;
  emptyCopy?: string;
};

export function GameCardGrid({
  games = GAMES,
  favorites = [],
  onToggleFavorite,
  onQuickPlay,
  emptyTitle = "No games in this list",
  emptyCopy = "Pick another category from the sidebar.",
}: GameCardGridProps) {
  if (games.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gunmetal bg-ash px-4 py-12 text-center">
        <p className="text-sm font-semibold text-offwhite">{emptyTitle}</p>
        <p className="mt-1 text-xs text-faded">{emptyCopy}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
      {games.map((game) => {
        const saved = favorites.includes(game.id);
        return (
          <article
            key={game.id}
            className="group relative aspect-video overflow-hidden rounded-lg border border-gunmetal bg-ash transition-transform duration-200 hover:scale-[1.02]"
          >
            <div
              className={cn(
                "absolute inset-0",
                game.tone === "mint" &&
                  "bg-[linear-gradient(160deg,color-mix(in_srgb,var(--mint)_28%,var(--volcanic)),var(--ash)_62%)]",
                game.tone === "acid" &&
                  "bg-[linear-gradient(160deg,color-mix(in_srgb,var(--acid)_26%,var(--volcanic)),var(--ash)_64%)]",
                game.tone === "ash" &&
                  "bg-[linear-gradient(160deg,var(--gunmetal),var(--volcanic)_70%)]"
              )}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--volcanic),transparent_55%)]" />
            <button
              type="button"
              aria-label={saved ? `Remove ${game.title} from favorites` : `Save ${game.title}`}
              onClick={() => onToggleFavorite?.(game.id)}
              className="absolute top-2 left-2 z-30 grid size-7 place-items-center rounded-md border border-gunmetal bg-volcanic/80 text-faded hover:text-acid"
            >
              <Heart className={cn("size-3.5", saved && "fill-acid text-acid")} />
            </button>
            <div className="absolute inset-x-3 bottom-3 z-10 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-offwhite">{game.title}</h3>
                <p className="truncate text-[11px] text-faded">{game.studio}</p>
              </div>
              <span className="shrink-0 text-[10px] font-medium text-faded">
                RTP: {game.rtp}
              </span>
            </div>
            <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center bg-volcanic/70 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              <Button
                type="button"
                onClick={() => onQuickPlay?.(game)}
                className="h-9 bg-mint font-bold text-volcanic hover:bg-acid"
              >
                <Play className="size-4 fill-current" />
                Quick Play
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function SportsCardGrid() {
  const [slip, setSlip] = useState<SportCard | null>(null);
  const [stake, setStake] = useState("25");
  const [saved, setSaved] = useState(false);

  function openSlip(event: SportCard) {
    setSlip(event);
    setStake("25");
    setSaved(false);
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SPORTS.map((event) => (
          <article
            key={event.id}
            className="rounded-lg border border-gunmetal bg-ash p-4 transition-transform duration-200 hover:scale-[1.02]"
          >
            <p className="text-[10px] font-semibold tracking-[0.18em] text-mint uppercase">
              {event.league}
            </p>
            <h3 className="mt-2 text-base font-semibold text-offwhite">{event.match}</h3>
            <p className="mt-1 text-xs text-faded">
              {event.kickoff} · {event.markets}
            </p>
            <Button
              type="button"
              onClick={() => openSlip(event)}
              className="mt-4 h-8 w-full bg-acid text-xs font-bold text-volcanic hover:bg-mint"
            >
              Place bet
            </Button>
          </article>
        ))}
      </div>

      <Dialog open={slip !== null} onOpenChange={(open) => !open && setSlip(null)}>
        <DialogContent className="border-gunmetal bg-ash text-offwhite">
          <DialogHeader>
            <DialogTitle>{slip?.match}</DialogTitle>
            <DialogDescription className="text-faded">
              {slip?.league} · {slip?.markets}. This slip stays in the browser. Nothing is sent.
            </DialogDescription>
          </DialogHeader>
          <label className="grid gap-1.5 text-sm">
            <span className="text-faded">Stake (USDT)</span>
            <input
              value={stake}
              onChange={(event) => {
                setStake(event.target.value);
                setSaved(false);
              }}
              className="h-10 rounded-md border border-gunmetal bg-volcanic px-3 text-offwhite outline-none focus:border-mint"
            />
          </label>
          {saved ? (
            <p className="text-sm font-medium text-mint">Slip saved on this device.</p>
          ) : null}
          <DialogFooter className="border-gunmetal bg-volcanic/40">
            <Button
              type="button"
              variant="outline"
              className="border-gunmetal bg-transparent text-offwhite hover:bg-volcanic"
              onClick={() => setSlip(null)}
            >
              Close
            </Button>
            <Button
              type="button"
              className="bg-acid font-bold text-volcanic hover:bg-mint"
              onClick={() => setSaved(true)}
            >
              Save slip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
