import { SetStateAction } from 'react'

/**
 * A React component which displays all the entered past prompts only when a prompt is being entered in the search box.
 *
 * @param {React.Dispatch<SetStateAction<string>>} props.setPromptString - a setState variable which is passed in the component to
 *     'empty the search box when a prompt is deleted' and 'fill the search bar with the prompt that was clicked in history'
 *
 * @param {Array<string>} props.promptHistory - string array of all the past searched prompts
 *
 * @param {React.Dispatch<SetStateAction<Array<string>>>} props.setPromptHistory - setState variable to change the state of promptHistory
 */
function PromptHistory({ setPromptString, promptHistory, setPromptHistory }: { setPromptString: React.Dispatch<SetStateAction<string>>, promptHistory: Array<string>, setPromptHistory: React.Dispatch<SetStateAction<Array<string>>> }) {
  /**
   * handles the deletion of past entered prompts.
   * @param {string}index - the index of the prompt in promptHistory array which is to be deleted
   */
  const handleDeletePromptFromHistory = (index: number) => {
    const _history: Array<string> = promptHistory.slice()
    _history.splice(index, 1)
    setPromptHistory(_history)
    setPromptString("")
  }

  /**
   * maps every prompts in the promptHistory array and wraps it with <li> html element that is to be returned to display
   */
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

  /**
  * returns the list of past entered prompts for display only when atleast 1 prompt exists in history
  */
  if (promptHistory.length > 0) {
    return (
      <ul className="w-full h-auto border-x-2 border-b-2 border-black -mt-2 pt-2 px-1 rounded-b-lg absolute">
        {mapPromptHistory}
      </ul>
    )
  }
}
export { PromptHistory }

// TODO: [ ] add functionality font for prompt searching during typing
//       [ ]
