import React, { useRef } from "react"
import NonAsciiEntry from "./NonAsciiEntry"

import "./WordForm.scss"

export default function WordForm({
  value,
  onChange,
}: {
  value: string
  onChange: (newValue: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  function onInsert(char: string) {
    onChange(value + char)
    inputRef.current && inputRef.current.focus()
  }

  return (
    <form className="word-form">
      <label htmlFor="word">Enter a Turkish word:</label>
      <div className="word-form--compound-input" lang="tur">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          name="word"
          id="word"
          ref={inputRef}
          autoComplete="off"
        />
        <NonAsciiEntry onInsert={onInsert} />
      </div>
    </form>
  )
}
