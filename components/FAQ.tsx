"use client";
import { DisclosurePanel } from "./DisclosurePanel";
import { RichText } from "./RichText";
import { useState } from "react";
import { faq } from "@/data/faq";
import { SectionHeading } from "./SectionHeading";
import { Icon } from "./Icon";
export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="section faq" aria-labelledby="faq-heading">
      <div className="container split-layout">
        <div className="sticky-heading">
          <SectionHeading eyebrow="FAQ" id="faq-heading">
            Le risposte
            <br />
            alle domande
            <br />
            <strong>più comuni.</strong>
          </SectionHeading>
        </div>
        <div className="faq-list">
          {faq.map(([question, answer], index) => (
            <div className="faq-item" key={question}>
              <h3>
                <button
                  type="button"
                  id={`faq-question-${index}`}
                  aria-expanded={open === index}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  {question}
                  <Icon name="plus" />
                </button>
              </h3>
              <DisclosurePanel
                id={`faq-answer-${index}`}
                labelId={`faq-question-${index}`}
                open={open === index}
              >
                <p>
                  <RichText text={answer} />
                </p>
              </DisclosurePanel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
