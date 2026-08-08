import { useNav } from "@slidev/client"
import { defineCodeRunnersSetup } from "@slidev/types"
import { createEvaluator, type Evaluator } from "nix-eval"
import { ref } from "vue"

type NixOptions = {
  strict?: boolean
}

const evaluators = new Map<boolean, Promise<Evaluator>>()

function getEvaluator(strict: boolean): Promise<Evaluator> {
  const cachedEvaluator = evaluators.get(strict)
  if (cachedEvaluator) {
    return cachedEvaluator
  }

  const evaluator = createEvaluator({ strict })
  evaluators.set(strict, evaluator)
  return evaluator
}

function outputLines(text: string, className?: string, highlightLang?: string) {
  return text
    .split("\n")
    .filter((line, index, lines) => line || index < lines.length - 1)
    .map((text) => ({ text, class: className, highlightLang }))
}

export default defineCodeRunnersSetup(() => {
  const { slides } = useNav()

  function run(source: string) {
    const lines = ref<{ text: string; class?: string }[]>([])
    const slide = slides.value[0]?.meta.slide as { frontmatter?: { nix?: NixOptions } } | undefined
    const options = slide?.frontmatter?.nix

    void getEvaluator(options?.strict ?? true)
      .then((evaluator) => evaluator.eval(source, "/input.nix"))
      .then((result) => {
        lines.value = [
          ...outputLines(result.output, undefined, "nix"),
          ...outputLines(result.warnings, "text-yellow"),
          ...outputLines(result.errors, "text-red"),
        ]
      })
      .catch((error: unknown) => {
        lines.value = outputLines(String(error), "text-red")
      })

    return () => lines.value
  }

  return { nix: run }
})
