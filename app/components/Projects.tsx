"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { Slate } from "./WhatIDo";
import ProjectTrailer from "./ProjectTrailer";

export type Project = {
  title: string;
  image: string;
  genre: string;
  synopsis: string;
  tech: string[];
};

const PROJECTS: Project[] = [
  {
    title: "My Hometown",
    image: "/images/hometown.png",
    genre: "Personal Blog · Drama",
    synopsis: "A simple personal blog website with a home page, an about page, and blog post listings.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "TravelCon",
    image: "/images/travelcon.png",
    genre: "Travel · Adventure",
    synopsis: "A travel blog showcasing my favorite places to travel around the world.",
    tech: ["HTML", "CSS", "React"],
  },
  {
    title: "MeasureMate",
    image: "/images/measuremate.png",
    genre: "3D · Sci-Fi",
    synopsis: "A website that turns your 2D floor plans into 3D models.",
    tech: ["Flask", "Three.js"],
  },
];

function Poster({ project, index, onTrailer }: { project: Project; index: number; onTrailer: () => void }) {
  const [flipped, setFlipped] = useState(false);
  const frontBtn = useRef<HTMLButtonElement>(null);
  const backBtn = useRef<HTMLButtonElement>(null);
  const flippedOnce = useRef(false);

  // The face being hidden turns inert, so carry focus over to the face being shown.
  useEffect(() => {
    if (!flippedOnce.current) {
      flippedOnce.current = true;
      return;
    }
    (flipped ? backBtn : frontBtn).current?.focus();
  }, [flipped]);

  return (
    <li className="ft-poster reveal" data-reveal style={{ transitionDelay: `${index * 140}ms` }}>
      <div className={`ft-poster-inner${flipped ? " ft-flipped" : ""}`}>
        <div className="ft-face ft-front" inert={flipped}>
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 760px) 90vw, 380px"
            className="ft-poster-img"
          />
          <div className="ft-front-copy">
            <p className="ft-genre">{project.genre}</p>
            <h3 className="ft-poster-title">{project.title}</h3>
            <p className="ft-stars" aria-hidden="true">
              ★★★★★
            </p>
          </div>
          <button
            ref={frontBtn}
            type="button"
            className="ft-flip-hit"
            aria-pressed={flipped}
            aria-label={`Show details for ${project.title}`}
            onClick={() => setFlipped(true)}
          >
            <span className="ft-flip-hint">Flip for details</span>
          </button>
        </div>

        <div className="ft-face ft-back" inert={!flipped}>
          <p className="ft-back-admit">Admit one · {project.title}</p>
          <p className="ft-back-synopsis">{project.synopsis}</p>
          <p className="ft-back-label">Starring</p>
          <ul className="ft-tags ft-tags-dark">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="ft-back-actions">
            <button ref={backBtn} type="button" className="ft-btn" onClick={onTrailer}>
              ▶ Watch trailer
            </button>
            <button
              type="button"
              className="ft-btn ft-btn-ghost"
              aria-pressed={flipped}
              onClick={() => setFlipped(false)}
            >
              Flip back
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Projects() {
  const ref = useReveal<HTMLElement>(0.1);
  const [showing, setShowing] = useState<Project | null>(null);

  return (
    <section id="my-projects" className="ft-section ft-section-dark" ref={ref}>
      <Slate scene="02" title="Now Showing" subtitle="Recent projects" />

      <p className="ft-marquee" aria-hidden="true">
        <span>★ Now Showing ★</span>
      </p>

      <ul className="ft-posters">
        {PROJECTS.map((p, i) => (
          <Poster key={p.title} project={p} index={i} onTrailer={() => setShowing(p)} />
        ))}
      </ul>

      <ProjectTrailer project={showing} onClose={() => setShowing(null)} />
    </section>
  );
}
