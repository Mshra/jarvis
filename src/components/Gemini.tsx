import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { useState } from "react";

const AI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export function AIbox({ prompt }: { prompt: string }) {
  const [response, setResponse] = useState<string>("")

  async function run(prompt: string) {

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ];

    const model = AI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });

    const myGenerationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 2000,
      responseMimeType: "text/plain",
    };

    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    const chat = model.startChat({
      generationConfig: myGenerationConfig,
      history: [
      ],
    });

    const result = await chat.sendMessageStream(prompt)
    let text: string = ""
    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      setResponse(chunk.text)
      text += chunkText
    }
  }

  return (
    <div className="border border-black">
      {response}
    </div>
  )
}
