---
name: Data correction
about: Report or propose a correction to the pesticide catalogue (dose, MoA code, toxicity class, restriction)
labels: data-correction
title: "[data] "
body:
  - type: input
    id: product
    attributes:
      label: Product (brand name)
    validations:
      required: true
  - type: input
    id: regno
    attributes:
      label: DAE registration number
      placeholder: "e.g. AP-1020 / AP(Bio)-02"
    validations:
      required: true
  - type: dropdown
    id: field
    attributes:
      label: Which field is wrong?
      options:
        - MoA code (IRAC/FRAC/HRAC group)
        - Dose / recommendation
        - Recommended crop or pest
        - Toxicity class / WHO band
        - Registration status (banned / restricted / expired)
        - Formulation
        - Other / missing product
    validations:
      required: true
  - type: textarea
    id: current
    attributes:
      label: What the app currently shows
    validations:
      required: true
  - type: textarea
    id: correct
    attributes:
      label: What it should be (and your source)
      description: Label photo, PTAC gazette, official register page or IRAC classification page — a correction without a source cannot be merged.
    validations:
      required: true
  - type: checkboxes
    id: safety
    attributes:
      label: Does this affect safe use in the field?
      options:
        - label: Yes — dose, restriction or toxicity class is wrong (maintainers will treat it as safety-critical)
        - label: No — display/metadata only
---
