import React, { useState, useEffect } from "react"
import WordEntry from "./WordEntry"
import Definitions from "./Definitions"

import "./App.scss"
import Agglutinate from "./Agglutinate"

export default function App() {
  const [word, setWord] = useState("")

  const debouncedWord = useDebounce(word, 600)

  return (
    <form className="app-form">
      <WordEntry value={word} onChange={setWord} />
      <Definitions word={word} />
      <Agglutinate word={debouncedWord} />
    </form>
  )
}

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return function() {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
