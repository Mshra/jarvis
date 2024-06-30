// TODO: [ ] add functionality font for prompt searching during typing
//       [ ]

import { SetStateAction } from 'react'
import closeIcon from './assets/close.svg'

function PromptHistory({ setPromptString, promptHistory, setPromptHistory }: { setPromptString: React.Dispatch<SetStateAction<string>>, promptHistory: Array<string>, setPromptHistory: React.Dispatch<SetStateAction<Array<string>>> }) {

  const handleDeletePromptFromHistory = (index: number) => {
    const _history: Array<string> = promptHistory.slice()
    _history.splice(index, 1)
    setPromptHistory(_history)
  }

  const mapPromptHistory = promptHistory.map((promptString, index) => {
    return (
      <li key={index}
        onClick={() => setPromptString(promptString)}
        className="bg-[#fecdd3] overflow-y-auto my-1 px-1 flex items-center justify-center last:rounded-b-md hover:border hover:border-black">

        <div className="w-11/12 break-all">
          {promptString}
        </div>

        <input
          type="image"
          src={closeIcon}
          alt="close"
          onClick={() => handleDeletePromptFromHistory(index)}
          className="w-1/12 h-10" />
      </li>
    );
  });

  // returns for display only when atleast 1 prompt exists in history
  if (promptHistory.length > 0) {
    return (
      <ul className="w-full h-auto border-x-2 border-b-2 border-black -mt-2 pt-2 px-1 rounded-b-lg">
        {mapPromptHistory}
      </ul>
    )
  }
}

export { PromptHistory }
