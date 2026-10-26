"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SEEN_KEY = "intro-seen";
const COUNT_FROM = 5;
const TICK_MS = 750;
const TITLE_MS = 1500;
const FADE_MS = 600;

type Phase = "count" | "title" | "out" | "done";

// Marks the intro finished so the Hero can raise its curtains, whether it played or not.
function announceDone() {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event("intro:done"));
}

export default function IntroLeader() {
  const [phase, setPhase] = useState<Phase>("count");
  const [count, setCount] = useState(COUNT_FROM);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const finish = useCallback((instant = false) => {
    clearTimers();
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    document.body.style.overflow = "";
    announceDone();
    if (instant) {
      setPhase("done");
      return;
    }
    setPhase("out");
    timers.current.push(window.setTimeout(() => setPhase("done"), FADE_MS));
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      finish(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    for (let i = 1; i < COUNT_FROM; i++) at(i * TICK_MS, () => setCount(COUNT_FROM - i));
    at(COUNT_FROM * TICK_MS, () => setPhase("title"));
    at(COUNT_FROM * TICK_MS + TITLE_MS, () => finish());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimers();
      document.body.style.overflow = "";
    };
  }, [finish]);

  if (phase === "done") return null;

  return (
    <div
      className={`op-intro${phase === "out" ? " op-intro-out" : ""}`}
      role="dialog"
      aria-label="Opening countdown"
    >
      {phase === "count" ? (
        <div className="op-leader" aria-hidden="true">
          <span className="op-leader-sweep" key={count} />
          <span className="op-leader-ring" />
          <span className="op-leader-ring op-leader-ring-inner" />
          <span className="op-leader-cross" />
          <span className="op-leader-num">{count}</span>
        </div>
      ) : (
        <div className="op-titlecard">
          <p className="op-titlecard-studio">Maricon Landicho Pictures</p>
          <p className="op-titlecard-presents">presents</p>
        </div>
      )}
      <button type="button" className="op-skip" onClick={() => finish()}>
        Skip intro
      </button>
    </div>
  );
}
