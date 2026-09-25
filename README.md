# Tourism Intelligence Desk

**Prototype v0.1 — deterministic evidence-guardrail decision support**

Tourism Intelligence Desk is a research-oriented prototype that demonstrates how tourism and territorial questions can be structured through explicit evidence limits, competing explanations, uncertainty, and anti-causality guardrails.

Current case studies:

- **HATI Madrid** — urban heat, pedestrian thermal exposure, and microclimate decision support.
- **SNTO Sierra de Guadarrama** — environmental monitoring, Earth observation, and tourism-pressure attribution limits.

> **Important:** The current app uses curated **demonstration/proxy values** to demonstrate the reasoning workflow. It is not connected to live sensors, live satellite ingestion, or an operational management system.

## Architecture

Version 0.1 intentionally uses a **deterministic rule-based assessment engine** rather than a generative-AI runtime. Analytical questions are routed through curated assessments and explicit guardrails in `src/services/analysisEngine.ts` and `src/data/cases.ts`.

The engine has two behaviors:

1. **Curated question match** — returns a predefined demonstration assessment with explicit provenance, limits, confounders, and data status.
2. **Unmatched custom question** — returns a bounded **INSUFFICIENT EVIDENCE** response rather than synthesizing new measurements, effect sizes, significance tests, causal shares, or operational recommendations.

This design makes the prototype reproducible and prevents free-form generation from inventing evidence or causal claims. No Gemini API key is required.

The core reasoning sequence is:

1. Observed signal
2. Supporting evidence
3. Interpretation
4. Evidence limit
5. Competing explanations / confounders
6. Evidence confidence
7. Decision implication
8. Data needed next

## Epistemic contract

The v0.1 quality gate is intentionally strict:

- correlation or spatial co-occurrence is never treated as causation;
- demonstration data cannot justify an operational intervention by itself;
- unmatched custom questions cannot fabricate quantitative attribution;
- unknown variables remain unknown rather than being inferred from unrelated indicators;
- reference data sources are distinguished from runtime-ingested observations;
- provider attribution remains visible on map baselayers.

Regression tests in `tests/analysisEngine.test.ts` enforce the highest-risk guardrails, including the NDVI/tourism causality trap and custom-query fallback behavior.

## Run locally

The repository commits a Bun lockfile for reproducible installs.

**Prerequisite:** Bun 1.x

```bash
bun install --frozen-lockfile
bun run dev
```

No external API key is required for the current prototype.

## Quality gate

Run the same gate used by GitHub Actions:

```bash
bun run check
```

It executes:

- TypeScript typecheck
- epistemic regression tests
- production Vite build

CI configuration: `.github/workflows/ci.yml`.

## AI Studio preview

The prototype originated in Google AI Studio and can be previewed there:

https://ai.studio/apps/98264a97-707c-4e7e-b1c8-4d002131227d

The GitHub repository is the auditable source for the hardened v0.1 codebase.

## Scope and limitations

- Numerical values shown in demonstration mode are illustrative unless explicitly marked otherwise.
- Reference evidence sources are not necessarily ingested at runtime.
- The app does not establish causal tourism impacts from environmental correlation alone.
- The generated Decision Support Brief is a research/prototyping output and is **not for operational decision-making** when demonstration or proxy data are active.
- The prototype does not replace field validation, formal environmental assessment, or institutional decision procedures.

## Professional positioning

This project demonstrates a reproducible decision-support pattern at the intersection of **Tourism Intelligence · Geospatial Research · Decision Systems**.
