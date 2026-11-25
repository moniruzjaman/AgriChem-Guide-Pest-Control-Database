---
name: Bug report
about: Something in the app or the shipped data behaves wrongly
labels: bug
title: "[bug] "
body:
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: A clear description of the bug. If it involves a pesticide product, include its brand name and DAE registration number.
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: What did you expect instead?
    validations:
      required: true
  - type: input
    id: language
    attributes:
      label: Language of the app when it happened
      placeholder: bn / en
  - type: input
    id: route
    attributes:
      label: Tab / route
      placeholder: "Database, Rotation, Safety, My Field, …"
  - type: textarea
    id: logs
    attributes:
      label: Console output or steps to reproduce
      description: Steps, screenshots or console errors — anything that helps reproduce it.
  - type: markdown
    attributes:
      value: |
        **Safety note:** if this bug shows a wrong dose, a missing restriction or a wrong toxicity class, add the `safety-critical` label — it will be triaged first (see SECURITY.md).
---
