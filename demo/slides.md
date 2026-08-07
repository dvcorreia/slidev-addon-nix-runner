---
theme: default
title: Nix Runner Demo
addons:
  - nix-runner

nix:
  strict: true
---

```nix {monaco-run}
let
  greeting = "Hello, Slidev!";
in
{
  inherit greeting;
  answer = 6 * 7;
}
```
