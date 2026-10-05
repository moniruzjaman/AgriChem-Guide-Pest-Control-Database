# PesticideNext Intelligence Engine

## What was added

The app now has a first-party **Pesticide Intelligence** route that combines:

1. The existing DAE pesticide catalogue.
2. Existing IRAC / FRAC / HRAC MoA metadata.
3. Existing spray-history / last-MoA concept.
4. Live Open-Meteo weather signals.
5. Weather-fit spray-window scoring.
6. Disease-pressure screening from humidity, leaf-wetness proxy, temperature and rain probability.
7. Registered-product ranking with an explicit resistance-management guard.
8. GPS/manual field coordinates.
9. Bangla / English explanations.

## Runtime

No new npm package is required for the first integration. The engine uses browser-native `fetch` and the existing React/Vite stack, so the current `npm ci` deployment remains the installation path.

The uploaded **Krishi Weather Intelligence 0.2.0** design is treated as the evidence-layer reference. Its weather/risk concepts are intentionally kept separate from the pesticide decision layer so a pesticide recommendation never pretends that weather alone identifies a pest or authorizes a chemical.

## Route

`#intelligence`

The route is available from the main tab bar, navigation drawer, Home feature system, and Share modal.

## Decision model

The engine ranks candidates using:

- crop match
- optional pest match
- weather suitability
- previous-MoA conflict
- resistance-risk metadata
- PHI metadata

A result marked **avoid** is a guardrail, not a prohibition. The product label, DAE registration, local extension guidance and field scouting remain authoritative.

## Production next step

For a full production pesticide engine, the next layer should consume structured DAE label records rather than infer application decisions from free-text fields. Recommended future inputs include:

- registration status and expiry
- exact crop / pest / formulation / dose rows
- rainfast interval
- REI / PHI
- IRAC / FRAC / HRAC code
- tank-mix compatibility
- resistance-management rules
- local outbreak observations
- weather forecast windows

