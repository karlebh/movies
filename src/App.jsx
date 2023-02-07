import React from "react"
import { BrowserRouter } from "react-router-dom"
import { useSelector } from "react-redux"

import SideBar from "./components/SideBar"
import Header from "./components/Header"
import Pages from "./Pages"

function App() {
  const movie = useSelector(state => state.movie.value)
  return (
    <BrowserRouter>
      <div className="min-h-screen max-w-[85rem] mx-auto bg-zinc-900 text-gray-300 flex w-full overflow-x-hidden">
        <SideBar />
        <main className="px-4 lg:px-10 pt-3 lg:pt-10 w-full lg:min-w-[80%] mb-14 bg-natural-500 overflow-hidden">
          <Header />
          <Pages />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
