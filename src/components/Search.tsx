import React, { SetStateAction, useState } from "react";
import searchIcon from './assets/search.svg'
import { PromptHistory } from "./PromptHistory";
import { lightStyle } from "./styles";

/**
 * handles addition of prompt string to promptHistory, is one of the procedures carried out after 'onSubmit' of the string in search bar.
 *
 * @param {string} promptString - the entered prompt for AI response just after 'onSubmit'.
 * @param {Array<string>} promptHistory - the past entered prompt strings which is stored in an array.
 * @param {React.Dispatch<SetStateAction<string>>} setPromptString - changes the prompt string in search bar.
 * @param {React.Dispatch<SetStateAction<Array<string>>>} setPromptHistory - changes the prompt elements in 'promptHistory' array.
 */
function addPromptToHistory(promptString: string, promptHistory: Array<string>, setPromptString: React.Dispatch<SetStateAction<string>>, setPromptHistory: React.Dispatch<SetStateAction<Array<string>>>): void {
  /**
   * If the entered prompt is already present in the past then does nothing.
   * otherwise, creates a duplicate array of the promptHistory, reverses it to present recently entered prompts at last,
   * reverses it to get them in ascending order, pushes the 'promptString' at last
   * again reverses it to have the array in descending order.
   */
  if (promptHistory.find(prompts => prompts === promptString)) { }
  else {
    const _arr = promptHistory.slice()
    _arr.reverse()
    _arr.push(promptString)
    _arr.reverse()
    setPromptHistory(_arr)
  }

  setPromptString("")

  // clips out the 'promptHistory' to store exactly 5 number of strings by dropping the past entered prompts one by one.
}

/**
 * Main component.
 */
export default function SearchBar() {
  // this state is used by PromptHistory.tsx aswell
  const [promptHistory, setPromptHistory] = useState<Array<string>>(new Array())
  const [promptString, setPromptString] = useState<string>("")

  /**
   * @param {React.SyntheticEvent<HTMLFormElement>} event - event described by the submission of form.
   * -> adds the entered 'promptString' to the 'promptHistory' for display.
   * -> passes the 'promptString' for the generation of AI response.
   */
  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    addPromptToHistory(promptString, promptHistory, setPromptString, setPromptHistory)
    // TODO: generating ai respose to prompt string
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
    </div >
  )
}

/*
 * TODO: [ ] gemini is returning non-continuous response as markdown, to display the response convert it into either html or normal text atleast.
 *       [ ] style prompt history lists
 *       [ ] refactor out the styles into light mode, dark mode and error mode into a different file.
 *
 * FIX: [x] promptHistory allow duplicate values, prevent that.
 */
