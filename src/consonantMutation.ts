export const MUTATIONS: Partial<Record<string, string>> = {
  k: "ğ",
  p: "b",
  ç: "c",
  t: "d",
}

export function mutateFinalConsonant(word: string) {
  const mutated = MUTATIONS[word[word.length - 1]]

  return word.substring(0, word.length - 1) + (mutated || word[word.length - 1])
}
