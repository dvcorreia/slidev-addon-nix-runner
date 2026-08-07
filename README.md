# slidev-addon-nix-runner

Nix runner for the [Monaco Runner feature](https://sli.dev/features/monaco-run) in [Slidev](https://sli.dev/). Code is evaluated in the browser using [Tvix](https://tvix.dev/) and WebAssembly through [`nix-eval`](https://www.npmjs.com/package/nix-eval).

## Usage

Install the addon:

```bash
npm install slidev-addon-nix-runner
```

Add it to the frontmatter in `slides.md`:

```md
---
addons:
  - slidev-addon-nix-runner

nix:
  # Force lazy lists and attribute sets before displaying them. Default: true
  strict: true
---
```

Use the `monaco-run` directive with a Nix code block:

````md
```nix {monaco-run}
let
  greeting = "Hello, Slidev!";
in
{
  inherit greeting;
  answer = 6 * 7;
}
```
````

Evaluation output is printed below the editor. Nix warnings and errors are shown in yellow and red respectively.
