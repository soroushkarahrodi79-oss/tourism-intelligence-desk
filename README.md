# Tourism Intelligence Desk

**Prototype v0.1 — deterministic evidence-guardrail decision support**

Tourism Intelligence Desk is a research-oriented prototype that demonstrates how tourism and territorial questions can be structured through explicit evidence limits, competing explanations, uncertainty, and anti-causality guardrails.

Current case studies:

- **HATI Madrid** — urban heat, pedestrian thermal exposure, and microclimate decision support.
- **SNTO Sierra de Guadarrama** — environmental monitoring, Earth observation, and tourism-pressure attribution limits.

> **Important:** The current app uses curated **demonstration/proxy values** to demonstrate the reasoning workflow. It is not connected to live sensors, live satellite ingestion, or an operational management system.

## Architecture

Version 0.1 intentionally uses a **deterministic rule-based assessment engine** rather than a generative-AI runtime. Analytical questions are routed through curated assessments and explicit guardrails in `src/services/analysisEngine.ts` and `src/data/cases.ts`.

This design makes the prototype reproducible and prevents an LLM from inventing evidence, causal claims, or operational recommendations. No Gemini API key is required.

The core reasoning sequence is:

1. Observed signal
2. Supporting evidence
3. Interpretation
4. Evidence limit
5. Competing explanations / confounders
6. Evidence confidence
7. Decision implication
8. Data needed next

If evidence is insufficient for a causal or operational conclusion, the system is designed to return **INSUFFICIENT EVIDENCE** rather than force a recommendation.

## Run locally

**Prerequisite:** Node.js

```bash
npm install
npm run dev
```

No external API key is required for the current prototype.

## Quality checks

```bash
npm run lint
npm run build
```

## AI Studio preview

The prototype originated in Google AI Studio and can be previewed there:

https://ai.studio/apps/98264a97-707c-4e7e-b1c8-4d002131227d

## Scope and limitations

- Numerical values shown in demonstration mode are illustrative unless explicitly marked otherwise.
- Reference evidence sources are not necessarily ingested at runtime.
- The app does not establish causal tourism impacts from environmental correlation alone.
- The generated Decision Support Brief is a research/prototyping output and is **not for operational decision-making** when demonstration or proxy data are active.
- The prototype does not replace field validation, formal environmental assessment, or institutional decision procedures.

## Professional positioning

This project demonstrates a reproducible decision-support pattern at the intersection of **Tourism Intelligence · Geospatial Research · Decision Systems**.
