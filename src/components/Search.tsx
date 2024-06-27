import { useState, useEffect } from "react";
import searchIcon from './assets/search.svg'
import closeIcon from './assets/close.svg'

export default function SearchBar() {
  const placeholder: Array<string> = [
    "Ask me anything...",
    "Type your question here...",
    "How can I help you?",
    "Search with power of AI...",
    "What do you need to know?"
  ];

  const [placeholderString, setPlaceholderString] = useState<string>(placeholder[0])
  const [prompt, setPrompt] = useState<string>("")
  const [promptHistory, setPromptHistory] = useState<Array<string>>(new Array())

  useEffect(() => {
    function changePlaceholderString() {
      const _index: number = placeholder.indexOf(placeholderString)
      const _new_placeholder: Array<string> = placeholder.slice(0, _index).concat(placeholder.slice(_index + 1, 5))
      setPlaceholderString(_new_placeholder[Math.floor(Math.random() * 4)])
    }
    setInterval(changePlaceholderString, 3000)
  }, [])

  function handleSubmit(event: any) {
    event?.preventDefault()
    setPrompt("")
    // TODO: call gemini api with 'prompt' as prompt text.

    // edit promptHistory
    if (prompt.length > 0) {
      const _arr = promptHistory.slice()
      _arr.push(prompt)
      setPromptHistory(_arr)
    } else {
      console.error('prompt length not sufficient')
    }
  }

  const handlePromptHistory = () => {
    function handlePromptDelete() {
      console.log('hello, world')
    }

    const mapPromptHistory = promptHistory.map(promptString =>
      <li key={Math.random() * 10} className="bg-[#fecdd3] overflow-y-auto my-1 px-1 flex">
        <div className="w-4/5">
          {promptString}
        </div>
        <input type="image" src={closeIcon} alt="close" onClick={handlePromptDelete} />
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

  return (
    <div className="w-9/12 md:w-3/6 lg:w-2/6 flex-col">
      <form onSubmit={handleSubmit} className="flex items-center justify-center h-10 w-full p-2 border-2 border-black rounded-md">
        <input type="text" placeholder={placeholderString} className="outline-none w-11/12" value={prompt} onChange={(event) => setPrompt(event.target.value)} />
        <input type="image" src={searchIcon} alt="search" className="h-8" />
      </form>
      {handlePromptHistory()}
    </div>
  )
}
