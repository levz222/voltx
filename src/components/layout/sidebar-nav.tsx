"use client";

import {
  BadgePercent,
  Headphones,
  Heart,
  History,
  Joystick,
  Rocket,
  Sparkles,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavId } from "@/lib/app-data";

const GROUPS: {
  label: string;
  items: { id: NavId; label: string; icon: LucideIcon }[];
}[] = [
  {
    label: "Play",
    items: [
      { id: "favorites", label: "Favorites", icon: Heart },
      { id: "recent", label: "Recent Games", icon: History },
      { id: "slots", label: "Slots", icon: Sparkles },
      { id: "live-casino", label: "Live Casino", icon: Joystick },
      { id: "crash", label: "Crash Games", icon: Rocket },
    ],
  },
  {
    label: "Book",
    items: [{ id: "sportsbook", label: "Sportsbook", icon: Trophy }],
  },
  {
    label: "House",
    items: [
      { id: "promotions", label: "Promotions", icon: BadgePercent },
      { id: "affiliate", label: "Affiliate", icon: Users },
      { id: "support", label: "Support", icon: Headphones },
    ],
  },
];

type SidebarNavProps = {
  activeId: NavId | null;
  collapsed?: boolean;
  onSelect: (id: NavId) => void;
};

export function SidebarNav({
  activeId,
  collapsed = false,
  onSelect,
}: SidebarNavProps) {
  let index = 0;

  return (
    <nav className="flex h-full flex-col px-2 py-3">
      <div className="flex flex-col gap-4">
        {GROUPS.map((group) => (
          <div key={group.label} className="flex flex-col gap-0.5">
            {collapsed ? (
              <span className="mx-auto my-1 block h-px w-4 bg-gunmetal" />
            ) : (
              <p className="px-3 pb-1 font-mono text-[10px] font-medium tracking-[0.22em] text-faded uppercase">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              index += 1;
              const Icon = item.icon;
              const active = item.id === activeId;
              const order = String(index).padStart(2, "0");
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  title={item.label}
                  className={cn(
                    "relative flex h-9 w-full items-center gap-2.5 px-3 text-left text-[13px] transition-colors",
                    collapsed && "justify-center px-0",
                    active
                      ? "bg-volcanic text-offwhite"
                      : "text-faded hover:bg-volcanic/70 hover:text-offwhite"
                  )}
                >
                  {active ? (
                    <span className="absolute inset-y-0 left-0 w-[2px] bg-mint" />
                  ) : null}
                  {!collapsed ? (
                    <span className="w-4 font-mono text-[10px] text-faded">
                      {order}
                    </span>
                  ) : null}
                  <Icon
                    className={cn(
                      "size-4 shrink-0",
                      active ? "text-mint" : "text-faded"
                    )}
                  />
                  {!collapsed ? (
                    <span className="truncate">{item.label}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div
        className={cn(
          "mt-auto border-t border-gunmetal pt-3",
          collapsed ? "px-0" : "px-3"
        )}
      >
        <p
          className={cn(
            "flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-faded uppercase",
            collapsed && "justify-center"
          )}
        >
          <span className="size-1.5 bg-mint shadow-[0_0_8px_var(--mint)]" />
          {collapsed ? null : "Floor live"}
        </p>
      </div>
    </nav>
  );
}
