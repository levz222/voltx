"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HERO_SLIDES } from "@/lib/app-data";
import { cn } from "@/lib/utils";

export function PromotionsPanel({
  onAction,
}: {
  onAction: (slideId: string) => void;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-offwhite uppercase">
          Promotions
        </h1>
        <p className="mt-1 text-sm text-faded">
          Deposit matches, VIP rakes, and the weekly crash arena.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {HERO_SLIDES.map((slide) => (
          <article
            key={slide.id}
            className="flex flex-col justify-between rounded-xl border border-gunmetal bg-ash p-5"
          >
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-mint uppercase">
                {slide.kicker}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-offwhite uppercase">
                {slide.title}
              </h2>
              <p className="mt-2 text-sm text-faded">{slide.copy}</p>
            </div>
            <Button
              type="button"
              onClick={() => onAction(slide.id)}
              className={cn(
                "mt-5 h-9 font-bold text-volcanic",
                slide.tone === "mint" ? "bg-mint hover:bg-acid" : "bg-acid hover:bg-mint"
              )}
            >
              {slide.cta}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AffiliatePanel() {
  const [copied, setCopied] = useState(false);
  const code = "VOLTX-OBSIDIAN";

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-xl border border-gunmetal bg-ash p-6">
        <p className="text-[10px] font-semibold tracking-[0.22em] text-mint uppercase">
          Affiliate
        </p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-offwhite uppercase">
          Share the vault
        </h1>
        <p className="mt-2 max-w-lg text-sm text-faded">
          A referral code for the host program. Copy it now. Payout wiring comes later.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <code className="rounded-md border border-gunmetal bg-volcanic px-3 py-2 text-sm font-semibold tracking-widest text-acid">
            {code}
          </code>
          <Button
            type="button"
            onClick={copyCode}
            className="h-9 bg-acid font-bold text-volcanic hover:bg-mint"
          >
            {copied ? "Copied" : "Copy code"}
          </Button>
        </div>
      </div>
      <ol className="grid gap-3">
        {["Share the code", "They deposit", "You track the rake"].map((step, index) => (
          <li
            key={step}
            className="rounded-lg border border-gunmetal bg-ash px-4 py-3 text-sm text-offwhite"
          >
            <span className="mr-2 font-black text-mint">0{index + 1}</span>
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function SupportPanel() {
  const [topic, setTopic] = useState("Wallet");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="max-w-xl rounded-xl border border-gunmetal bg-ash p-6">
      <p className="text-[10px] font-semibold tracking-[0.22em] text-mint uppercase">
        Support
      </p>
      <h1 className="mt-2 text-2xl font-black tracking-tight text-offwhite uppercase">
        Talk to the desk
      </h1>
      <p className="mt-2 text-sm text-faded">
        This note stays in the session. It is not delivered anywhere.
      </p>
      <form
        className="mt-5 grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (!message.trim()) return;
          setSent(true);
        }}
      >
        <label className="grid gap-1.5 text-sm">
          <span className="text-faded">Topic</span>
          <select
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="h-10 rounded-md border border-gunmetal bg-volcanic px-3 text-offwhite outline-none focus:border-mint"
          >
            <option>Wallet</option>
            <option>Bonus</option>
            <option>Game</option>
            <option>Account</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-faded">Message</span>
          <textarea
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              setSent(false);
            }}
            rows={4}
            placeholder="What broke?"
            className="rounded-md border border-gunmetal bg-volcanic px-3 py-2 text-offwhite outline-none placeholder:text-faded focus:border-mint"
          />
        </label>
        <Button
          type="submit"
          className="h-10 bg-acid font-bold text-volcanic hover:bg-mint"
        >
          Send note
        </Button>
        {sent ? (
          <p className="text-sm font-medium text-mint">
            Saved a {topic.toLowerCase()} note in this session.
          </p>
        ) : null}
      </form>
    </section>
  );
}
