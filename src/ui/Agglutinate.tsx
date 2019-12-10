import React from "react"

import "./Agglutinate.scss"
import AgglutinateNoun from "./AgglutinateNoun"

export default function Agglutinate({ word }: { word: string }) {
  return (
    <div className="agglutinate">
      <h2>Configure suffixes</h2>

      <AgglutinateNoun />
    </div>
  )
}
