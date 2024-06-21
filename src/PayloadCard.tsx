import { Payload } from "./payload";

interface PayloadCardProps {
  payload: Payload;
  onDelete: () => void;
}

export function PayloadCard({ payload, onDelete }: PayloadCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <input value={payload.label} className="font-bold" />
        <button
          className="text-sm px-1 bg-gray-100 text-gray-400 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>

      {/* Card Content */}
      <div className="mt-4 flex flex-col gap-2">
        {payload.data.map(({ contentType, data }, index) => (
          <div key={index} className="flex gap-3 font-mono text-sm">
            <input
              type="text"
              value={contentType}
              className="p-1 bg-gray-100 rounded w-1/3"
            />
            <input
              type="text"
              value={data}
              className="p-1 bg-gray-100 rounded w-2/3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
