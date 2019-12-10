import React, { useEffect, useState } from "react"
import classnames from "classnames"

import "./Definitions.scss"

export default function Definition({ word }: { word: string }) {
  const [resolvedWord, setResolvedWord] = useState<string>("")
  const [definitions, setDefinitions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!word.trim()) {
      setDefinitions([])
      setResolvedWord("")
      setLoading(false)
      return
    }

    let cancelled = false

    setLoading(true)

    async function fetchAndSet() {
      try {
        const response = await fetch(
          `./.netlify/functions/translate?word=${encodeURIComponent(word)}`,
        )
        const json = await response.json()

        if (!cancelled) {
          setResolvedWord(json.resolvedWord)
          setDefinitions(json.definitions)
          setLoading(false)
        }
      } catch (e) {
        setDefinitions([])
        setResolvedWord("")
        console.error(e)
        alert(e)
      }
    }

    fetchAndSet()

    return () => {
      cancelled = true
    }
  }, [word])

  return (
    <div className={classnames("definitions", { loading })}>
      <h2>Definition</h2>

      <p className="resolved-word">{resolvedWord}</p>

      {resolvedWord && definitions.length == 0 && (
        <p className="none">Could not find a definition</p>
      )}

      <ul>
        {definitions.map((definition, index) => (
          <li key={index}>
            <span className="part">{definition.part}</span>{" "}
            <span className="meaning">{definition.meaning}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
