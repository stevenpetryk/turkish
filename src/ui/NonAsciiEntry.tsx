import React from "react"

import "./NonAsciiEntry.scss"

export default function NonAsciiEntry({ onInsert }: { onInsert: (char: string) => void }) {
  const nonAsciiCharacters = ["ç", "ş", "ğ", "ı", "ö", "ü"]
  return (
    <div className="non-ascii-entry">
      {nonAsciiCharacters.map((char) => (
        <button type="button" onClick={() => onInsert(char)}>
          <span className="vh">Insert </span> {char}
        </button>
      ))}
    </div>
  )
}
