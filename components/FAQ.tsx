"use client";
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
            più comuni.
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
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                hidden={open !== index}
              >
                <p>{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
