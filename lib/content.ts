export const tools = [
  "n8n", "Make", "Zapier", "Claude", "Google Workspace", "Microsoft 365", "Gmail",
  "Outlook", "Aruba PEC", "Fatture in Cloud", "WhatsApp Business", "Slack", "HubSpot",
];

export type Step = { time: string; text: string };
export type Scenario = {
  id: string;
  label: string;
  before: Step[];
  beforeNote: string;
  after: Step[];
  afterNote: string;
};

export const scenarios: Scenario[] = [
  {
    id: "documenti",
    label: "Studio · documenti dei clienti",
    before: [
      { time: "09:05 · email", text: "Il cliente manda i documenti in tre email diverse" },
      { time: "09:30 · cartella", text: "Allegati scaricati e rinominati a mano" },
      { time: "10:10 · excel", text: "Stato della pratica aggiornato nel foglio" },
      { time: "11:00 · telefono", text: "Si chiama il cliente per il documento che manca" },
      { time: "16:40 · whatsapp", text: "Il cliente chiede a che punto è la pratica" },
    ],
    beforeNote: "Cinque passaggi manuali per ogni pratica, e manca sempre un documento.",
    after: [
      { time: "09:05 · form", text: "Il cliente carica i documenti da una lista di quello che serve" },
      { time: "09:05 · drive", text: "File rinominati e salvati nella cartella del cliente" },
      { time: "09:06 · AI", text: "Controllo dei documenti: cosa c'è e cosa manca" },
      { time: "09:06 · email", text: "Richiesta automatica del documento mancante" },
      { time: "09:07 · scheda", text: "Stato della pratica aggiornato, visibile anche al cliente" },
    ],
    afterNote: "Lo studio apre la pratica solo quando è completa.",
  },
  {
    id: "scadenze",
    label: "Studio · scadenze e solleciti",
    before: [
      { time: "lunedì · excel", text: "Scadenze dei clienti controllate a mano nel foglio" },
      { time: "lunedì · email", text: "Promemoria scritti uno per uno" },
      { time: "giovedì · telefono", text: "Solleciti a chi non ha risposto" },
      { time: "venerdì · gestionale", text: "Pagamenti controllati riga per riga" },
      { time: "fine mese · ritardo", text: "Una scadenza dimenticata" },
    ],
    beforeNote: "Ogni settimana mezza giornata persa in promemoria.",
    after: [
      { time: "cron 08:00", text: "Scadenze della settimana lette dal calendario dello studio" },
      { time: "08:01 · email", text: "Promemoria personalizzato a ogni cliente" },
      { time: "+3 giorni · whatsapp", text: "Sollecito automatico a chi non ha risposto" },
      { time: "08:00 · gestionale", text: "Incassi segnati come pagati" },
      { time: "venerdì · report", text: "Riepilogo allo studio: chi è in regola e chi no" },
    ],
    afterNote: "I promemoria partono da soli, lo studio guarda solo le eccezioni.",
  },
  {
    id: "fatture",
    label: "PMI · fatture fornitori",
    before: [
      { time: "09:00 · pec", text: "La fattura del fornitore arriva in PEC" },
      { time: "09:20 · download", text: "XML scaricato e aperto a mano" },
      { time: "09:45 · excel", text: "Importo e scadenza copiati nel foglio" },
      { time: "10:30 · email", text: "Inoltrata al responsabile per l'approvazione" },
      { time: "fine mese · banca", text: "Pagamento fatto controllando il foglio" },
    ],
    beforeNote: "Ogni fattura passa per quattro mani prima di essere pagata.",
    after: [
      { time: "09:00 · pec", text: "Fattura letta in automatico dalla PEC" },
      { time: "09:00 · xml", text: "Fornitore, importo e scadenza estratti" },
      { time: "09:01 · gestionale", text: "Registrata in Fatture in Cloud e nel foglio pagamenti" },
      { time: "09:01 · slack", text: "Richiesta di approvazione con un clic" },
      { time: "scadenza -3 gg · email", text: "Promemoria del pagamento all'amministrazione" },
    ],
    afterNote: "Nessun dato copiato a mano, nessuna scadenza persa.",
  },
];

export type Pack = {
  n: string;
  title: string;
  desc: string;
  items: string[];
  prices: { label: string; value: string }[];
  example: string;
};

export const packs: Pack[] = [
  {
    n: "01",
    title: "Automazioni su misura",
    desc: "Analizzo come lavora lo studio o l'azienda, scelgo i processi che fanno perdere più ore e li automatizzo. Ogni workflow è testato, documentato e monitorato.",
    items: [
      "Raccolta e controllo dei documenti dei clienti",
      "Promemoria di scadenze e solleciti di pagamento",
      "Fatture: lettura dalla PEC, registrazione, approvazione",
      "Email e richieste smistate con l'AI",
      "Report automatici per il titolare",
      "Integrazioni via API tra gli strumenti che usi già",
    ],
    prices: [
      { label: "Assessment iniziale", value: "gratuito" },
      { label: "Workflow singolo", value: "da 600 €" },
      { label: "Pacchetto 3 workflow", value: "1.500 €" },
      { label: "Manutenzione e monitoraggio", value: "80 € / mese" },
    ],
    example: "Esempio: 3 workflow per uno studio di 6 persone, 1.500 € + 80 € al mese.",
  },
  {
    n: "02",
    title: "IT gestito + automazioni interne",
    desc: "Quando le automazioni girano, posso gestire anche il resto: account, dispositivi, accessi e sicurezza, con un canone mensile per utente.",
    items: [
      "Google Workspace e Microsoft 365: utenti, licenze, gruppi, Exchange, SharePoint",
      "Identity e accessi: Entra ID, SSO, policy di accesso condizionale",
      "Device management via MDM e Apple Business Manager: enrollment, policy, wipe remoto",
      "Help desk remoto con sistema di ticketing",
      "Sicurezza: 2FA obbligatoria, backup, audit periodico degli accessi",
      "Fino a 2 workflow interni all'anno: onboarding, offboarding, provisioning account",
    ],
    prices: [
      { label: "Attivazione e assessment iniziale", value: "500 €" },
      { label: "Canone", value: "30 € / utente / mese" },
      { label: "Canone minimo", value: "250 € / mese" },
    ],
    example: "Esempio: team di 15 utenti, 450 € al mese.",
  },
];

export type Work = {
  tag: string;
  meta: string;
  title: string;
  problem: string;
  stepsLabel: string;
  steps: string[];
  result: string;
  stack: string[];
  highlight?: boolean;
};

export const works: Work[] = [
  {
    tag: "Demo funzionante · n8n + AI",
    meta: "Progetto dimostrativo",
    title: "Triage automatico delle richieste con AI",
    problem:
      "Le richieste arrivano tutte nello stesso canale. Qualcuno deve leggerle, capire di cosa si tratta, dare una priorità e girarle alla persona giusta.",
    stepsLabel: "Passaggi del workflow",
    steps: [
      "Un webhook riceve la richiesta dal form: nome, email, oggetto e descrizione.",
      "Claude analizza il testo e restituisce in JSON categoria, priorità da 1 a 4 e un riassunto.",
      "Un nodo di validazione controlla la risposta: se la classificazione non è valida, la richiesta va in \"da verificare\" con priorità media.",
      "Creazione del task su Linear via API GraphQL, con categoria nel titolo, priorità e descrizione completa.",
      "Notifica sul canale Slack del team con categoria, priorità e link diretto.",
      "Risposta immediata al mittente con il codice della richiesta.",
    ],
    result:
      "Ogni richiesta viene classificata, assegnata e notificata in pochi secondi, senza smistamento manuale. Il workflow si importa in n8n e funziona anche con Zendesk, Jira o una casella email come sorgente.",
    stack: ["n8n", "Claude API", "Linear GraphQL", "Slack", "Webhook"],
    highlight: true,
  },
  {
    tag: "Process mapping · AI",
    meta: "Gruppo di 3 aziende",
    title: "Mappatura dei processi aziendali con un assistente AI",
    problem:
      "Processi operativi distribuiti su tre aziende, poco documentati. Prima di automatizzare serviva capire chi fa cosa, con quali strumenti e dove si perde tempo.",
    stepsLabel: "Passaggi",
    steps: [
      "Progettazione e sviluppo di una webapp di survey con un chatbot basato su Claude, che guida ogni dipendente nella descrizione delle proprie attività quotidiane.",
      "Interviste one-to-one per approfondire i casi emersi dalla survey e verificare i passaggi reali.",
      "Analisi delle risposte e mappatura dei flussi: strumenti usati, passaggi manuali, attività ripetitive e colli di bottiglia.",
      "Definizione delle priorità in base all'impatto e prime automazioni nei processi HR su Make, n8n e Zapier.",
    ],
    result:
      "Una mappa dei processi del gruppo e una lista di automazioni ordinate per impatto, con le prime già in produzione nei processi HR.",
    stack: ["Claude API", "Webapp", "Make", "n8n", "Zapier"],
  },
];

export const skills = [
  {
    title: "01 · Automazione dei processi",
    text: "Come Digital Workspace Manager del team HR ho introdotto workflow su Make, n8n e Zapier e integrazioni via API REST tra gli strumenti del gruppo.",
  },
  {
    title: "02 · Supporto e ticketing",
    text: "Gestione completa del ciclo dei ticket: triage, classificazione tra bug, richieste evolutive e problemi infrastrutturali, comunicazione con gli utenti. Amministrazione di Jira e Zendesk.",
  },
  {
    title: "03 · Identity e workspace",
    text: "Amministrazione di Google Workspace e Microsoft 365: ciclo di vita degli utenti, licenze, Exchange, Teams e SharePoint. Gestione delle identità su Entra ID con policy di sicurezza e accesso condizionale.",
  },
  {
    title: "04 · Dispositivi",
    text: "Gestione remota del parco dispositivi aziendali tramite Apple Business Manager: enrollment, configurazione e assegnazione al personale.",
  },
  {
    title: "05 · Cloud e accessi",
    text: "Amministrazione di AWS (IAM, EC2, S3, RDS, DNS) e GCP (IAM, DNS, policy). Gestione di gruppi e permessi per il team di sviluppo e monitoraggio dei costi sul billing account principale.",
  },
  {
    title: "06 · Coordinamento tecnico",
    text: "Pianificazione e tracciamento su Linear delle attività del team di sviluppo su bug ed evolutive della piattaforma, con scadenze e report settimanale al CTO.",
  },
];

export const skillTags = [
  "n8n", "Make", "Zapier", "Claude API", "API REST", "Google Workspace", "Microsoft 365",
  "Entra ID", "Apple Business Manager", "AWS", "GCP", "Jira", "Zendesk",
];

export const processSteps = [
  {
    n: "01",
    title: "Assessment gratuito",
    text: "In una call guardo come gestite documenti, scadenze, email e strumenti, e individuo cosa automatizzare per primo.",
  },
  {
    n: "02",
    title: "Proposta a prezzo fisso",
    text: "Scope definito, pacchetto consigliato, tempi e costi. Niente ore a consuntivo.",
  },
  {
    n: "03",
    title: "Deploy e supporto",
    text: "Configuro, testo e documento. Poi resto il referente tecnico per manutenzione, nuove automazioni e, se serve, per la gestione IT.",
  },
];

export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "#contatti";
