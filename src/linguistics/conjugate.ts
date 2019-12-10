import { harmony2Way, harmony4Way } from "./harmony"
import { UNROUNDED_BACK_VOWELS, endsInVowel } from "./vowels"

export enum SUBJECTS {
  FIRST_PERSON_SINGULAR,
  SECOND_PERSON_SINGULAR,
  THIRD_PERSON_SINGULAR,
  FIRST_PERSON_PLURAL,
  SECOND_PERSON_PLURAL,
  THIRD_PERSON_PLURAL,
}

const COMMON_CONJUGATIONS: Record<SUBJECTS, (word: string) => string> = {
  [SUBJECTS.FIRST_PERSON_SINGULAR]: (word: string) => harmony4Way(word) + "m",
  [SUBJECTS.SECOND_PERSON_SINGULAR]: (word: string) => "s" + harmony4Way(word) + "n",
  [SUBJECTS.THIRD_PERSON_SINGULAR]: () => "",
  [SUBJECTS.FIRST_PERSON_PLURAL]: (word: string) => harmony4Way(word) + "z",
  [SUBJECTS.SECOND_PERSON_PLURAL]: (word: string) =>
    "s" + harmony4Way(word) + "n" + harmony4Way(word) + "z",
  [SUBJECTS.THIRD_PERSON_PLURAL]: () => "lar",
}

export function makeInfinitive(verbStem: string): string {
  return verbStem + "m" + harmony2Way(verbStem) + "k"
}

export function makePresentProgressive(verbStem: string, subject: SUBJECTS): string {
  if (endsInVowel(verbStem)) {
    verbStem = verbStem.substring(0, verbStem.length - 1)
  }

  let presentProgressiveSuffix
  if (verbStem.length == 1) {
    presentProgressiveSuffix = "iyor"
  } else {
    presentProgressiveSuffix = harmony4Way(verbStem) + "yor"
  }

  return verbStem + presentProgressiveSuffix + COMMON_CONJUGATIONS[subject]("yor")
}
