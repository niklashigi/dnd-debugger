import { DragEvent, useState } from "react";
import { produce } from "immer";
import { useLocalStorage } from "@uidotdev/usehooks";

import { PayloadCard } from "./PayloadCard";
import { Payload } from "./payload";
import { getDataTransferItemString } from "./utils";

export function PayloadManager() {
  const [payloads, setPayloads] = useLocalStorage<Payload[]>("payloads", [
    {
      id: crypto.randomUUID(),
      label: "Hello World",
      data: [
        {
          contentType: "text/plain",
          data: "Hello World!",
        },
      ],
    },
  ]);

  const [isReadyToDrop, setIsReadyToDrop] = useState(false);

  const addPayload = () => {
    setPayloads(
      produce((payloads) => {
        payloads.unshift({
          id: crypto.randomUUID(),
          label: "New payload",
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
    const newPayload: Payload = {
      id: crypto.randomUUID(),
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

  const handleDragEvent = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";

    setIsReadyToDrop(true);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    setIsReadyToDrop(false);

    event.preventDefault();
    if (!event.dataTransfer) return;

    void importDataTransfer(event.dataTransfer);
  };

  const handleDragExit = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsReadyToDrop(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-bold text-xl text-gray-800">Payloads</h2>
        <button
          className="bg-gray-200 flex items-center gap-2 text-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-400 active:text-white font-medium transition px-2 py-1 rounded text-sm"
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
        className={
          "mt-6 p-8 border-2 border-gray-300 border-dashed rounded-lg text-center text-gray-400 text-sm select-none transition " +
          (isReadyToDrop
            ? "border-gray-400 text-gray-600"
            : "border-gray-300 text-gray-400")
        }
        onDragOver={handleDragEvent}
        onDragEnter={handleDragEvent}
        onDragExit={handleDragExit}
        onDragLeave={handleDragExit}
        onDrop={handleDrop}
      >
        Drag something and drop it here to import…
      </div>

      {/* Payload List */}
      <div className="mt-6 flex flex-col gap-4">
        {payloads.map((payload, index) => (
          <PayloadCard
            key={payload.id}
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
    </div>
  );
}
