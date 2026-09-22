"use client";
import { VERSION } from "@/lib/version";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAgency } from "./AgencyProvider";
import { IntentSelector } from "./IntentSelector";
import { Dialog } from "./Dialog";
import { Icon } from "./Icon";
import type { Intent } from "@/data/intents";

const endpoint = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT;
export default function QuoteFlow({
  onClose,
  service,
}: {
  onClose: () => void;
  service?: string;
}) {
  const { intent, selectIntent } = useAgency();
  const [selected, setSelected] = useState<Intent | null>(intent);
  const initialIntent = useRef(intent);
  const [step, setStep] = useState(intent ? 2 : 1);
  const [description, setDescription] = useState("");
  const [hasSite, setHasSite] = useState(false);
  const [url, setUrl] = useState("");
  const [contact, setContact] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const request = useRef<AbortController | null>(null);
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, [step]);
  useEffect(() => () => request.current?.abort(), []);
  async function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (step === 1) {
      if (!selected) {
        setError("Scegli il tipo di progetto per continuare.");
        return;
      }
      selectIntent(selected);
      setStep(2);
      return;
    }
    if (step === 2) {
      if (description.trim().length < 10) {
        setError("Raccontaci qualcosa in più: bastano almeno 10 caratteri.");
        return;
      }
      setStep(3);
      return;
    }
    if (!contact.name.trim() || !contact.company.trim()) {
      setError("Inserisci nome e attività per continuare.");
      return;
    }
    setSending(true);
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      if (endpoint) {
        request.current = new AbortController();
        timeout = setTimeout(() => request.current?.abort(), 15000);
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: request.current.signal,
          body: JSON.stringify({
            intent: selected,
            service: selected === initialIntent.current ? service : undefined,
            description: description.trim(),
            hasSite,
            url: hasSite ? url.trim() : "",
            ...Object.fromEntries(
              Object.entries(contact).map(([key, value]) => [
                key,
                value.trim(),
              ]),
            ),
            version: VERSION,
          }),
        });
        if (!response.ok) throw new Error("Request failed");
      }
      setStep(4);
    } catch {
      setError(
        "Non siamo riusciti a inviare la richiesta. I dati sono ancora qui: riprova tra poco.",
      );
    } finally {
      if (timeout) clearTimeout(timeout);
      setSending(false);
    }
  }
  function finish() {
    onClose();
    window.setTimeout(
      () =>
        document
          .getElementById("lavori")
          ?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          }),
      0,
    );
  }
  return (
    <Dialog
      onClose={onClose}
      labelId={step === 4 ? "success-heading" : "quote-title"}
      className={`quote-dialog ${step === 4 ? "success-dialog dark" : ""}`}
    >
      {step === 4 ? (
        <div className="success-content">
          <span className="success-check">
            <Icon name="check" />
          </span>
          {!endpoint && (
            <p className="demo-notice">
              Demo completata · nessuna richiesta inviata
            </p>
          )}
          <h2 id="success-heading" ref={titleRef} tabIndex={-1}>
            Richiesta ricevuta.
          </h2>
          <p>
            Grazie. Leggeremo quello che ci hai raccontato e ti ricontatteremo
            per approfondire il progetto.
          </p>
          <button
            type="button"
            className="button button-outline"
            onClick={finish}
          >
            Vedi i nostri lavori
          </button>
        </div>
      ) : (
        <>
          <p id="quote-title" className="quote-title">
            Richiedi un preventivo
          </p>
          <ol className="quote-progress" aria-label="Avanzamento">
            {[1, 2, 3].map((number) => (
              <li
                key={number}
                className={number <= step ? "active" : ""}
                aria-current={number === step ? "step" : undefined}
              >
                <span>{number}</span>
                <span className="sr-only">
                  {number === 1
                    ? "Progetto"
                    : number === 2
                      ? "Obiettivi"
                      : "Contatti"}
                  {number < step ? ", completato" : ""}
                </span>
              </li>
            ))}
          </ol>
          <form onSubmit={next} className="quote-form">
            <div className="quote-fields" key={step}>
              <h2 ref={titleRef} tabIndex={-1}>
                {step === 1
                  ? "Cosa vuoi realizzare?"
                  : step === 2
                    ? "Cosa vorresti ottenere?"
                    : "Dove possiamo ricontattarti?"}
              </h2>
              {step === 1 && (
                <IntentSelector
                  value={selected}
                  onChange={setSelected}
                  variant="form"
                />
              )}
              {step === 2 && (
                <>
                  <label className="field">
                    <span className="sr-only">Descrivi il progetto</span>
                    <textarea
                      name="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Raccontaci in poche righe cosa vorresti realizzare..."
                      required
                      minLength={10}
                      maxLength={5000}
                      rows={5}
                    />
                  </label>
                  <fieldset className="site-choice">
                    <legend>Hai già un sito?</legend>
                    <div>
                      {[true, false].map((value) => (
                        <label
                          key={String(value)}
                          className={hasSite === value ? "selected" : ""}
                        >
                          <input
                            type="radio"
                            name="hasSite"
                            checked={hasSite === value}
                            onChange={() => setHasSite(value)}
                          />
                          <span>{value ? "Sì" : "No"}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {hasSite && (
                    <label className="field">
                      <span>
                        Indirizzo del sito <small>(opzionale)</small>
                      </span>
                      <input
                        type="url"
                        name="url"
                        placeholder="https://"
                        autoComplete="url"
                        maxLength={2000}
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                      />
                    </label>
                  )}
                </>
              )}
              {step === 3 && (
                <>
                  <label className="field">
                    <span>Nome</span>
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      value={contact.name}
                      onChange={(event) =>
                        setContact({ ...contact, name: event.target.value })
                      }
                    />
                  </label>
                  <label className="field">
                    <span>Attività / Azienda</span>
                    <input
                      name="company"
                      autoComplete="organization"
                      required
                      maxLength={160}
                      value={contact.company}
                      onChange={(event) =>
                        setContact({ ...contact, company: event.target.value })
                      }
                    />
                  </label>
                  <label className="field">
                    <span>
                      Telefono / WhatsApp <small>(opzionale)</small>
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      maxLength={40}
                      value={contact.phone}
                      onChange={(event) =>
                        setContact({ ...contact, phone: event.target.value })
                      }
                    />
                  </label>
                  <label className="field">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={contact.email}
                      onChange={(event) =>
                        setContact({ ...contact, email: event.target.value })
                      }
                    />
                  </label>
                  {!endpoint && (
                    <p className="demo-notice">
                      Modalità demo: i dati non vengono inviati né salvati.
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="quote-bottom">
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <div className="quote-buttons">
                {step > 1 && (
                  <button
                    className="icon-button back-button"
                    type="button"
                    aria-label="Torna allo step precedente"
                    disabled={sending}
                    onClick={() => {
                      setError("");
                      setStep(step - 1);
                    }}
                  >
                    <Icon name="arrow" className="rotate-180" />
                  </button>
                )}
                <button
                  type="submit"
                  className="button button-dark"
                  disabled={sending}
                >
                  {sending
                    ? "Invio in corso…"
                    : step === 3
                      ? "Richiedi il preventivo"
                      : "Continua"}
                  {step !== 3 && <Icon name="arrow" />}
                </button>
              </div>
              {step === 3 && (
                <p className="microcopy">
                  Nessun impegno. Leggiamo la richiesta e ti ricontattiamo per
                  capire meglio il progetto.
                </p>
              )}
            </div>
          </form>
        </>
      )}
    </Dialog>
  );
}
