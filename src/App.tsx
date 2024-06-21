import { DragEvent, useState } from "react";
import { produce } from "immer";
import { useLocalStorage } from "@uidotdev/usehooks";

import { PayloadCard } from "./PayloadCard";
import { Payload } from "./payload";
import { getDataTransferItemString } from "./utils";

function App() {
  const [payloads, setPayloads] = useLocalStorage<Payload[]>("payloads", [
    {
      label: "Hello World",
      data: [
        {
          contentType: "text/plain",
          data: "Hello World!",
        },
      ],
    },
  ]);

  const addPayload = () => {
    setPayloads(
      produce((payloads) => {
        payloads.unshift({
          label: "New Payload",
          data: [
            {
              contentType: "text/plain",
              data: "Hello World!",
            },
          ],
        });
      })
    );
  };

  const deletePayload = (index: number) => {
    setPayloads(
      produce((payloads) => {
        payloads.splice(index, 1);
      })
    );
  };

  const importDataTransfer = async (transfer: DataTransfer) => {
    const newPayload = {
      label: "Imported Payload",
      data: await Promise.all(
        Array.from(transfer.items).map(async (item) => {
          return {
            contentType: item.type,
            data: await getDataTransferItemString(item),
          };
        })
      ),
    };

    setPayloads(
      produce((payloads) => {
        payloads.unshift(newPayload);
      })
    );
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!event.dataTransfer) return;

    void importDataTransfer(event.dataTransfer);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold">Drag & Drop Debugger</h1>
          <div className="mt-3 text-gray-600 text-sm leading-relaxed">
            Building advanced behaviors on top the web's{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API"
              className="hover:underline font-semibold"
            >
              HTML Drag and Drop API
            </a>{" "}
            can be challenging without seeing what exact data is being attached
            to dragged item by your app or other apps. This tool helps you craft
            drag payloads and inspect payloads from external sources.
          </div>
        </header>

        <main className="mt-8">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold text-xl">Payloads</h2>
            <button
              className="bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 transition text-white px-2 py-1 rounded text-sm shadow"
              onClick={addPayload}
            >
              Add Payload
            </button>
          </div>

          {/* Drop Area */}
          <div
            className="mt-4 p-8 bg-gray-200 rounded-lg border text-center text-gray-700"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            Drop here to import a payload…
          </div>

          {/* Payload List */}
          <div className="mt-4 flex flex-col gap-4">
            {payloads.map((payload, index) => (
              <PayloadCard
                key={index}
                payload={payload}
                onDelete={() => deletePayload(index)}
                onUpdate={(newPayload) =>
                  setPayloads(
                    produce((payloads) => {
                      payloads[index] = newPayload;
                    })
                  )
                }
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
