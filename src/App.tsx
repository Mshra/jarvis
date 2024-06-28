import SearchBar from "./components/Search"
import { useState } from "react"

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // used by the theme button itself
  const lightThemeButton: string = "border-4 border-black p-2 rounded-lg"
  const darkThemeButton: string = "border-4 border-white p-2 rounded-lg text-white"

  // used by the screen to apply color
  const lightTheme: string = "w-screen h-screen flex items-center justify-center gap-5"
  const darkTheme: string = "w-screen h-screen flex items-center justify-center gap-5 bg-[#1e293b]"

  return (
    <div className={theme == "light" ? lightTheme : darkTheme}>
      <button onClick={() => setTheme(theme == "light" ? "dark" : "light")} className={theme == "light" ? lightThemeButton : darkThemeButton}>change theme</button>
      <SearchBar theme={theme} />
    </div >
  )
}
