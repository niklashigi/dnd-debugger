import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4">
      <header>
        <h1 className="text-3xl">Drag & Drop Debugger</h1>
        <div>Building advanced behaviors on top the web's <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API">HTML Drag and Drop API</a> can be challenging without seeing what exact data is being attached to dragged item by your app or other apps. This tool helps craft drag payloads and inspect payloads from external sources.</div>
      </header>
    </div>
  )
}

export default App
