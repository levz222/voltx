export type NavId =
  | "favorites"
  | "recent"
  | "slots"
  | "live-casino"
  | "crash"
  | "sportsbook"
  | "promotions"
  | "affiliate"
  | "support";

export type LobbyTab = "casino" | "sports";

export type TokenId = "BTC" | "ETH" | "USDT";

export type TokenOption = {
  id: TokenId;
  label: string;
  balance: number;
  unit: string;
};

export type GameCategory = "slots" | "live" | "crash";

export type GameCard = {
  id: string;
  title: string;
  studio: string;
  rtp: string;
  tone: "acid" | "mint" | "ash";
  category: GameCategory;
};

export type SportCard = {
  id: string;
  league: string;
  match: string;
  kickoff: string;
  markets: string;
};

export type LiveBet = {
  id: string;
  game: string;
  player: string;
  time: string;
  betAmount: string;
  multiplier: string;
  payout: number;
};

export const TOKENS: TokenOption[] = [
  { id: "BTC", label: "Bitcoin", balance: 0.1842, unit: "BTC" },
  { id: "ETH", label: "Ethereum", balance: 3.905, unit: "ETH" },
  { id: "USDT", label: "Tether", balance: 12840.5, unit: "USDT" },
];

export const GAMES: GameCard[] = [
  { id: "crash", title: "Volt Crash", studio: "Ashworks", rtp: "99%", tone: "mint", category: "crash" },
  { id: "mines", title: "Obsidian Mines", studio: "Basalt", rtp: "99%", tone: "acid", category: "crash" },
  { id: "dice", title: "Acid Dice", studio: "Lime Lab", rtp: "99%", tone: "mint", category: "crash" },
  { id: "roulette", title: "Neon Roulette", studio: "Core Table", rtp: "99%", tone: "ash", category: "live" },
  { id: "plinko", title: "Plinko Peak", studio: "Dropline", rtp: "99%", tone: "acid", category: "crash" },
  { id: "blackjack", title: "VIP Blackjack", studio: "Felt Room", rtp: "99%", tone: "mint", category: "live" },
  { id: "keno", title: "Toxic Keno", studio: "Gridplay", rtp: "99%", tone: "ash", category: "slots" },
  { id: "hilo", title: "Hi-Lo Pulse", studio: "Signal", rtp: "99%", tone: "acid", category: "crash" },
  { id: "reels", title: "Lava Reels", studio: "Ashworks", rtp: "99%", tone: "acid", category: "slots" },
  { id: "fortune", title: "Mint Fortune", studio: "Lime Lab", rtp: "99%", tone: "mint", category: "slots" },
  { id: "wilds", title: "Volcanic Wilds", studio: "Basalt", rtp: "99%", tone: "ash", category: "slots" },
  { id: "sevens", title: "Obsidian Sevens", studio: "Core Table", rtp: "99%", tone: "mint", category: "slots" },
  { id: "cherries", title: "Acid Cherries", studio: "Gridplay", rtp: "99%", tone: "acid", category: "slots" },
  { id: "fruits", title: "Pulse Fruits", studio: "Signal", rtp: "99%", tone: "mint", category: "slots" },
  { id: "neon777", title: "Neon 777", studio: "Felt Room", rtp: "99%", tone: "ash", category: "slots" },
  { id: "baccarat", title: "Speed Baccarat", studio: "Core Table", rtp: "99%", tone: "mint", category: "live" },
  { id: "pit", title: "Lightning Pit", studio: "Felt Room", rtp: "99%", tone: "acid", category: "live" },
];

export const POPULAR_GAME_IDS = [
  "crash",
  "mines",
  "dice",
  "roulette",
  "plinko",
  "blackjack",
  "keno",
  "hilo",
] as const;

export function navForCategory(category: GameCategory): NavId {
  if (category === "live") return "live-casino";
  if (category === "crash") return "crash";
  return "slots";
}

export const NAV_LABELS: Record<NavId, string> = {
  favorites: "Favorites",
  recent: "Recent Games",
  slots: "Slots",
  "live-casino": "Live Casino",
  crash: "Crash Games",
  sportsbook: "Sportsbook",
  promotions: "Promotions",
  affiliate: "Affiliate",
  support: "Support",
};

export const SPORTS: SportCard[] = [
  { id: "s1", league: "Premier League", match: "Arsenal vs Chelsea", kickoff: "17:30", markets: "1X2 · Totals" },
  { id: "s2", league: "NBA", match: "Lakers vs Celtics", kickoff: "02:10", markets: "Spread · Moneyline" },
  { id: "s3", league: "UFC", match: "Main Event Bout", kickoff: "23:00", markets: "Winner · Method" },
  { id: "s4", league: "La Liga", match: "Madrid vs Barca", kickoff: "21:00", markets: "1X2 · BTTS" },
  { id: "s5", league: "NHL", match: "Rangers vs Bruins", kickoff: "01:00", markets: "Puck line" },
  { id: "s6", league: "MLB", match: "Yankees vs Dodgers", kickoff: "19:45", markets: "Run line" },
  { id: "s7", league: "F1", match: "Monaco GP", kickoff: "15:00", markets: "Winner · Podium" },
  { id: "s8", league: "Tennis", match: "Open Final", kickoff: "16:20", markets: "Match · Sets" },
];

export const LIVE_BETS: LiveBet[] = [
  { id: "b1", game: "Volt Crash", player: "a****k", time: "2s ago", betAmount: "0.012 BTC", multiplier: "2.41x", payout: 0.0289 },
  { id: "b2", game: "Acid Dice", player: "m****7", time: "4s ago", betAmount: "120 USDT", multiplier: "0.00x", payout: 0 },
  { id: "b3", game: "Neon Roulette", player: "k****n", time: "6s ago", betAmount: "0.41 ETH", multiplier: "1.98x", payout: 0.8118 },
  { id: "b4", game: "Obsidian Mines", player: "x****9", time: "9s ago", betAmount: "50 USDT", multiplier: "0.00x", payout: 0 },
  { id: "b5", game: "Plinko Peak", player: "l****e", time: "11s ago", betAmount: "0.004 BTC", multiplier: "8.20x", payout: 0.0328 },
  { id: "b6", game: "VIP Blackjack", player: "s****r", time: "14s ago", betAmount: "1.10 ETH", multiplier: "2.00x", payout: 2.2 },
  { id: "b7", game: "Hi-Lo Pulse", player: "p****y", time: "18s ago", betAmount: "25 USDT", multiplier: "0.00x", payout: 0 },
  { id: "b8", game: "Toxic Keno", player: "n****0", time: "21s ago", betAmount: "0.08 ETH", multiplier: "3.15x", payout: 0.252 },
];

export const HERO_SLIDES = [
  {
    id: "deposit",
    kicker: "FIRST DEPOSIT",
    title: "200% MATCH",
    copy: "Ignite your vault. First crypto deposit unlocks a double-stack bonus up to 1 BTC.",
    cta: "Deposit now",
    tone: "acid" as const,
  },
  {
    id: "vip",
    kicker: "VIP OBSIDIAN",
    title: "LEVEL 12+",
    copy: "Dedicated hosts, faster rakes, and mint-tier cashback on every settled wager.",
    cta: "View VIP",
    tone: "mint" as const,
  },
  {
    id: "crash",
    kicker: "WEEKLY ARENA",
    title: "CRASH CUP",
    copy: "Highest multipliers of the week share a 50,000 USDT prize pool.",
    cta: "Enter lobby",
    tone: "acid" as const,
  },
];
