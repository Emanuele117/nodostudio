"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { bookingUrl } from "@/lib/content";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING = "Ciao! Quale lavoro ripetitivo vuoi toglierti di dosso?";
const CHIPS = ["Un processo da automatizzare", "Documenti, scadenze e fatture", "Account, dispositivi e accessi"];

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: t }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply || "Non ho capito, puoi riformulare?" }]);
      if (data.showBooking) setShowBooking(true);
    } catch {
      setMessages([...next, { role: "assistant", content: "Connessione non riuscita. Riprova tra poco o prenota direttamente la call." }]);
      setShowBooking(true);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  const started = messages.length > 1;

  return (
    <div className="chat">
      <div className="chat-head">
        <span><span className="dot" />Assistente Nodo Studio</span>
        <span className="ai">assistente AI</span>
      </div>
      <div className="chat-log" ref={logRef} aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === "user" ? "user" : "bot"}`}>{m.content}</div>
        ))}
        {busy && <div className="msg bot typing">Sto scrivendo…</div>}
        {showBooking && (
          <a className="book" href={bookingUrl} target={bookingUrl.startsWith("http") ? "_blank" : undefined} rel="noopener">
            Prenota l&apos;assessment gratuito
          </a>
        )}
      </div>
      {!started && (
        <div className="chips">
          {CHIPS.map((c) => (
            <button key={c} className="pill" onClick={() => send(c)}>{c}</button>
          ))}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scrivi qui…"
          maxLength={800}
          aria-label="Messaggio per l'assistente"
        />
        <button type="submit" disabled={busy || !input.trim()}>Invia</button>
      </form>
      <p className="privacy-note">Stai parlando con un assistente AI. I dati che scrivi servono solo a preparare la call con Emanuele.</p>
    </div>
  );
}
