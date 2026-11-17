"use client";
import { useEffect, useRef } from "react";

const LABELS = ["webhook", "pec", "api/fatture", "documenti", "scadenze", "email", "cron 08:00", "drive"];

type Node = { x: number; y: number; bx: number; by: number; r: number; label?: string; phase: number };

export default function HeroNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, raf = 0;
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    const mouse = { x: -9999, y: -9999 };
    let pulses: { e: number; t: number; speed: number }[] = [];

    function build() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width; h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // seeded positions so the layout is stable between reloads
      let s = 7;
      const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
      const count = w < 700 ? 10 : 16;
      nodes = [];
      for (let i = 0; i < count; i++) {
        // keep most nodes on the right half, a few on the left behind the text
        const right = i % 4 !== 0;
        const x = right ? w * (0.48 + rnd() * 0.48) : w * (0.03 + rnd() * 0.45);
        const y = h * (0.08 + rnd() * 0.78);
        nodes.push({ x, y, bx: x, by: y, r: 2.5 + rnd() * 3.5, phase: rnd() * Math.PI * 2 });
      }
      LABELS.slice(0, w < 700 ? 4 : LABELS.length).forEach((l, i) => {
        const idx = (i * 2 + 1) % nodes.length;
        nodes[idx].label = l;
        nodes[idx].r = 5;
      });
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        const d = nodes
          .map((n, j) => ({ j, d: Math.hypot(n.bx - nodes[i].bx, n.by - nodes[i].by) }))
          .filter((o) => o.j !== i)
          .sort((a, b) => a.d - b.d);
        for (const o of d.slice(0, 2)) {
          if (!edges.some(([a, b]) => (a === i && b === o.j) || (a === o.j && b === i))) edges.push([i, o.j]);
        }
      }
      pulses = [];
    }

    function frame(t: number) {
      ctx!.clearRect(0, 0, w, h);
      for (const n of nodes) {
        const drift = reduce ? 0 : 6;
        let x = n.bx + Math.sin(t / 2400 + n.phase) * drift;
        let y = n.by + Math.cos(t / 2800 + n.phase) * drift;
        const dx = x - mouse.x, dy = y - mouse.y, dist = Math.hypot(dx, dy);
        if (dist < 140) { x += (dx / dist) * (140 - dist) * 0.12; y += (dy / dist) * (140 - dist) * 0.12; }
        n.x = x; n.y = y;
      }
      ctx!.setLineDash([2, 5]);
      ctx!.lineWidth = 1;
      for (const [a, b] of edges) {
        ctx!.strokeStyle = "rgba(200,242,95,0.22)";
        ctx!.beginPath(); ctx!.moveTo(nodes[a].x, nodes[a].y); ctx!.lineTo(nodes[b].x, nodes[b].y); ctx!.stroke();
      }
      ctx!.setLineDash([]);

      if (!reduce && Math.random() < 0.035 && pulses.length < 6) {
        pulses.push({ e: Math.floor(Math.random() * edges.length), t: 0, speed: 0.006 + Math.random() * 0.008 });
      }
      pulses = pulses.filter((p) => p.t <= 1);
      for (const p of pulses) {
        p.t += p.speed;
        const [a, b] = edges[p.e];
        const x = nodes[a].x + (nodes[b].x - nodes[a].x) * p.t;
        const y = nodes[a].y + (nodes[b].y - nodes[a].y) * p.t;
        ctx!.fillStyle = "rgba(200,242,95,0.9)";
        ctx!.beginPath(); ctx!.arc(x, y, 2, 0, Math.PI * 2); ctx!.fill();
      }

      for (const n of nodes) {
        ctx!.fillStyle = n.label ? "rgba(200,242,95,0.55)" : "rgba(200,242,95,0.35)";
        ctx!.beginPath(); ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx!.fill();
        if (n.label) {
          ctx!.fillStyle = "rgba(170,173,166,0.75)";
          ctx!.font = "11px 'Space Mono', monospace";
          ctx!.fillText(n.label, n.x + 10, n.y - 8);
        }
      }
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
