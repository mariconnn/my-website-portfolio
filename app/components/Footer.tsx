"use client";

import { useEffect, useRef, useState } from "react";

const CREDITS: Array<[string, string]> = [
  ["Directed by", "Maricon Landicho"],
  ["Written by", "Maricon Landicho"],
  ["Production design", "Figma"],
  ["Starring", "HTML5, CSS, JavaScript, React"],
  ["Featuring", "Android Studio, Flask, Three.js"],
  ["Built with", "Next.js"],
  ["Catering", "Coffee, lots of it"],
  ["Special thanks", "You, for watching"],
];

export default function Footer() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [rolling, setRolling] = useState(false);
  const [paused, setPaused] = useState(false);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // Year computed in an effect to avoid a hydration mismatch.
    setYear(new Date().getFullYear());

    const panel = panelRef.current;
    if (!panel) return;
    // Reduced motion: leave the credits static, never start the roll.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRolling(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  return (
    <footer id="credits" className="cr-credits">
      <div className="cr-credits-panel" ref={panelRef}>
        <p className="cr-credits-kicker">END CREDITS</p>

        <div
          className={`cr-roll-viewport${rolling ? " cr-is-rolling" : ""}${
            paused ? " cr-is-paused" : ""
          }`}
        >
          <div className="cr-roll">
            <dl className="cr-credit-list">
              {CREDITS.map(([role, name]) => (
                <div className="cr-credit" key={role}>
                  <dt>{role}</dt>
                  <dd>{name}</dd>
                </div>
              ))}
            </dl>
            <p className="cr-the-end">THE END</p>
          </div>
        </div>

        <div className="cr-credits-controls">
          <button
            type="button"
            className="cr-btn cr-btn-ghost"
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? "Play credits" : "Pause credits"}
          </button>
        </div>
      </div>

      <div className="cr-credits-bar">
        <p className="cr-copyright">&copy;{year ? ` ${year}` : ""} Maricon Landicho</p>
        <a className="cr-replay" href="#top">
          Replay from the top
        </a>
      </div>
    </footer>
  );
}
