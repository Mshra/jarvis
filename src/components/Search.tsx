import { useState, useEffect } from "react";
import searchIcon from './assets/search.svg'
import closeIcon from './assets/close.svg'
import { generatePlaceholder } from "./placeholder";
import { AIbox } from "./Gemini";

export default function SearchBar({ theme }: { theme: "light" | "dark" }) {
  const [placeholder, setPlaceholder] = useState<string>(generatePlaceholder(null))
  // const [AIresponse, setAIresponse] = useState(null)

  const lightStyle: string = "flex items-center justify-center h-10 w-full p-2 border-4 border-black rounded-md group"
  const errorStyle: string = "flex items-center justify-center h-10 w-full p-2 border-4 border-red-500 rounded-md group"
  const darkStyle: string = "flex items-center justify-center h-10 w-full p-2 border-4 border-white rounded-md group"
  const [formStyle, setFormStyle] = useState<string>(lightStyle)

  const [prompt, setPrompt] = useState<string | null>(null)
  const [promptHistory, setPromptHistory] = useState<Array<string>>(new Array())

  // changes placeholder value after every 3 seconds
  useEffect(() => {
    setInterval(() => setPlaceholder(generatePlaceholder(placeholder)), 3000)
  }, [])

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    if (prompt == null) {
      return
    }

    if (prompt.length > 10) {
      if (promptHistory.find(pastPrompts => pastPrompts == prompt)) {
        setPrompt("")
        return
      }
      const _arr = promptHistory.slice()
      _arr.push(prompt)
      setPromptHistory(_arr)
      // TODO: run the AI
    } else {
      console.error('prompt length not sufficient')
      setFormStyle(errorStyle)
    }
    setPrompt("")
  }

  const handlePromptHistory = () => {
    function handlePromptDelete() {
      setPrompt("")
      const _arr = promptHistory.slice()
      _arr.splice(_arr.indexOf(prompt), 1)
      setPromptHistory(_arr)
    }

    const mapPromptHistory = promptHistory.map(promptString =>
      <li key={Math.random() * 10} onClick={() => setPrompt(promptString)}
        className="bg-[#fecdd3] overflow-y-auto my-1 px-1 flex items-center justify-center last:rounded-b-md hover:border hover:border-black">

        <div className="w-11/12 break-all">
          {promptString}
        </div>

        <input
          type="image"
          src={closeIcon}
          alt="close"
          onClick={handlePromptDelete}
          className="w-1/12 h-10" />
      </li>
    )

    if (promptHistory.length != 0) {
      return (
        <ul className="w-full h-auto border-x-2 border-b-2 border-black -mt-2 pt-2 px-1 rounded-b-lg">
          {mapPromptHistory}
        </ul>
      )
    }
    return <ul></ul>
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value)
    setFormStyle(formStyle)
  }

  return (
    <div className="w-9/12 md:w-3/6 lg:w-2/6 flex-col">
      {/* <AIbox prompt={prompt} /> */}

      <form onSubmit={handleSubmit} className={formStyle}>
        <input
          type="text"
          placeholder={placeholder}
          className="outline-none w-11/12"
          value={prompt as string}
          onChange={handleChange} />

        <input
          type="image"
          src={searchIcon}
          alt="search"
          className="h-8" />
      </form>

      {prompt && handlePromptHistory()}

    </div>
  )
}

/*
 * TODO: [ ] gemini is returning non-continuous response as markdown, to display the response convert it into either html or normal text atleast.
 *       [ ] style prompt history lists
 *       [ ] animate the placeholders with a typing effect
 *       [ ] refactor out the styles into light mode, dark mode and error mode into a different file.
 *
 * FIX: [x] promptHistory allow duplicate values, prevent that.
 */
