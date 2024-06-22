import { produce } from "immer";
import { DragEvent } from "react";

import { Payload } from "./payload";

interface PayloadCardProps {
  payload: Payload;
  onUpdate: (payload: Payload) => void;
  onDelete: () => void;
}

export function PayloadCard({ payload, onDelete, onUpdate }: PayloadCardProps) {
  const update = (updateFn: (payload: Payload) => void) => {
    onUpdate(produce(payload, updateFn));
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
    for (const payloadData of payload.data) {
      event.dataTransfer.setData(payloadData.contentType, payloadData.data);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Card Header */}
      <div className="flex items-center justify-between gap-3">
        {/* Drag Handle & Label */}
        <div
          draggable
          onDragStart={handleDragStart}
          className="flex-grow flex items-center p-2 -ml-2 -mt-2"
        >
          <div className="mr-2 text-2xl h-0 -translate-y-4 text-gray-400 cursor-grab">
            #
          </div>
          <input
            value={payload.label}
            className="font-bold w-full"
            onChange={(event) =>
              update((payload) => {
                payload.label = event.target.value;
              })
            }
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="mt-4 flex flex-col gap-2">
        {/* Data Item List */}
        {payload.data.map(({ contentType, data }, index) => (
          <div key={index} className="flex gap-3 font-mono text-sm">
            <input
              type="text"
              value={contentType}
              placeholder="Enter content type…"
              className="p-1 bg-gray-100 rounded w-1/3"
              onChange={(event) =>
                update((payload) => {
                  payload.data[index].contentType = event.target.value;
                })
              }
            />
            <input
              type="text"
              value={data}
              placeholder="Enter data…"
              className="p-1 bg-gray-100 rounded w-2/3"
              onChange={(event) =>
                update((payload) => {
                  payload.data[index].data = event.target.value;
                })
              }
            />
            <button
              className="text-gray-300 font-medium text-xl"
              title="Remove data"
              onClick={() =>
                update((payload) => {
                  if (payload.data.length === 1) {
                    alert("At least one data item is required!");
                    return;
                  }

                  payload.data.splice(index, 1);
                })
              }
            >
              ⨯
            </button>
          </div>
        ))}

        <div className="flex items-center justify-between">
          <button
            className="mt-1 text-sm inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 active:text-gray-500 transition"
            onClick={() =>
              update(
                (payload) =>
                  void payload.data.push({
                    contentType: "text/plain",
                    data: "",
                  })
              )
            }
          >
            <div className="text-xl">+</div>
            <div>Add data</div>
          </button>

          <button
            className="text-sm px-1 text-gray-400 rounded"
            onClick={onDelete}
          >
            Delete payload
          </button>
        </div>
      </div>
    </div>
  );
}
