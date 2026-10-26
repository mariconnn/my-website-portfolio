"use client";

import { useEffect, useRef } from "react";

// Adds "is-visible" to the element (and any [data-reveal] children) once it scrolls into view.
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = [root, ...Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"))];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
