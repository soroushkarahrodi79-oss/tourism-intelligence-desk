# Tourism Intelligence Desk

**Prototype v0.2 — evidence-status-aware tourism decision support**

Tourism Intelligence Desk is a research-oriented prototype for turning tourism and territorial evidence into structured decision-support assessments with explicit uncertainty, evidence limits, competing explanations, provenance, and anti-causality guardrails.

It currently contains two deliberately different evidence modes:

- **HATI Madrid — REPRODUCED RESEARCH.** A bounded evidence snapshot from the public, `RELEASE_LOCKED` HATI-Madrid pilot. The committed screening chain was independently re-executed and all 10 regenerated tables matched the locked references. The SOLWEIG/Tmrt/UTCI thermal field remains **model-derived**, not field-validated thermal truth.
- **SNTO Sierra de Guadarrama — DEMONSTRATION.** Curated demonstration/proxy values used to exercise the same evidence-reasoning interface. These are not live SNTO observations.

The distinction is intentional: **reproducibility, model derivation, direct observation, and operational validation are different evidence states.**

## HATI evidence now represented in v0.2

The HATI case no longer uses invented LST, pedestrian-flow, or live-sensor fixtures. It exposes the actual locked pilot evidence ceiling:

- 27 curated tourism assets in the Prado–Retiro–Atocha pilot;
- 42 outdoor asset × timestamp observations;
- 14 / 42 (33.3%) thermal-method reclassifications;
- 9 physical-more-restrictive and 5 physical-less-restrictive cases;
- 7 / 8 scenarios with a changed candidate set vs a proximity-only nearest-open comparator;
- 3 / 8 nearest-open picks excluded by the locked screening;
- 23 open, in-radius options removed by thermal/evidence gates;
- S8 preserving an explicit `NO_DEFENSIBLE_ALTERNATIVE` state at 500 m;
- decision confidence 35 ROBUST / 6 BOUNDARY / 1 UNSTABLE under the tested uncertainty dimensions.

Source research: [HATI-Madrid repository](https://github.com/soroushkarahrodi79-oss/heat-adaptive-tourism-madrid) · Zenodo DOI [10.5281/zenodo.22707470](https://doi.org/10.5281/zenodo.22707470).

The app also encodes the HATI claim ceiling: **no tourist behaviour, route-choice response, safety outcome, or health outcome was measured by the locked pilot.**

## Architecture

The current prototype intentionally uses a **deterministic rule-based assessment engine**, not a generative-AI runtime.

Questions are handled in two ways:

1. **Curated evidence match** — returns a predefined assessment whose claims, limits, metrics, and provenance are tied to the case evidence.
2. **Unmatched custom question** — returns a bounded **INSUFFICIENT EVIDENCE** response rather than inventing measurements, effect sizes, significance tests, causal shares, or operational recommendations.

No Gemini API key is required.

The reasoning contract is:

1. Observed signal / result
2. Supporting evidence
3. Interpretation
4. Evidence limit
5. Competing explanations / confounders
6. Evidence confidence
7. Decision implication
8. Data needed next
9. Provenance

## Evidence states

The interface distinguishes:

- **Demonstration** — illustrative values for workflow testing.
- **Proxy** — indirect evidence.
- **Model-derived** — explicit model output; not automatically observed or validated.
- **Reproduced** — a committed analysis chain was independently re-executed and matched locked references.
- **Observed** — directly observed evidence with known provenance.
- **Validated** — evidence that has passed a stated validation threshold for the claim at hand.

A higher evidence state in one dimension does not erase limits in another. For example, HATI's headline screening outputs are reproduced while its UTCI/Tmrt field remains model-derived and unvalidated against field measurements.

## Epistemic contract

The quality gate enforces the highest-risk boundaries:

- correlation or co-occurrence is never promoted to causation;
- unmatched questions cannot fabricate quantitative attribution;
- reproduced research cannot be presented as current operational evidence;
- model-derived thermal output cannot be relabelled as observed comfort;
- demonstration data cannot justify operational intervention;
- evidence absence is stated explicitly rather than filled with plausible-sounding values;
- map providers retain visible attribution.

## Run locally

The repository commits a Bun lockfile.

**Prerequisite:** Bun 1.x

```bash
bun install --frozen-lockfile
bun run dev
```

## Quality gate

Run:

```bash
bun run check
```

The same gate runs in GitHub Actions:

- TypeScript typecheck
- epistemic regression tests
- production Vite build

## AI Studio origin

The first visual prototype originated in Google AI Studio:

https://ai.studio/apps/98264a97-707c-4e7e-b1c8-4d002131227d

The GitHub repository is the auditable source of the hardened implementation.

## Scope and limitations

- HATI values are bounded to its locked 21 August 2023 Madrid pilot and must not be presented as current Madrid conditions.
- HATI modelled UTCI/Tmrt is not field-validated thermal truth.
- SNTO values remain demonstration/proxy values unless explicitly marked otherwise.
- The Decision Support Brief is a research/prototyping output, not an official administrative document.
- The prototype does not replace field validation, formal environmental assessment, or institutional decision procedures.
- The system does not establish tourism causality from environmental correlation alone.

## Professional positioning

Tourism Intelligence Desk demonstrates a reproducible decision-support pattern at the intersection of **Tourism Intelligence · Geospatial Research · Decision Systems**.
