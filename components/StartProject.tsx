"use client";
import { useState, type FormEvent } from "react";
import { services } from "@/data/services";
import { useAgency } from "./AgencyProvider";
import { Icon } from "./Icon";
export function StartProject() {
  const { openQuote, ready } = useAgency();
  const [selected, setSelected] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (description.trim().length < 10) {
      setError("Raccontaci qualcosa in più: bastano almeno 10 caratteri.");
      return;
    }
    const service = services.find((s) => s.id === selected);
    setError("");
    openQuote(service?.intent || "other", service?.title, description.trim());
  }
  return (
    <form className="start-form" id="form" onSubmit={submit}>
      <fieldset>
        <legend>Da dove partiamo?</legend>
        <div className="start-options">
          {[
            ...services.map((s) => ({ id: s.id, label: s.shortTitle })),
            { id: "", label: "Non so ancora" },
          ].map((s) => (
            <label
              className={`start-choice ${selected === s.id ? "selected" : ""}`}
              key={s.id}
            >
              <input
                type="radio"
                name="start-service"
                value={s.id}
                checked={selected === s.id}
                onChange={() => setSelected(s.id)}
              />
              <Icon name={selected === s.id ? "check" : "plus"} />
              <span>{s.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="start-description" htmlFor="start-description">
        Cosa vorresti ottenere?
      </label>
      <textarea
        id="start-description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setError("");
        }}
        required
        minLength={10}
        maxLength={5000}
        placeholder="Raccontaci in poche righe cosa vorresti realizzare..."
        aria-describedby={error ? "start-error" : undefined}
      />
      {error && (
        <p id="start-error" role="alert" className="form-error">
          {error}
        </p>
      )}
      <div className="start-actions">
        <p>
          Nessun impegno.
          <br />
          <span>Il prossimo passo: come ricontattarti.</span>
        </p>
        <button className="button button-light" type="submit" disabled={!ready}>
          Continua
          <Icon name="arrow" className="button-arrow" />
        </button>
      </div>
    </form>
  );
}
