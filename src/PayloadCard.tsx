import { produce } from "immer";
import { DragEvent, forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { Payload } from "./payload";

interface PayloadCardProps {
  payload: Payload;
  onUpdate: (payload: Payload) => void;
  onDelete: () => void;
  className?: string;
}

export const PayloadCard = forwardRef<HTMLDivElement, PayloadCardProps>(
  ({ payload, onDelete, onUpdate, className }, ref) => {
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
      <div className={`bg-white rounded-lg shadow p-6 ${className}`} ref={ref}>
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
              placeholder="Enter label…"
              className="font-bold w-full text-gray-800"
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
              {/* Content type input */}
              <div className="w-52">
                <input
                  type="text"
                  value={contentType}
                  placeholder="Enter content type…"
                  className="p-1 bg-gray-100 text-gray-500 font-semibold rounded w-full"
                  onChange={(event) =>
                    update((payload) => {
                      payload.data[index].contentType = event.target.value;
                    })
                  }
                />
              </div>

              {/* Data input */}
              <TextareaAutosize
                value={data}
                placeholder="Enter data…"
                className="p-1 bg-gray-100 text-gray-800 rounded flex-grow resize-none"
                onChange={(event) =>
                  update((payload) => {
                    payload.data[index].data = event.target.value;
                  })
                }
              />

              {/* "Remove data" button */}
              {payload.data.length > 1 && (
                <button
                  className={
                    "font-medium text-xl" +
                    " text-gray-300 hover:text-red-500 transition"
                  }
                  title="Remove data"
                  onClick={() =>
                    update((payload) => void payload.data.splice(index, 1))
                  }
                >
                  ⨯
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button
            className={
              "mt-1 px-1 text-sm inline-flex items-center gap-2" +
              " text-gray-400 hover:text-gray-600 active:text-gray-500 transition"
            }
            onClick={() =>
              update(
                (payload) =>
                  void payload.data.push({
                    contentType: "",
                    data: "",
                  })
              )
            }
          >
            <div className="text-xl leading-[0px] -translate-y-[2px]">+</div>
            <div>Add data</div>
          </button>

          <button
            className={
              "text-sm px-1 rounded" +
              " text-gray-400 hover:text-red-700 hover:bg-red-100 active:text-red-600 transition"
            }
            onClick={onDelete}
          >
            Delete payload
          </button>
        </div>
      </div>
    );
  }
);
