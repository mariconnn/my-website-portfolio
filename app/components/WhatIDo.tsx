"use client";

import Image from "next/image";
import { useReveal } from "../hooks/useReveal";

// Clapperboard section header; the clapper snaps shut when it scrolls into view.
export function Slate({ scene, title, subtitle }: { scene: string; title: string; subtitle: string }) {
  const ref = useReveal<HTMLDivElement>(0.4);
  return (
    <div className="ft-slate" ref={ref}>
      <div className="ft-clapper" aria-hidden="true" />
      <div className="ft-slate-board">
        <div className="ft-slate-fields" aria-hidden="true">
          <span>SCENE {scene}</span>
          <span>TAKE 1</span>
          <span>ROLL A</span>
        </div>
        <h2 className="ft-slate-title">{title}</h2>
        <p className="ft-slate-sub">{subtitle}</p>
      </div>
    </div>
  );
}

const CAST = [
  {
    name: "The Builder",
    as: "as Web Development",
    line: "I build websites using HTML, CSS, React, and JavaScript.",
    tags: ["HTML", "CSS", "React", "JavaScript"],
    icon: "/images/icons8-web-development-48.png",
  },
  {
    name: "The Mobile Maverick",
    as: "as Mobile App",
    line: "I build mobile applications using Android Studio.",
    tags: ["Android Studio"],
    icon: "/images/icons8-mobile-app-48.png",
  },
  {
    name: "The Designer",
    as: "as UI/UX Design",
    line: "I design website and mobile app interfaces in Figma.",
    tags: ["Figma", "Web UI", "Mobile UI"],
    icon: "/images/icons8-ui-ux-design-48.png",
  },
];

export default function WhatIDo() {
  const ref = useReveal<HTMLElement>(0.1);

  return (
    <section id="about" className="ft-section" ref={ref}>
      <Slate scene="01" title="The Cast" subtitle="What I do" />

      <ul className="ft-cast">
        {CAST.map((c, i) => (
          <li
            key={c.name}
            className="ft-frame reveal"
            data-reveal
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className="ft-frame-inner">
              <Image src={c.icon} alt="" width={48} height={48} className="ft-frame-icon" />
              <h3 className="ft-frame-name">{c.name}</h3>
              <p className="ft-frame-as">{c.as}</p>
              <p className="ft-frame-line">{c.line}</p>
              <ul className="ft-tags" aria-label="Skills">
                {c.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
