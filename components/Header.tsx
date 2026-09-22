"use client";
import { useState } from "react";
import { Icon } from "./Icon";
import { QuoteButton } from "./QuoteButton";
import { Dialog } from "./Dialog";
import { useAgency } from "./AgencyProvider";
export function Header() {
  const [menu, setMenu] = useState(false);
  const { openQuote, ready } = useAgency();
  return (
    <>
      <header className="header">
        <a href="#inizio" aria-label="/A — Inizio" className="wordmark">
          /A
        </a>
        <nav aria-label="Navigazione principale" className="desktop-nav">
          <a href="#lavori">Lavori</a>
          <a href="#servizi">Servizi</a>
          <a href="#approccio">Approccio</a>
        </nav>
        <div className="header-actions">
          <QuoteButton className="button-outline header-quote">
            Preventivo
          </QuoteButton>
          <button
            className="icon-button menu-button"
            type="button"
            aria-label="Apri menu"
            disabled={!ready}
            aria-expanded={menu}
            onClick={() => setMenu(true)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>
      {menu && (
        <Dialog
          onClose={() => setMenu(false)}
          labelId="menu-title"
          className="menu-dialog"
        >
          <p id="menu-title" className="eyebrow">
            /A — Menu
          </p>
          <nav aria-label="Menu">
            <a href="#lavori" onClick={() => setMenu(false)}>
              Lavori <Icon name="arrow" />
            </a>
            <a href="#servizi" onClick={() => setMenu(false)}>
              Servizi <Icon name="arrow" />
            </a>
            <a href="#approccio" onClick={() => setMenu(false)}>
              Approccio <Icon name="arrow" />
            </a>
            <a href="#faq" onClick={() => setMenu(false)}>
              FAQ <Icon name="arrow" />
            </a>
            <button
              onClick={() => {
                setMenu(false);
                openQuote();
              }}
            >
              Preventivo <Icon name="arrow" />
            </button>
          </nav>
        </Dialog>
      )}
    </>
  );
}
