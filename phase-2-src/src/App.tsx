import React, { useState } from "react"
import Header from "./Header"

function App() {
  const containerRef = React.useRef<any>(undefined)
  return (
    <article className="container" ref={containerRef}>
      <Header step={0} fullscreenElement={containerRef} />
      <main className="main">
        main
      </main>
      <footer className="footer">
        <button className="btn" disabled>Back</button>
        <button className="btn">Next</button>
      </footer>
    </article>
  )
}

export default App
