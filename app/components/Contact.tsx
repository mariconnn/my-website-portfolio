"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/maricon.landicho.52",
    icon: "/images/facebook.png",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/coiledbrat/",
    icon: "/images/instagram.png",
  },
  {
    label: "Discord",
    href: "https://discord.com/channels/@me",
    icon: "/images/discord.png",
  },
];

// Fixed directions (no Math.random during render) so SSR and client match.
const CONFETTI: Array<{ dx: string; dy: string; rot: string; delay: string }> = [
  { dx: "-84px", dy: "-96px", rot: "-160deg", delay: "0s" },
  { dx: "-46px", dy: "-118px", rot: "120deg", delay: "0.05s" },
  { dx: "-6px", dy: "-132px", rot: "-90deg", delay: "0.1s" },
  { dx: "38px", dy: "-120px", rot: "150deg", delay: "0.03s" },
  { dx: "80px", dy: "-98px", rot: "-130deg", delay: "0.08s" },
  { dx: "-104px", dy: "-54px", rot: "90deg", delay: "0.12s" },
  { dx: "102px", dy: "-52px", rot: "-110deg", delay: "0.06s" },
  { dx: "-72px", dy: "-14px", rot: "60deg", delay: "0.15s" },
  { dx: "70px", dy: "-10px", rot: "-70deg", delay: "0.11s" },
  { dx: "0px", dy: "-70px", rot: "45deg", delay: "0.18s" },
];

export default function Contact() {
  const sectionRef = useReveal<HTMLElement>();
  const [torn, setTorn] = useState(false);

  return (
    <section id="contact" className="cr-contact" ref={sectionRef}>
      <header className="cr-head reveal" data-reveal>
        <p className="cr-kicker">SCENE 03 &middot; BOX OFFICE</p>
        <h2 className="cr-title">Want to work together or just say hi? Grab a ticket.</h2>
      </header>

      <div className={`cr-ticket reveal${torn ? " cr-is-torn" : ""}`} data-reveal>
        <div className="cr-ticket-main">
          <p className="cr-admit">ADMIT ONE</p>
          <p className="cr-house">MARICON LANDICHO PICTURES</p>
          <p className="cr-seat">ROW D &middot; SEAT 01 &middot; SCREEN 1</p>
          <p className="cr-serial">SERIAL NO. 000193</p>
        </div>

        <div className="cr-ticket-stub" aria-hidden="true">
          <span className="cr-stub-word">ADMIT ONE</span>
          <span className="cr-barcode" />
        </div>

        <div className="cr-torn-note" aria-live="polite">
          {torn && <p className="cr-note-line">See you at the premiere!</p>}
        </div>

        {torn && (
          <span className="cr-confetti" aria-hidden="true">
            {CONFETTI.map((c, i) => (
              <i
                key={i}
                style={
                  {
                    "--dx": c.dx,
                    "--dy": c.dy,
                    "--rot": c.rot,
                    animationDelay: c.delay,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        )}
      </div>

      <div className="cr-actions reveal" data-reveal>
        {torn ? (
          <button type="button" className="cr-btn" onClick={() => setTorn(false)}>
            Reset
          </button>
        ) : (
          <button type="button" className="cr-btn" onClick={() => setTorn(true)}>
            Tear the ticket
          </button>
        )}
      </div>

      <ul className="cr-socials reveal" data-reveal>
        {SOCIALS.map((s) => (
          <li key={s.label}>
            <a className="cr-social" href={s.href} target="_blank" rel="noopener noreferrer">
              <Image src={s.icon} alt="" width={28} height={28} />
              <span>{s.label}</span>
              <span className="cr-social-hint" aria-hidden="true">
                &nearr;
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
