# Interview Narrative — Tourism Intelligence Desk

## 30-second answer

> I built Tourism Intelligence Desk to solve a problem I kept seeing in tourism and geospatial analysis: a real environmental signal can easily be turned into a stronger causal or management claim than the evidence supports. The product integrates two of my research cases, HATI and SNTO, but keeps their evidence states separate. It uses deterministic guardrails, explicit claim ceilings and immutable provenance, so an unsupported question can end in “insufficient evidence” instead of a confident-looking recommendation.

## 90-second answer

> Tourism Intelligence Desk is a public research-engineering prototype for evidence-governed tourism decision support. I integrated two projects with very different evidence structures. HATI has a reproduced screening chain with model-derived thermal inputs, while SNTO has real Sentinel-2 observations and derived vegetation trends but lacks trail-scale visitor-pressure evidence and completed field validation.
>
> The main design decision was not to hide those differences behind one score. I modelled evidence status explicitly, added structured sections for evidence limits, competing explanations, confidence, decision implications and next data, and used a deterministic routing layer rather than a generative model for scientific claims.
>
> A good example is the SNTO Maliciosa-Porrones case. There is a real significant NDVI decline, but the system refuses to call it tourism damage because visitor exposure and field-condition evidence are missing. A second example is HATI: the screening outputs are reproducible, but the thermal field remains model-derived, so the app does not describe it as observed pedestrian comfort.
>
> I then made the product auditable: source evidence is pinned to immutable Git commits, CI regression tests protect the claim boundaries, and the public deployment exposes its build SHA.

## If asked “Why not just use an LLM?”

> I deliberately did not use an LLM to generate scientific conclusions. The risk was that fluent language could create measurements, causal shares or recommendations that were not in the evidence. The current engine is deterministic and bounded. A future LLM could help explain or summarize verified evidence objects, but it should not create the evidence layer.

## If asked “What is the strongest technical part?”

> The strongest part is the evidence contract across the full product: the source cases have explicit provenance, the assessment engine is constrained by evidence states and claim ceilings, regression tests enforce the dangerous boundaries, and the public build is linked back to exact source snapshots.

## If asked “What would you build next?”

> I would not add more dashboards first. I would deepen one operational slice with current, validated inputs and a clearly defined decision owner. For SNTO, that means visitor-use evidence and field validation. For HATI, it means current operational thermal inputs and physical validation if accuracy claims are needed.

## If asked “What did you personally do?”

> I designed the evidence model and product architecture, integrated the HATI and SNTO evidence states, implemented the deterministic analytical guardrails, built the public React/TypeScript interface, added provenance and regression tests, and set up the CI-verified public deployment.

## Interview boundary

Avoid saying:
- “the AI determines the cause”;
- “the app predicts tourists”;
- “SNTO proves tourism degradation”;
- “HATI is real-time”;
- “the system is validated for policy.”

Prefer:
- “the system structures evidence and decision limits”;
- “the result is reproduced / derived / model-derived, depending on the case”;
- “the product refuses unsupported attribution”;
- “the next step is claim-specific validation.”
