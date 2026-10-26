"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "./Projects";

// Native <dialog>: Esc closes it, and the browser returns focus to the opener.
export default function ProjectTrailer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      className="ft-trailer"
      aria-labelledby="ft-trailer-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      {project && (
        <div className="ft-trailer-body">
          <div className="ft-trailer-screen">
            <Image
              key={project.title}
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              fill
              sizes="(max-width: 960px) 100vw, 920px"
              loading="eager"
              className="ft-trailer-img"
            />
          </div>
          <div className="ft-trailer-copy">
            <p className="ft-trailer-label">Feature presentation</p>
            <h3 id="ft-trailer-title" className="ft-trailer-title">
              {project.title}
            </h3>
            <p className="ft-genre">{project.genre}</p>
            <p className="ft-trailer-synopsis">{project.synopsis}</p>
            <ul className="ft-tags">
              {project.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <button type="button" className="ft-trailer-close" aria-label="Close trailer" onClick={() => ref.current?.close()}>
            ✕
          </button>
        </div>
      )}
    </dialog>
  );
}
