import { bufferWithConsonant } from "./vowels"
import { harmony2Way, harmony4Way } from "./harmony"
import { harmonizeD } from "./harmony"
import { mutateFinalConsonant } from "./consonantMutation"

export function makeAccusative(word: string): string {
  return bufferWithConsonant(mutateFinalConsonant(word), "y", harmony4Way(word))
}
export function makeGenitive(word: string): string {
  return bufferWithConsonant(mutateFinalConsonant(word), "n", harmony4Way(word) + "n")
}

export function makeDative(word: string): string {
  const dativeSuffix = harmonizeD(word) + harmony2Way(word)

  return word + dativeSuffix
}

export function makeAblative(word: string): string {
  const ablative = `${harmonizeD(word)}${harmony2Way(word)}n`

  return word + ablative
}
