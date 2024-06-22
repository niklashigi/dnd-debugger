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
          <h1 className="text-3xl font-bold text-gray-900">
            Drag & Drop Debugger
          </h1>
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
            <h2 className="font-bold text-xl text-gray-800">Payloads</h2>
            <button
              className="bg-gray-200 flex items-center gap-2 text-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-400 font-medium transition px-2 py-1 rounded text-sm"
              onClick={addPayload}
            >
              <div className="text-xl leading-[0px] -translate-y-[2px] font-light">
                +
              </div>
              Create payload
            </button>
          </div>

          {/* Drop Area */}
          <div
            className="mt-6 p-8 border-2 border-gray-300 border-dashed rounded-lg text-center text-gray-400 select-none"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            Drag something and drop it here to import…
          </div>

          {/* Payload List */}
          <div className="mt-6 flex flex-col gap-4">
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
