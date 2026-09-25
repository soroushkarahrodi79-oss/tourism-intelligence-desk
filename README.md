# Tourism Intelligence Desk

**Prototype v0.3 — evidence-status-aware tourism decision support**

Tourism Intelligence Desk is a research-oriented prototype for turning tourism and territorial evidence into structured decision-support assessments with explicit uncertainty, evidence limits, competing explanations, provenance, and anti-causality guardrails.

Version 0.3 contains two evidence-backed research cases with different evidence ceilings:

- **HATI Madrid — REPRODUCED RESEARCH.** A bounded snapshot of the public, `RELEASE_LOCKED` HATI-Madrid pilot. The committed screening chain was independently re-executed and all 10 regenerated tables matched the locked references. SOLWEIG/Tmrt/UTCI remains **model-derived**, not field-validated thermal truth.
- **SNTO Sierra de Guadarrama — REAL OBSERVATIONS + DERIVED INDICATORS.** Real Sentinel-2 observations underpin 2021–2026 NDVI/NDMI/EVI time series and derived trend statistics for 21 PNSG campaign assets, plus official OAPN / PRUG management context. No asset/trail-scale visitor-use target and no completed field-validation campaign are available.

The central rule is:

> **Reproduced ≠ observed ≠ derived ≠ model-derived ≠ validated ≠ operational.**

## HATI evidence represented

The HATI case exposes the actual locked-pilot evidence ceiling:

- 27 curated tourism assets in the Prado–Retiro–Atocha pilot;
- 42 outdoor asset × timestamp observations;
- 14 / 42 (33.3%) thermal-method reclassifications;
- 9 physical-more-restrictive and 5 physical-less-restrictive cases;
- 7 / 8 scenarios with a changed candidate set vs a proximity-only nearest-open comparator;
- 3 / 8 nearest-open picks excluded by the locked screening;
- 23 open, in-radius options removed by thermal/evidence gates;
- S8 preserving an explicit `NO_DEFENSIBLE_ALTERNATIVE` state at 500 m;
- decision confidence 35 ROBUST / 6 BOUNDARY / 1 UNSTABLE under the tested uncertainty dimensions.

Source: [HATI-Madrid](https://github.com/soroushkarahrodi79-oss/heat-adaptive-tourism-madrid) · Zenodo DOI [10.5281/zenodo.22707470](https://doi.org/10.5281/zenodo.22707470).

HATI does **not** establish tourist behaviour, route-choice response, safety outcomes, health outcomes, or current Madrid operating conditions.

## SNTO evidence represented

The SNTO case replaces the original demonstration telemetry and invented trail-pressure fixtures with a bounded snapshot of the real PNSG evidence already committed in SNTO:

- **21 real Sentinel-2 campaign assets**, monthly coverage from 2021-01 to 2026-06;
- derived NDVI trend distribution: **6 significant greening · 14 no significant trend · 1 significant decline**;
- the only significant declining NDVI asset is **Maliciosa-Porrones** (Kendall τ = -0.369; p ≈ 0), while its NDMI trend is significantly increasing (τ = +0.215; p = 0.0114);
- **218 official OAPN trail geometries** exist in the seasonal Pipeline-A layer, combined with real Sentinel-2 environmental signal and PRUG zoning;
- that 218-trail layer reports **165 improving / 46 worsening** in its two-scene environmental signal, but it is not a multi-year per-trail trend and is not a visitor-pressure ranking;
- **no real asset/trail-scale visitor-use target series** is ingested;
- field-validation campaign **#26 has not run**;
- current SNTO decision ceiling is **L5a: monitoring / inspection**. Closure, quota, restoration-budget allocation, effectiveness, regeneration, and tourism-impact causality are outside the current evidence ceiling.

Source: [SNTO Smart Nature Tourism Observatory](https://github.com/soroushkarahrodi79-oss/snto-smart-tourism-observatory) · Zenodo DOI [10.5281/zenodo.20818269](https://doi.org/10.5281/zenodo.20818269).

## Architecture

The prototype intentionally uses a **deterministic rule-based assessment engine**, not a generative-AI runtime.

Questions are handled in two ways:

1. **Curated evidence match** — returns an assessment whose claims, limits, metrics, and provenance are tied to the case evidence.
2. **Unmatched custom question** — returns a bounded **INSUFFICIENT EVIDENCE** response while preserving the case's real evidence status; it does not invent measurements, effect sizes, significance tests, causal shares, or operational recommendations.

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

- **Demonstration** — illustrative values used to exercise a workflow.
- **Proxy** — indirect evidence.
- **Observed** — direct observation / measurement with documented provenance.
- **Derived** — an indicator or statistic calculated from observed evidence, such as NDVI or a trend test.
- **Model-derived** — output from an explicit model; not automatically observed or validated.
- **Reproduced** — a committed analysis chain was independently re-executed and matched its locked references.
- **Validated** — evidence that passed a stated validation threshold for the specific claim.

Evidence states do not form a single ladder. A result may be computationally reproduced while still being model-derived; an indicator may be derived from real observations while still lacking field validation or causal attribution.

## Epistemic contract

The quality gate enforces high-risk boundaries:

- correlation or co-occurrence is never promoted to causation;
- unmatched questions cannot fabricate quantitative attribution;
- HATI reproduced research cannot be presented as current operational evidence;
- HATI thermal model output cannot be relabelled as observed pedestrian comfort;
- SNTO environmental change cannot be relabelled as tourism pressure or impact;
- SNTO municipal / contextual evidence cannot be converted into trail-level visitor counts;
- missing pressure or field data cannot be silently replaced by synthetic precision;
- restrictive management is blocked when the case evidence ceiling does not authorize it;
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

GitHub Actions runs the same gate:

- TypeScript typecheck
- epistemic regression tests
- production Vite build

## AI Studio origin

The first visual prototype originated in Google AI Studio:

https://ai.studio/apps/98264a97-707c-4e7e-b1c8-4d002131227d

The GitHub repository is the auditable source of the hardened implementation.

## Scope and limitations

- HATI values are bounded to the locked 21 August 2023 Madrid pilot.
- HATI modelled UTCI/Tmrt is not field-validated thermal truth.
- SNTO NDVI/NDMI/EVI and trend results are environmental evidence, not tourism-impact attribution.
- SNTO field validation #26 remains pending and visitor-pressure readiness remains insufficient at asset/trail scale.
- The Decision Support Brief is a research/prototyping output, not an official administrative document.
- The prototype does not replace field validation, formal environmental assessment, or institutional decision procedures.

## Professional positioning

Tourism Intelligence Desk demonstrates an evidence-governance and decision-support pattern at the intersection of **Tourism Intelligence · Geospatial Research · Decision Systems**.
