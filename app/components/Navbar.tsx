"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "The Cast" },
  { href: "#my-projects", label: "Now Showing" },
  { href: "#contact", label: "Box Office" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the link whose section crosses the middle of the viewport (#top clears it).
    const sections = ["#top", ...LINKS.map((l) => l.href)].map((h) => document.querySelector<HTMLElement>(h)).filter(
      (s): s is HTMLElement => s !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`op-nav${scrolled || open ? " op-nav-solid" : ""}`}>
      <div className="op-nav-inner">
        <a href="#top" className="op-logo" onClick={() => setOpen(false)}>
          <span className="op-logo-name">Maricon</span>
          <span className="op-logo-sub">Pictures</span>
        </a>

        <button
          type="button"
          className="op-burger"
          aria-expanded={open}
          aria-controls="op-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="op-menu" className={`op-menu${open ? " op-menu-open" : ""}`} aria-label="Main">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`op-link${active === l.href ? " op-link-active" : ""}`}
              aria-current={active === l.href ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="op-bulbs" aria-hidden="true" />
    </header>
  );
}
