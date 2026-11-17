# Nodo Studio — sito

Next.js, pronto per Vercel.

## Variabili d'ambiente (Vercel → Settings → Environment Variables)
Vedi `.env.example`:
- `ANTHROPIC_API_KEY` — chiave per l'assistente AI. Senza chiave l'assistente fa domande guidate senza AI.
- `CHAT_MODEL` — modello dell'assistente (default `claude-haiku-5-5`).
- `NEXT_PUBLIC_BOOKING_URL` — link Cal.com per prenotare l'assessment.
- `LEAD_WEBHOOK_URL` — webhook n8n che riceve i lead raccolti dall'assistente.
- `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_VAT` — dati nel footer.

## Sviluppo
```
npm install
npm run dev
```

## Contenuti
Testi di pacchetti, scenari prima/dopo, lavori e competenze sono in `lib/content.ts`.
