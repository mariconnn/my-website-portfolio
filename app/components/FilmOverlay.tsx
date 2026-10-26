"use client";

import { useEffect, useRef } from "react";

// Grain, vignette, a stray scratch, and a projector light that follows the cursor.
export default function FilmOverlay() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        light.style.setProperty("--x", `${x}px`);
        light.style.setProperty("--y", `${y}px`);
        light.classList.add("op-light-on");
      });
    };
    const onLeave = () => light.classList.remove("op-light-on");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="op-film" aria-hidden="true">
      <div className="op-light" ref={lightRef} />
      <div className="op-grain" />
      <div className="op-scratch" />
      <div className="op-vignette" />
    </div>
  );
}
