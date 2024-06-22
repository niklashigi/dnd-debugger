import { DragEvent } from "react";

import { FooterSection } from "./FooterSection";
import { HeaderSection } from "./HeaderSection";
import { PayloadManager } from "./PayloadManager";

function App() {
  // We only allow dragging into the specific drop area, so we prevent the
  // default behavior of dragging into the entire document. This is overridden
  // by the event handlers on the drop area which use `event.stopPropagation()`
  // to make sure this event doesn't bubble up to here.
  const handleDragEvent = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "none";
  };

  return (
    <div
      className="p-8 min-h-screen flex items-stretch"
      onDragEnter={handleDragEvent}
      onDragOver={handleDragEvent}
    >
      <div className="max-w-3xl mx-auto min-h-full flex flex-col gap-8">
        {/* Header */}
        <HeaderSection />

        {/* "Payload Manager" (actual app) */}
        <main className="flex-grow">
          <PayloadManager />
        </main>

        <FooterSection />
      </div>
    </div>
  );
}

export default App;
