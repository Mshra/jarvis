import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { marked } from "marked";
import React, { SetStateAction, useState } from "react";

const API_KEY: string = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(API_KEY)

async function run(prompt: string, setResponse: React.Dispatch<SetStateAction<string>>) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  setResponse(text)
}

export function ResponseBox({ searchString, setSearchString, setShowAIResponse }: { searchString: string, setSearchString: React.Dispatch<SetStateAction<string>>, setShowAIResponse: React.Dispatch<SetStateAction<boolean>> }) {
  const [response, setResponse] = useState<string>("")

  // if (searchString) {
  //   run(searchString, setResponse)
  //   setSearchString("")
  // }

  async function htmlResponse() {
    const html = marked.parse('# Marked in Node.js\n\nRendered by **marked**.');
    return (
      <div dangerouslySetInnerHTML={html}>
        {html}
      </div>
    )
  }

  return (
    <div className="w-full h-auto border-4 p-2 mt-2 border-black rounded-lg absolute z-0">
      {searchString}
      <div className="flex justify-evenly p-2">
        <button className="border border-black bg-cyan-200 p-2 rounded-full" onClick={() => setShowAIResponse(false)}>close</button>
        <button className="border border-black bg-cyan-200 p-2 rounded-full cursor-grab active:cursor-grabbing" onClick={() => navigator.clipboard.writeText(response)}>copy to clipboard</button>
        {htmlResponse()}
      </div>
    </div>
  )
}
/*
 * TODO: parse the markdown response text and display it as html div
 */
