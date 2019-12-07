import {
  getLastVowel,
  BACK_VOWELS,
  UNROUNDED_BACK_VOWELS,
  ROUNDED_BACK_VOWELS,
  UNROUNDED_FRONT_VOWELS,
} from "./vowels"

const UNVOICED_CONSONANTS = ["k", "ç", "ş", "t"]

export function harmony2Way(word: string): string {
  const lastVowel = getLastVowel(word)

  if (BACK_VOWELS.includes(lastVowel)) {
    return "a"
  } else {
    return "e"
  }
}

export function harmony4Way(word: string): string {
  const lastVowel = getLastVowel(word)

  if (UNROUNDED_BACK_VOWELS.includes(lastVowel)) return "ı"
  if (ROUNDED_BACK_VOWELS.includes(lastVowel)) return "u"
  if (UNROUNDED_FRONT_VOWELS.includes(lastVowel)) return "i"
  else return "ü"
}

export function harmonizeD(word: string): string {
  if (UNVOICED_CONSONANTS.includes(word[word.length - 1])) {
    return "t"
  }

  return "d"
}
