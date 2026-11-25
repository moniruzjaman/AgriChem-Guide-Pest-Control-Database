---
name: Feature request
about: Suggest a feature or improvement for the app or the pipeline
labels: enhancement
title: "[feat] "
body:
  - type: textarea
    id: problem
    attributes:
      label: What problem does this solve for a farmer / dealer / field officer?
      description: PesticideNext is a field tool — requests grounded in a real field workflow get priority.
    validations:
      required: true
  - type: textarea
    id: proposal
    attributes:
      label: What should it do?
    validations:
      required: true
  - type: textarea
    id: data-source
    attributes:
      label: If it needs data, where does that data come from?
      description: The app must stay fully offline — new data normally enters through the data_raw/ pipeline, not a runtime API.
  - type: checkboxes
    id: constraints
    attributes:
      label: Constraints
      options:
        - label: Works fully offline (no runtime API dependency)
        - label: Strings provided in both Bangla and English
---
