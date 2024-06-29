const arrayOfPlaceholders: Array<string> = [
  "Ask me anything...",
  "Type your question here...",
  "How can I help you?",
  "Search with power of AI...",
  "What do you need to know?"
];

const lengthOfPlaceholderArray: number = arrayOfPlaceholders.length

// This function generates a new placeholder string from a predefined array of placeholders.
// If an old placeholder is provided, the function ensures the new one is different.
function generatePlaceholder(oldPlaceholder: string | null): string {

  // Checks if oldPlaceholder is null, if yes then returns the a random placeholder from 'arrayOfPlaceholders'
  if (oldPlaceholder == null) {
    return arrayOfPlaceholders[Math.floor(Math.random() * (lengthOfPlaceholderArray - 1))];
  }

  // Find the index of the old placeholder in the array.
  const _index: number = arrayOfPlaceholders.indexOf(oldPlaceholder);

  // Create a new array that excludes the old placeholder.
  const _new_placeholder: Array<string> = arrayOfPlaceholders
    .slice(0, _index)
    .concat(arrayOfPlaceholders.slice(_index + 1, 5));

  // Return a random placeholder from the new array
  return _new_placeholder[Math.floor(Math.random() * (lengthOfPlaceholderArray - 1))];
}

export { generatePlaceholder }
