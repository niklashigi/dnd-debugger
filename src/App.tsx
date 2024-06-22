import { PayloadManager } from "./PayloadManager";

function App() {
  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-gray-900">
            Drag & Drop Debugger
          </h1>
          <div className="mt-3 text-gray-600 text-sm leading-relaxed">
            Implementing drag and drop behaviors, for example using the{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API"
              className="hover:underline font-semibold"
            >
              HTML Drag and Drop API
            </a>
            , can enable truly magical experiences for users. Debugging such
            logic can be challenging though because it's hard to see what exact
            data is being attached to dragged items. This tool helps you inspect
            and craft drag payloads to make this easier.
          </div>
        </header>

        {/* "Payload Manager" (actual app) */}
        <main className="mt-8">
          <PayloadManager />
        </main>
      </div>
    </div>
  );
}

export default App;
