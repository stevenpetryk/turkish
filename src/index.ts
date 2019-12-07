import { makeAblative, makeAccusative, makeGenitive } from "./nounCases"
import { pluralize } from "./pluralize"

console.log(makeGenitive(makeAccusative(pluralize("kedi"))))
