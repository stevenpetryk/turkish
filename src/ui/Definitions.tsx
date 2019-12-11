import React, { useEffect, useState, useReducer, useRef } from "react"
import classnames from "classnames"

import "./Definitions.scss"

interface IDefinition {
  part: string
  meaning: string
}

interface IState {
  loading: boolean
  foundWord: string
  definitions: IDefinition[]
}

type Action<T extends string, S extends object = {}> = { type: T } & S

type TheseActions =
  | Action<"reset">
  | Action<"definitionsLoaded", { word: string; definitions: IDefinition[] }>
  | Action<"searchedWordChanged", { newSearchedWord: string }>

const initialState: IState = {
  loading: false,
  foundWord: "",
  definitions: [],
}

function reducer(state: IState, action: TheseActions): IState {
  switch (action.type) {
    case "reset":
      return initialState
    case "definitionsLoaded":
      return {
        ...state,
        definitions: action.definitions,
        foundWord: action.word,
        loading: false,
      }
    case "searchedWordChanged":
      return {
        ...state,
        loading: true,
      }
  }

  return state
}

export default function Definition({ word }: { word: string }) {
  const [{ loading, foundWord, definitions }, dispatch] = useReducer(reducer, initialState)
  const liveWord = useRef<string>("")
  const debouncedWord = useDebounce(word, 200)

  useEffect(() => {
    liveWord.current = word
    dispatch({ type: "searchedWordChanged", newSearchedWord: word })
  }, [word])

  useEffect(() => {
    if (!word.trim()) {
      dispatch({ type: "reset" })
      return
    }

    async function fetchAndSet() {
      try {
        const response = await fetch(
          `./.netlify/functions/translate?word=${encodeURIComponent(word)}`,
        )
        const json = await response.json()

        if (liveWord.current === debouncedWord) {
          dispatch({
            type: "definitionsLoaded",
            word: json.word,
            definitions: json.definitions,
          })
        }
      } catch (e) {
        if (liveWord.current === debouncedWord) {
          dispatch({
            type: "definitionsLoaded",
            word: "",
            definitions: [],
          })
          console.error(e)
          alert(e)
        }
      }
    }

    fetchAndSet()
  }, [debouncedWord])

  return (
    <div className={classnames("definitions", { loading })}>
      <h2>Definition</h2>

      <p className="resolved-word">{foundWord}</p>

      {foundWord && definitions.length == 0 && <p className="none">Could not find a definition</p>}

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
