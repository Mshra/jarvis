import { useState, useEffect } from "react";

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
    const _arr = promptHistory.slice()
    _arr.push(prompt)
    setPromptHistory(_arr)
  }

  const handlePromptHistory = () => {
    const mapPromptHistory = promptHistory.map(promptString =>
      <li key={Math.random() * 10} className="flex">
        {promptString}
        <input type="image" src="../../public/close.svg" alt="submit" className="text-right" />
      </li>
    )

    if (promptHistory.length != 0) {
      return (
        <ul className="border-x-2 border-b-2 border-black -mt-2 pt-2 p-1 rounded-b-lg">
          {mapPromptHistory}
        </ul>
      )
    }
    return <ul></ul>
  }

  return (
    <div className="flex-col">
      <form onSubmit={handleSubmit} className="border-2 border-black p-2 rounded-lg flex">
        <input type="text" placeholder={placeholderString} className="outline-none" value={prompt} onChange={(event) => setPrompt(event.target.value)} />
        <input type="image" src="../../public/search.svg" alt="submit" />
      </form>
      {handlePromptHistory()}
    </div>
  )
}
