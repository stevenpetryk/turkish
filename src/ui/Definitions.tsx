import React, { useEffect, useState } from "react"
import classnames from "classnames"

import "./Definitions.scss"

export default function Definition({ word }: { word: string }) {
  const [definitions, setDefinitions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!word.trim()) {
      setDefinitions([])
      return
    }

    setLoading(true)
    const controller = new AbortController()
    const signal = controller.signal

    fetch(`./.netlify/functions/translate?word=${encodeURIComponent(word)}`, { signal })
      .then((res) => res.json())
      .then((res) => setDefinitions(res.definitions))
      .catch(() => setDefinitions([]))
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [word])

  return (
    <div className={classnames("definitions", { loading })}>
      <h2>Definition</h2>

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
