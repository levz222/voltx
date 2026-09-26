"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { LobbyStage } from "@/components/lobby/lobby-stage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  GAMES,
  navForCategory,
  type GameCard,
  type LobbyTab,
  type NavId,
  type TokenId,
} from "@/lib/app-data";

const MobileDock = dynamic(
  () =>
    import("@/components/layout/mobile-dock").then((mod) => mod.MobileDock),
  { ssr: false }
);

export function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavId | null>(null);
  const [lobbyTab, setLobbyTab] = useState<LobbyTab>("casino");
  const [selectedToken, setSelectedToken] = useState<TokenId>("BTC");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [playing, setPlaying] = useState<GameCard | null>(null);

  const searchResults = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return GAMES.slice(0, 6);
    return GAMES.filter((game) =>
      `${game.title} ${game.studio} ${game.category}`.toLowerCase().includes(needle)
    );
  }, [query]);

  function handleNavSelect(id: NavId) {
    setActiveNav(id);
    setMobileMenuOpen(false);
    if (id === "sportsbook") setLobbyTab("sports");
    if (
      id === "slots" ||
      id === "live-casino" ||
      id === "crash" ||
      id === "favorites" ||
      id === "recent"
    ) {
      setLobbyTab("casino");
    }
  }

  function handleTabChange(tab: LobbyTab) {
    setLobbyTab(tab);
    setActiveNav(tab === "sports" ? "sportsbook" : null);
  }

  function handleSidebarToggle() {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setMobileMenuOpen(true);
      return;
    }
    setSidebarCollapsed((value) => !value);
  }

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function handleQuickPlay(game: GameCard) {
    setRecentIds((current) =>
      [game.id, ...current.filter((id) => id !== game.id)].slice(0, 8)
    );
    setPlaying(game);
  }

  function openGameFromSearch(game: GameCard) {
    setActiveNav(navForCategory(game.category));
    setLobbyTab("casino");
    setSearchOpen(false);
    setQuery("");
  }

  function handleHeroCta(slideId: string) {
    if (slideId === "deposit") setWalletOpen(true);
    if (slideId === "vip") setActiveNav("promotions");
    if (slideId === "crash") {
      setActiveNav("crash");
      setLobbyTab("casino");
    }
  }

  return (
    <div className="flex min-h-svh bg-volcanic text-offwhite">
      <aside
        className={
          sidebarCollapsed
            ? "sticky top-0 hidden h-svh w-16 shrink-0 overflow-y-auto border-r border-gunmetal bg-ash transition-[width] duration-200 md:block"
            : "sticky top-0 hidden h-svh w-60 shrink-0 overflow-y-auto border-r border-gunmetal bg-ash transition-[width] duration-200 md:block"
        }
      >
        <SidebarNav
          activeId={activeNav}
          collapsed={sidebarCollapsed}
          onSelect={handleNavSelect}
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          onToggleSidebar={handleSidebarToggle}
          onOpenSearch={() => setSearchOpen(true)}
          selectedToken={selectedToken}
          onTokenChange={setSelectedToken}
          walletOpen={walletOpen}
          onWalletOpenChange={setWalletOpen}
        />
        <main className="min-h-0 flex-1 overflow-y-auto bg-volcanic">
          <LobbyStage
            nav={activeNav}
            tab={lobbyTab}
            onTabChange={handleTabChange}
            onHeroCta={handleHeroCta}
            favorites={favorites}
            recentIds={recentIds}
            onToggleFavorite={toggleFavorite}
            onQuickPlay={handleQuickPlay}
          />
        </main>
      </div>

      <MobileDock
        lobbyTab={lobbyTab}
        onMenu={() => setMobileMenuOpen(true)}
        onSearch={() => setSearchOpen(true)}
        onWallet={() => setWalletOpen(true)}
        onTabChange={handleTabChange}
      />

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="left"
          className="w-72 border-gunmetal bg-ash p-0 text-offwhite sm:max-w-72"
        >
          <SheetHeader className="border-b border-gunmetal px-4 py-4">
            <SheetTitle className="text-offwhite">Navigation</SheetTitle>
          </SheetHeader>
          <SidebarNav activeId={activeNav} onSelect={handleNavSelect} />
        </SheetContent>
      </Sheet>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="border-gunmetal bg-ash text-offwhite">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription className="text-faded">
              Look up games by title, studio, or category.
            </DialogDescription>
          </DialogHeader>
          <label className="relative">
            <Search className="pointer-events-none absolute top-2.5 left-3 size-4 text-faded" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Crash, roulette, slots..."
              className="h-10 w-full rounded-md border border-gunmetal bg-volcanic pr-3 pl-9 text-sm text-offwhite outline-none placeholder:text-faded focus:border-mint"
            />
          </label>
          <ul className="max-h-64 overflow-y-auto">
            {searchResults.length === 0 ? (
              <li className="px-2 py-3 text-sm text-faded">No games match that search.</li>
            ) : (
              searchResults.map((game) => (
                <li key={game.id}>
                  <button
                    type="button"
                    onClick={() => openGameFromSearch(game)}
                    className="flex w-full items-center justify-between gap-3 rounded-md px-2 py-2 text-left hover:bg-volcanic"
                  >
                    <span>
                      <span className="block text-sm text-offwhite">{game.title}</span>
                      <span className="text-xs text-faded">{game.studio}</span>
                    </span>
                    <span className="text-[10px] font-semibold tracking-wide text-mint uppercase">
                      {game.category}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </DialogContent>
      </Dialog>

      <Dialog open={playing !== null} onOpenChange={(open) => !open && setPlaying(null)}>
        <DialogContent className="border-gunmetal bg-ash text-offwhite">
          <DialogHeader>
            <DialogTitle>{playing?.title}</DialogTitle>
            <DialogDescription className="text-faded">
              {playing?.studio} · RTP {playing?.rtp}. Quick Play queues the title in Recent Games.
              The game runtime is not connected yet.
            </DialogDescription>
          </DialogHeader>
          <Button
            type="button"
            className="bg-mint font-bold text-volcanic hover:bg-acid"
            onClick={() => setPlaying(null)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
