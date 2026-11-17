import HeroNetwork from "@/components/HeroNetwork";
import BeforeAfter from "@/components/BeforeAfter";
import Calculator from "@/components/Calculator";
import Chat from "@/components/Chat";
import Reveal from "@/components/Reveal";
import { bookingUrl, packs, processSteps, skills, skillTags, tools, works } from "@/lib/content";

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const vat = process.env.NEXT_PUBLIC_VAT;

export default function Home() {
  return (
    <main>
      <Reveal />

      <header className="topbar">
        <a href="#" className="logo">nodo<span>/</span>studio</a>
        <span className="where">Roma · operativo da remoto in tutta Italia</span>
      </header>

      <section className="hero">
        <HeroNetwork />
        <div className="wrap hero-inner">
          <p className="eyebrow">Automazioni per studi professionali e PMI</p>
          <h1>
            <span className="line"><span>Il lavoro ripetitivo</span></span>
            <span className="line"><span>lo fanno</span></span>
            <span className="line"><span>le automazioni.</span></span>
          </h1>
          <p className="sub">
            Collego email, PEC, gestionali e fogli di calcolo con workflow su n8n e Make, anche con l&apos;AI.
            Per commercialisti, CAF, studi legali e PMI che perdono ore in copia e incolla. Un solo referente
            tecnico, anche per l&apos;IT.
          </p>
        </div>
        <div className="hero-foot">
          <a href="#prima-dopo" className="scroll">Scorri per vedere i flussi<span className="arrow">↓</span></a>
          <nav>
            <a href="#pacchetti">01 Automazioni</a>
            <a href="#pacchetti">02 IT gestito</a>
          </nav>
        </div>
      </section>

      <div className="marquee" aria-label="Strumenti che integro">
        <div className="marquee-track">
          {[...tools, ...tools].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      <section className="section" id="prima-dopo" style={{ borderTop: 0 }}>
        <div className="wrap reveal">
          <p className="eyebrow">Prima e dopo</p>
          <h2 className="h2">Da processo manuale a workflow.</h2>
          <p className="lead" style={{ marginBottom: 40 }}>Scegli uno scenario e confronta lo stesso processo eseguito a mano e automatizzato.</p>
          <BeforeAfter />
        </div>
      </section>

      <section className="section" id="pacchetti">
        <div className="wrap section-head reveal">
          <div>
            <p className="eyebrow">Pacchetti e prezzi</p>
            <h2 className="h2">Due servizi, scope definito.</h2>
            <p className="lead">Si parte dalle automazioni. Quando serve, si aggiunge la gestione IT. Combinando i due pacchetti, lo sconto si applica alla parte una tantum.</p>
          </div>
          <span className="hint">Scorri →</span>
        </div>
        <div className="hscroll reveal">
          {packs.map((p) => (
            <article className="pack" key={p.n}>
              <div className="left">
                <p className="n">{p.n}</p>
                <h3>{p.title}</h3>
                <p className="desc">{p.desc}</p>
                <div className="example" style={{ marginTop: 28 }}>{p.example}</div>
              </div>
              <div>
                <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <div className="prices">
                  {p.prices.map((pr) => (
                    <div key={pr.label}><span>{pr.label}</span><span>{pr.value}</span></div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="lavori">
        <div className="wrap section-head reveal">
          <div>
            <p className="eyebrow">Lavori</p>
            <h2 className="h2">Ogni progetto, passo per passo.</h2>
            <p className="lead">Il problema di partenza, i passaggi del workflow, il risultato e lo stack usato.</p>
          </div>
          <span className="hint">Scorri →</span>
        </div>
        <div className="hscroll reveal">
          {works.map((w) => (
            <article className={`work ${w.highlight ? "hl" : ""}`} key={w.title}>
              <div className="top"><span>{w.tag}</span><span>{w.meta}</span></div>
              <h3>{w.title}</h3>
              <p className="lbl">Problema</p>
              <p>{w.problem}</p>
              <p className="lbl">{w.stepsLabel}</p>
              <ol>{w.steps.map((s) => <li key={s}>{s}</li>)}</ol>
              <p className="lbl">Risultato</p>
              <p>{w.result}</p>
              <div className="tags">{w.stack.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section about" id="chi-sono">
        <div className="wrap reveal">
          <p className="eyebrow">Chi sono</p>
          <h2 className="h2">Sono Emanuele. Lavori con me, dall&apos;inizio alla fine.</h2>
          <p className="lead">
            Ho gestito IT operations e automazioni di un gruppo di tre aziende, lavorando a stretto contatto con il CTO.
            Oggi porto lo stesso metodo a studi professionali e PMI che non hanno un reparto IT interno.
          </p>
          <div className="grid3">
            {skills.map((s) => (
              <div className="skill" key={s.title}><h4>{s.title}</h4>{s.text}</div>
            ))}
          </div>
          <div className="tags" style={{ maxWidth: 900 }}>{skillTags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        </div>
      </section>

      <section className="section" id="calcolatore">
        <div className="wrap reveal"><Calculator /></div>
      </section>

      <section className="section process" id="come-lavoro">
        <div className="wrap reveal">
          <p className="eyebrow">Come lavoro</p>
          <h2 className="h2">Assessment, proposta, deploy.</h2>
          <div className="steps">
            {processSteps.map((s) => (
              <div className="step" key={s.n}><span className="n">{s.n}</span><h3>{s.title}</h3><p>{s.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contatti">
        <div className="wrap contact reveal">
          <div>
            <p className="eyebrow">Contatti</p>
            <h2 className="h2">Dimmi da dove partire.</h2>
            <p className="lead">L&apos;assistente raccoglie le informazioni di base, ti indica il pacchetto adatto e ti fa prenotare l&apos;assessment gratuito con me.</p>
          </div>
          <Chat />
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span>nodo/studio · Emanuele · Roma</span>
          <span>{[email, vat ? `P.IVA ${vat}` : null].filter(Boolean).join(" · ")}</span>
        </div>
      </footer>

      <a className="fab hide" href={bookingUrl} target={bookingUrl.startsWith("http") ? "_blank" : undefined} rel="noopener">
        Prenota una call
      </a>
    </main>
  );
}
