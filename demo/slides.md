---
theme: default
title: Nix Runner Demo
addons:
  - nix-runner

nix:
  strict: true
---

```nix {monaco-run} {maxHeight:'65%'}
let
  levels = 3;
in

builtins.listToAttrs (
  builtins.genList (
    n:
    let
      alias = builtins.concatStringsSep "" (builtins.genList (_: ".") (n + 2));
      cmd = builtins.concatStringsSep "/" (builtins.genList (_: "..") (n + 1));
    in
    {
      name = alias;
      value = "cd ${cmd}";
    }
  ) 3 # forgot levels here!
)
```
