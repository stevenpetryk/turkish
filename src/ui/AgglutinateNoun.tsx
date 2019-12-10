import React from "react"

import "./AgglutinateNoun.scss"

export default function AgglutinateNoun() {
  return (
    <form className="agglutinate-noun">
      <fieldset>
        <legend>Pluralization</legend>

        <label>
          <input type="radio" name="pluralization" id="" /> Singular
        </label>
        <label>
          <input type="radio" name="pluralization" id="" /> Plural <code>-lAr</code>
        </label>
      </fieldset>

      <fieldset>
        <legend>Noun cases</legend>

        <label>
          <input type="checkbox" name="" id="" /> Nominative
        </label>
        <label>
          <input type="checkbox" name="" id="" /> Accusative <code>-(y)I</code>
        </label>
        <label>
          <input type="checkbox" name="" id="" /> Genitive <code>-(n)In</code>
        </label>
        <label>
          <input type="checkbox" name="" id="" /> Dative <code>-DA</code>
        </label>
        <label>
          <input type="checkbox" name="" id="" /> Ablative <code>-DAn</code>
        </label>
      </fieldset>
    </form>
  )
}
