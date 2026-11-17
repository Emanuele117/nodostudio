"use client";
import { useState } from "react";

function Range(props: { label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (v: number) => void }) {
  const p = ((props.value - props.min) / (props.max - props.min)) * 100;
  return (
    <div className="range">
      <label>
        <span>{props.label}</span>
        <b>{props.value}{props.unit}</b>
      </label>
      <input
        type="range"
        aria-label={props.label}
        min={props.min}
        max={props.max}
        step={props.step ?? 1}
        value={props.value}
        style={{ ["--p" as string]: `${p}%` }}
        onChange={(e) => props.onChange(Number(e.target.value))}
      />
    </div>
  );
}

const fmt = new Intl.NumberFormat("it-IT");

export default function Calculator() {
  const [people, setPeople] = useState(5);
  const [hours, setHours] = useState(6);
  const [cost, setCost] = useState(25);
  const monthly = Math.round(people * hours * 4.33 * 0.5);
  const value = monthly * cost;

  return (
    <div className="calc">
      <div>
        <p className="eyebrow">Calcolatore</p>
        <h2 className="h2">Quante ore puoi recuperare?</h2>
        <Range label="Persone che svolgono attività ripetitive" value={people} min={1} max={50} unit="" onChange={setPeople} />
        <Range label="Ore manuali a settimana per persona" value={hours} min={1} max={30} unit=" h" onChange={setHours} />
        <Range label="Costo orario medio" value={cost} min={10} max={100} unit=" €" onChange={setCost} />
      </div>
      <div className="result" aria-live="polite">
        <p className="k">Ore recuperate ogni mese</p>
        <p className="big">{fmt.format(monthly)}</p>
        <p className="k">Valore di quelle ore</p>
        <p className="mid">{fmt.format(value)} € / mese</p>
        <small>Stima con il 50% delle attività ripetitive automatizzate. Il calcolo sui tuoi processi reali lo faccio nell&apos;assessment gratuito.</small>
      </div>
    </div>
  );
}
