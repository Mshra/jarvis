// TODO: [ ] add functionality font for prompt searching during typing
//       [ ]

import { SetStateAction } from 'react'

function PromptHistory({ setPromptString, promptHistory, setPromptHistory }: { setPromptString: React.Dispatch<SetStateAction<string>>, promptHistory: Array<string>, setPromptHistory: React.Dispatch<SetStateAction<Array<string>>> }) {

  const handleDeletePromptFromHistory = (index: number) => {
    const _history: Array<string> = promptHistory.slice()
    _history.splice(index, 1)
    setPromptHistory(_history)
    setPromptString("")
  }

  // w-1/12 h-10 m-2 
  const mapPromptHistory = promptHistory.map((promptString, index) => {
    return (
      <li key={index} className="bg-[#fecdd3] overflow-y-auto my-1 px-4 flex items-center justify-center last:rounded-b-md hover:border hover:border-black">

        <div className="w-11/12 break-all" onClick={() => setPromptString(promptString)}>
          {promptString}
        </div>

        <button
          onClick={() => handleDeletePromptFromHistory(index)}
          className="px-2 py-1 m-2 border border-black rounded-md bg-red-400 text-red-800 font-extrabold hover: hover:bg-red-600 hover:text-white">
          X
        </button>
      </li>
    );
  });

  // returns for display only when atleast 1 prompt exists in history
  if (promptHistory.length > 0) {
    return (
      <ul className="w-full h-auto border-x-2 border-b-2 border-black -mt-2 pt-2 px-1 rounded-b-lg absolute">
        {mapPromptHistory}
      </ul>
    )
  }
}

export { PromptHistory }
