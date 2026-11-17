"use client";
import { useEffect } from "react";

// Adds the "in" class to every .reveal element when it enters the viewport,
// and hides the floating booking button while the contact section is visible.
export default function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const fab = document.querySelector(".fab");
    // nascosto sopra la hero (copre il menu) e nella sezione contatti (c'è già il bottone)
    const targets = [document.querySelector(".hero"), document.getElementById("contatti")].filter(Boolean) as Element[];
    const visible = new Set<Element>();
    let io2: IntersectionObserver | undefined;
    if (fab && targets.length) {
      io2 = new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        fab.classList.toggle("hide", visible.size > 0);
      }, { threshold: 0.2 });
      targets.forEach((t) => io2!.observe(t));
    }
    return () => { io.disconnect(); io2?.disconnect(); };
  }, []);
  return null;
}
