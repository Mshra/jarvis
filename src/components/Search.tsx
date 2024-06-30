/*
 * TODO: [ ] gemini is returning non-continuous response as markdown, to display the response convert it into either html or normal text atleast.
 *       [ ] style prompt history lists
 *       [ ] refactor out the styles into light mode, dark mode and error mode into a different file.
 *
 * FIX: [x] promptHistory allow duplicate values, prevent that.
 */
import { ResponseBox } from "./AI";

import React, { SetStateAction, useState } from "react";
import searchIcon from './assets/search.svg'
import { PromptHistory } from "./PromptHistory";
import { lightStyle } from "./styles";

function addPromptToHistory(promptString: string, promptHistory: Array<string>, setPromptString: React.Dispatch<SetStateAction<string>>, setPromptHistory: React.Dispatch<SetStateAction<Array<string>>>): void {
  if (promptHistory.find(prompts => prompts === promptString)) { }
  else {
    const _arr = promptHistory.slice()
    _arr.reverse()
    _arr.push(promptString)
    _arr.reverse()
    setPromptHistory(_arr)
  }
  setPromptString("")
}

// main component
export default function SearchBar() {
  // this state is used by PromptHistory.tsx aswell
  const [promptHistory, setPromptHistory] = useState<Array<string>>(new Array())
  const [promptString, setPromptString] = useState<string>("")

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    addPromptToHistory(promptString, promptHistory, setPromptString, setPromptHistory)
    // TODO: generating ai respose to prompt string
    run("what is git")
  }

  return (
    <div className="w-9/12 md:w-3/6 lg:w-2/6 flex-col relative">
      <form onSubmit={handleSubmit} className={lightStyle}>
        <input
          type="text"
          placeholder="Search with the power of AI..."
          className="outline-none w-11/12 position:absolute"
          value={promptString}
          onChange={event => setPromptString(event.target.value)} />

        <input
          type="image"
          src={searchIcon}
          alt="search"
          className="h-8" />
      </form>

      {promptString ? <PromptHistory setPromptString={setPromptString} promptHistory={promptHistory} setPromptHistory={setPromptHistory} /> : null}
      {/* <ResponseBox prompt="what is git" /> */}
    </div >
  )
}
