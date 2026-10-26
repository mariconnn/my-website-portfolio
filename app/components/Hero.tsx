"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ROLES = ["WEB DEVELOPER", "UI/UX DESIGNER", "MOBILE APP DEVELOPER"];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/landicho-maricon-667816311", icon: "/images/linkedin.svg" },
  { label: "Facebook", href: "https://www.facebook.com/maricon.landicho.52", icon: "/images/facebook.png" },
  { label: "Instagram", href: "https://www.instagram.com/coiledbrat/", icon: "/images/instagram.png" },
  { label: "Discord", href: "https://discord.com/channels/@me", icon: "/images/discord.png" },
];

// Types, holds, deletes, and moves to the next role. Static under reduced motion.
function useTypedRole() {
  const [text, setText] = useState(ROLES[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let role = 0;
    let len = ROLES[0].length;
    let deleting = true;
    let timer = window.setTimeout(step, 2200);

    function step() {
      if (deleting) {
        len--;
        if (len === 0) {
          deleting = false;
          role = (role + 1) % ROLES.length;
        }
      } else {
        len++;
      }
      setText(ROLES[role].slice(0, len));
      const holding = !deleting && len === ROLES[role].length;
      if (holding) deleting = true;
      timer = window.setTimeout(step, holding ? 2200 : deleting ? 45 : 85);
    }

    return () => window.clearTimeout(timer);
  }, []);

  return text;
}

export default function Hero() {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);
  const role = useTypedRole();

  useEffect(() => {
    const open = () => setCurtainsOpen(true);
    if (document.documentElement.dataset.intro === "done") open();
    window.addEventListener("intro:done", open);
    const fallback = window.setTimeout(open, 6000);
    return () => {
      window.removeEventListener("intro:done", open);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const poster = posterRef.current;
    if (!poster) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = poster.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      poster.style.setProperty("--ry", `${px * 16}deg`);
      poster.style.setProperty("--rx", `${py * -16}deg`);
    };
    const onLeave = () => {
      poster.style.setProperty("--ry", "0deg");
      poster.style.setProperty("--rx", "0deg");
    };
    poster.addEventListener("pointermove", onMove);
    poster.addEventListener("pointerleave", onLeave);
    return () => {
      poster.removeEventListener("pointermove", onMove);
      poster.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="top" className={`op-hero${curtainsOpen ? " op-curtains-open" : ""}`}>
      <div className="op-curtain op-curtain-left" aria-hidden="true" />
      <div className="op-curtain op-curtain-right" aria-hidden="true" />

      <div className="op-hero-inner">
        <div className="op-poster" ref={posterRef}>
          <div className="op-poster-frame">
            <Image
              src="/images/profile.jpg"
              alt="Portrait of Maricon Landicho"
              fill
              sizes="(max-width: 860px) 70vw, 360px"
              priority
              className="op-poster-img"
            />
            <span className="op-poster-glare" aria-hidden="true" />
          </div>
          <p className="op-rating">
            <strong>Rated D</strong>
            <span>for Developer</span>
          </p>
        </div>

        <div className="op-copy">
          <p className="op-tagline">This season, one developer sets out to build the web.</p>
          <h1 className="op-title">
            <span>Maricon</span> <span>Landicho</span>
          </h1>
          <p className="op-role">
            <span className="op-sr">Junior Web Developer</span>
            <span aria-hidden="true">
              {role}
              <span className="op-caret" />
            </span>
          </p>
          <p className="op-bio">
            Junior web developer with basic proficiency in HTML5, CSS, and JavaScript. Looking for an
            opportunity to grow as a developer and learn server-side logic, to support your team in
            delivering high-quality websites and digital goals.
          </p>

          <div className="op-ctas">
            <a href="#my-projects" className="op-btn op-btn-gold">
              Watch the trailers
            </a>
            <a href="#contact" className="op-btn op-btn-outline">
              Get tickets
            </a>
          </div>

          <ul className="op-socials">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <Image src={s.icon} alt="" width={22} height={22} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="op-billing">
        Maricon Landicho Pictures presents a Junior Web Developer production
        <span> · </span>starring HTML5 · CSS · JavaScript · React · Figma · Android Studio
      </p>
    </section>
  );
}
