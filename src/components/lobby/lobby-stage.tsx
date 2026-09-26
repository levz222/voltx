"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroBanner } from "@/components/lobby/hero-banner";
import { GameCardGrid, SportsCardGrid } from "@/components/lobby/game-grids";
import { LiveBetsTable } from "@/components/lobby/live-bets-table";
import {
  AffiliatePanel,
  PromotionsPanel,
  SupportPanel,
} from "@/components/lobby/section-views";
import {
  GAMES,
  NAV_LABELS,
  POPULAR_GAME_IDS,
  type GameCard,
  type LobbyTab,
  type NavId,
} from "@/lib/app-data";

type LobbyStageProps = {
  nav: NavId | null;
  tab: LobbyTab;
  onTabChange: (tab: LobbyTab) => void;
  onHeroCta: (slideId: string) => void;
  favorites: string[];
  recentIds: string[];
  onToggleFavorite: (id: string) => void;
  onQuickPlay: (game: GameCard) => void;
};

function gamesForNav(nav: NavId | null, favorites: string[], recentIds: string[]) {
  if (nav === "favorites") return GAMES.filter((game) => favorites.includes(game.id));
  if (nav === "recent") {
    return recentIds
      .map((id) => GAMES.find((game) => game.id === id))
      .filter((game): game is GameCard => Boolean(game));
  }
  if (nav === "slots") return GAMES.filter((game) => game.category === "slots");
  if (nav === "live-casino") return GAMES.filter((game) => game.category === "live");
  if (nav === "crash") return GAMES.filter((game) => game.category === "crash");
  const popular = new Set<string>(POPULAR_GAME_IDS);
  return GAMES.filter((game) => popular.has(game.id));
}

export function LobbyStage({
  nav,
  tab,
  onTabChange,
  onHeroCta,
  favorites,
  recentIds,
  onToggleFavorite,
  onQuickPlay,
}: LobbyStageProps) {
  if (nav === "promotions" || nav === "affiliate" || nav === "support") {
    return (
      <div className="flex flex-col gap-4 p-4 pb-24 md:pb-4">
        {nav === "promotions" ? <PromotionsPanel onAction={onHeroCta} /> : null}
        {nav === "affiliate" ? <AffiliatePanel /> : null}
        {nav === "support" ? <SupportPanel /> : null}
      </div>
    );
  }

  const games = gamesForNav(nav, favorites, recentIds);
  const heading =
    nav && nav !== "sportsbook" ? NAV_LABELS[nav] : "Popular";
  const emptyTitle =
    nav === "favorites" ? "No favorites yet" : nav === "recent" ? "No recent games" : "No games";
  const emptyCopy =
    nav === "favorites"
      ? "Tap the heart on a card and it will stay in this list."
      : nav === "recent"
        ? "Quick Play a game and it will show up here."
        : "Nothing is listed in this category.";

  return (
    <div className="flex flex-col gap-4 p-4 pb-24 md:pb-4">
      <HeroBanner onCta={onHeroCta} />

      <Tabs
        value={tab}
        onValueChange={(value) => onTabChange(value as LobbyTab)}
        className="gap-4"
      >
        <TabsList className="h-10 rounded-lg border border-gunmetal bg-ash p-1">
          <TabsTrigger
            value="casino"
            className="rounded-md px-4 text-faded data-active:bg-volcanic data-active:text-acid"
          >
            Casino Lobby
          </TabsTrigger>
          <TabsTrigger
            value="sports"
            className="rounded-md px-4 text-faded data-active:bg-volcanic data-active:text-mint"
          >
            Sports Betting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="casino" className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <h2 className="text-sm font-semibold text-offwhite">{heading}</h2>
            <p className="text-xs text-faded">{games.length} games</p>
          </div>
          <GameCardGrid
            games={games}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onQuickPlay={onQuickPlay}
            emptyTitle={emptyTitle}
            emptyCopy={emptyCopy}
          />
          <LiveBetsTable />
        </TabsContent>
        <TabsContent value="sports" className="flex flex-col gap-4">
          <SportsCardGrid />
          <LiveBetsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
