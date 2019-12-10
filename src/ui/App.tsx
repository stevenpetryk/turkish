import React, { useState } from "react"
import WordForm from "./WordForm"

export default function App() {
  const [word, setWord] = useState("")

  return (
    <div>
      <WordForm value={word} onChange={setWord} />
    </div>
  )
}
