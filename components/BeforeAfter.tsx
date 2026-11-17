"use client";
import { useState } from "react";
import { scenarios } from "@/lib/content";

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [after, setAfter] = useState(false);
  const s = scenarios[active];
  const steps = after ? s.after : s.before;

  return (
    <>
      <div className="ba-controls">
        <div className="tabs" role="tablist" aria-label="Scenari">
          {scenarios.map((sc, i) => (
            <button
              key={sc.id}
              role="tab"
              aria-selected={i === active}
              className={`pill ${i === active ? "on" : ""}`}
              onClick={() => { setActive(i); setAfter(false); }}
            >
              {sc.label}
            </button>
          ))}
        </div>
        <div className="toggle" role="group" aria-label="Prima o dopo">
          <button className={!after ? "on" : ""} onClick={() => setAfter(false)} aria-pressed={!after}>Prima</button>
          <button className={after ? "on" : ""} onClick={() => setAfter(true)} aria-pressed={after}>Dopo</button>
        </div>
      </div>
      <div key={`${s.id}-${after}`} className={`ba-row ${after ? "after" : "before"}`}>
        {steps.map((st, i) => (
          <div className="ba-card" key={i} style={{ ["--i" as string]: i }}>
            <span className="t">{st.time}</span>
            {st.text}
          </div>
        ))}
      </div>
      <p className="ba-note">{after ? s.afterNote : s.beforeNote}</p>
    </>
  );
}
