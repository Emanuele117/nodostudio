import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `Sei l'assistente AI del sito di Nodo Studio, l'attività di Emanuele (Roma, lavora da remoto in tutta Italia).
Nodo Studio crea automazioni per commercialisti, CAF, studi legali, studi professionali e piccole PMI, e come estensione gestisce l'IT aziendale.

Servizi e prezzi:
1) Automazioni su misura: raccolta e controllo documenti dei clienti, promemoria scadenze e solleciti, fatture da PEC (lettura, registrazione, approvazione), email e richieste smistate con l'AI, report automatici, integrazioni via API. Assessment gratuito, workflow singolo da 600 €, pacchetto 3 workflow 1.500 €, manutenzione e monitoraggio 80 €/mese.
2) IT gestito + automazioni interne: Google Workspace e Microsoft 365, identità e accessi (Entra ID, SSO), dispositivi con MDM e Apple Business Manager, help desk remoto con ticketing, sicurezza (2FA, backup, audit accessi). Attivazione 500 €, 30 € per utente al mese, minimo 250 € al mese.
Strumenti: n8n, Make, Zapier, Claude, API REST.

Il tuo compito:
- Capire cosa vuole migliorare il visitatore e raccogliere, con domande brevi una alla volta: tipo di attività, numero di persone, processo o problema da risolvere, strumenti che usa, nome ed email.
- Indicare il pacchetto adatto con una frase e il prezzo di partenza.
- Proporre di prenotare l'assessment gratuito con Emanuele.

Regole:
- Scrivi in italiano, frasi brevi e semplici, massimo 3 frasi per messaggio. Niente elenchi lunghi, niente emoji.
- Non inventare servizi, prezzi, clienti o risultati. Se non sai qualcosa, dì che lo chiarisce Emanuele in call.
- Non fare preventivi personalizzati e non promettere tempi: li definisce Emanuele dopo l'assessment.
- Se ti chiedono se sei una persona, rispondi che sei un assistente AI.
- Resta sull'argomento: se la domanda non riguarda i servizi di Nodo Studio, riporta gentilmente la conversazione su quelli.
- Quando hai almeno processo da migliorare, nome ed email, scrivi il messaggio finale con il pacchetto consigliato e l'invito a prenotare, poi aggiungi in fondo, su una riga a parte, esattamente:
<<LEAD {"nome":"...","email":"...","attivita":"...","persone":"...","processo":"...","strumenti":"...","pacchetto":"..."}>>
Usa stringhe vuote per i campi che non conosci. Non mostrare mai questo formato in altri messaggi.`;

const LEAD_RE = /<<LEAD\s*(\{[\s\S]*?\})\s*>>/;

async function sendLead(lead: Record<string, unknown>, transcript: Msg[]) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ source: "sito-chatbot", createdAt: new Date().toISOString(), lead, transcript }),
    });
  } catch {
    // il lead non deve bloccare la risposta al visitatore
  }
}

// Modalità guidata, usata quando manca la chiave API: stesse domande, senza AI.
const GUIDED = [
  "Ok. Che tipo di attività avete e quante persone ci lavorano?",
  "Quali strumenti usate oggi per questo lavoro? Per esempio email, PEC, Excel, un gestionale.",
  "Grazie. Per preparare la call mi lasci nome ed email?",
];

function guided(history: Msg[]) {
  const answers = history.filter((m) => m.role === "user").map((m) => m.content);
  const n = answers.length;
  if (n <= GUIDED.length) return { reply: GUIDED[n - 1], showBooking: false, lead: null };
  const [processo, attivita, strumenti, contatto] = answers;
  const email = (contatto.match(/[\w.+-]+@[\w-]+\.[\w.-]+/) || [""])[0];
  const it = /account|dispositiv|access|licenz|workspace|microsoft|mdm|pc/i.test(processo);
  const pacchetto = it ? "IT gestito + automazioni interne" : "Automazioni su misura";
  const reply = it
    ? "Il pacchetto adatto è IT gestito + automazioni interne: attivazione 500 €, poi 30 € per utente al mese. Prenota l'assessment gratuito e Emanuele guarda con te la situazione."
    : "Il pacchetto adatto è Automazioni su misura: un workflow parte da 600 €. Prenota l'assessment gratuito e Emanuele individua con te cosa automatizzare per primo.";
  return {
    reply,
    showBooking: true,
    lead: { nome: contatto.replace(email, "").replace(/[,;]/g, " ").trim(), email, attivita, persone: "", processo, strumenti, pacchetto },
  };
}

export async function POST(req: Request) {
  let body: { messages?: Msg[] };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad request" }, { status: 400 }); }

  const history = (body.messages || [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));
  if (!history.length || history[history.length - 1].role !== "user") {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    const g = guided(history);
    if (g.lead) await sendLead(g.lead, history);
    return NextResponse.json({ reply: g.reply, showBooking: g.showBooking });
  }

  // l'API vuole che la conversazione inizi con un messaggio utente
  while (history.length && history[0].role !== "user") history.shift();

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.CHAT_MODEL || "claude-haiku-5-5",
      max_tokens: 500,
      system: SYSTEM,
      messages: history,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({
      reply: "Ho un problema tecnico in questo momento. Puoi prenotare direttamente l'assessment gratuito con Emanuele.",
      showBooking: true,
    });
  }

  const data = await res.json();
  let text: string = (data.content || []).filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("");
  let showBooking = false;
  const m = text.match(LEAD_RE);
  if (m) {
    text = text.replace(LEAD_RE, "").trim();
    showBooking = true;
    try { await sendLead(JSON.parse(m[1]), history); } catch { /* JSON non valido: ignora */ }
  }
  if (/prenot/i.test(text)) showBooking = true;
  return NextResponse.json({ reply: text, showBooking });
}
